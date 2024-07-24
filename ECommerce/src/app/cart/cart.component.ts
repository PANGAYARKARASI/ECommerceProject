import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  productForm: FormGroup;
  id?: number;
  displayedColumns: string[] = ['name', 'description', 'price', 'quantity', 'totalPrice'];
  cart: any[] = [];
  newPrice: any;

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.productForm = this.fb.group({
      name: [''],
      price: [''],
      description: [''],
      totalPrice: ['']
    });
  }

  ngOnInit(): void {
    this.viewCart();
  }

  viewCart() {
    this.cart = this.cartService.viewcartitems();
  }
  buyAll() {
    // this.buyProduct(this.cart);
    this.router.navigate(['/buy']);
  }
  incrementQuantity(element: any): void {
    element.quantity += 1;
      element.totalPrice = element.quantity * element.price;
  }

  decrementQuantity(element: any): void {
     if (element.quantity > 1) {
      element.quantity -= 1;
      element.totalPrice = element.quantity * element.price;
  }
}

 back(){
    this.router.navigate(['/product']);
  }

}
