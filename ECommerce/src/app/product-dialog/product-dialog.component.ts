import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CartService } from '../cart.service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule],

  styleUrl: './product-dialog.component.scss',

  templateUrl: './product-dialog.component.html',
})
export class ProductDialogComponent implements OnInit {
  constructor(
    private services: CartService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  userEmail: string | null = null;
  id: number | 0 = 0;
  product: any[] = [];
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.userEmail = sessionStorage.getItem('userEmail');
  }

  canCreate(): boolean {
    return this.userEmail === 'user1@gmail.com';
  }

  onUpdate(): void {
    if (this.checkLogin()) {
      this.data.onUpdate(this.data.product.id);
      this.dialogRef.close();
    }
  }

  onDelete(): void {
    if (this.checkLogin()) {
      this.data.onDelete(this.data.product.id);
      this.dialogRef.close();
    }
  }

  buyProduct(id: number): void {
    if (this.checkLogin()) {
      this.services.addToCart(id);
    }
  }

  navigateToCart(): void {
    if (this.checkLogin()) {
      this.router.navigate(['/cart']);
    }
  }

  order() {
    if (this.checkLogin()) {
      this.router.navigate(['/order']);
    }
  }

   buy(): void {
    if (this.checkLogin()) {
      
      const order = {
       
        userId: this.data.user.userId,
        id: this.data.product.id,
        quantity: 1,
        totalPrice: this.data.product.price
        // Add other necessary fields
      };
      this.services.buyProduct(order).subscribe(
        (response) => {
          this.snackBar.open('Order placed successfully', 'Close', { duration: 3000 });
          this.dialogRef.close();
          this.router.navigate(['/order']); // Navigate to the order view
        },
        (error) => {
          this.snackBar.open('Failed to place order', 'Close', { duration: 3000 });
        }
      );
    }
  }
  checkLogin(): boolean {
    if (!this.userEmail) {
      this.snackBar.open('Please login to add the product to cart', 'Close', {
        duration: 3000,
      });
      return false;
    }
    return true;
  }
}
