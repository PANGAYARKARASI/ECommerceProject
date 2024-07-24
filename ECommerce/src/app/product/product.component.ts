import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatTableModule,
    MatCardModule,
    MatButton,
    RouterLink,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  constructor(
    private service: ProductService,
    private services: CartService,
    private authService: AuthService,
    private https: HttpClient,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<any>();
  }
  products: any[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'price',
    'buy',
    'update',
    'delete',
  ];
  productsbyids: any[] = [];
  isLoggedIn: boolean = false;

  cart: any[] = [];
  productsidview: boolean = false;
  userEmail: string | null = null;
  userRole: string | null = null;
  ngOnInit(): void {
    this.loadproducts();
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.userEmail = sessionStorage.getItem('userEmail');
        this.userRole = sessionStorage.getItem('userRole');
      } else {
        this.userEmail = null;
        this.userRole = null;
      }
    });
  }

  login() {
    this.authService.login('dummyToken');
  }

  logout() {
    this.authService.logout();
    if (!this.userEmail) {
      this.snackBar.open(
        'You have loggedOut successfully. Please login to add the product to cart',
        'Close',
        {
          duration: 5000,
        }
      );
      return false;
    }
    return true;
  }

  canCreate(): boolean {
    return this.userRole === 'Admin';
  }

  loadproducts() {
    this.service.getAllProducts().subscribe(
      (data) => {
        this.products = data;
        this.dataSource.data = this.products;
        console.log(this.products);
      },

      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  create() {
    this.router.navigate(['/create']);
  }

  openDialog(product: any): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '800px',
      data: {
        product,
        onUpdate: (id: number) => this.updateProduct(id),
        onDelete: (id: number) => this.deleteProduct(id),
      },
    });
  }
  deleteProduct(id: number) {
    console.log('deleteProduct in component called with id:', id);
    if (confirm('Are you sure you want to delete this product?')) {
      this.service.deleteProduct(id).subscribe(
        () => {
          console.log('Product deleted successfully');
          this.snackBar.open('Product deleted successfully', 'Close', {
            duration: 3000,
          });
          this.dataSource.data = this.dataSource.data.filter(
            (product) => product.id !== id
          );
          this.loadproducts();
        },
        (error) => {
          console.error('Error deleting product:', error);
          this.snackBar.open('Error deleting product', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }

  updateProduct(id: number) {
    this.router.navigate(['/update', id]);
  }

  buyProduct(id: number): void {
    this.services.addToCart(id);
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']); // Navigate to the cart route
  }

  navigateToOrder(): void {
    this.router.navigate(['/order']); // Navigate to the cart route
  }
}
