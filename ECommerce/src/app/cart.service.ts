import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: any[] = [];

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}


  addToCart(id: number): void {
    this.http.get(`https://localhost:7110/api/Product/ById/${id}`).subscribe(
      (product: any) => {
        const existingProduct = this.cart.find(
          (item) => item.id === product.id
        );
        if (existingProduct) {
          existingProduct.quantity += 1;
          existingProduct.totalPrice = existingProduct.quantity * product.price;
        } else {
          product.quantity = 1;
          product.totalPrice = product.price; // Initialize total price
          this.cart.push(product);
        }
        console.log('Product added to cart:', product);
        this.snackBar.open('Product added to cart successfully', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Error adding product to cart', error);
      }
    );
  }

 
  viewcartitems() {
    return this.cart;
  }

  buyProduct(order: any): Observable<any[]> {
    return this.http.post<any[]>(`https://localhost:7110/api/Order`, order);
  }

  showProduct(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7110/api/Order');
  }
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(
      `https://localhost:7110/api/Order/ByProductId/${id}`
    );
  }

  getUserById(userId: string | null): Observable<any> {
    //const userrId = sessionStorage.getItem('user');
    return this.http.get<any>(
      `https://localhost:7110/api/Order/ByUserId/${userId}`
    );
  }

  buyAllProducts(selectedAddressId: any): Observable<any[]> {
    const requests: Observable<any>[] = this.cart.map((product) => {
      product.userId = sessionStorage.getItem('user');
      product.addressId = selectedAddressId;
      return this.buyProduct(product);
    });
    return forkJoin(requests);
  }

  clearCart(): void {
    this.cart = [];
    this.snackBar.open('Cart cleared successfully', 'Close', {
      duration: 3000,
    });
  }
}
