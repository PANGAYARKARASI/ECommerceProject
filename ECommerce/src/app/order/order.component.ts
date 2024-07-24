import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatButtonModule, RouterLink, RouterOutlet],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'userName',
    'productName',
    'productDescription',
    'price',
    'quantity',
    'totalPrice'
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  userId: string | null = null;
  isAdmin: boolean = false;
  orderDetails: any[] = [];
  orders: any[] = [];
  userEmail: string | null = null;
  isLoggedIn: boolean = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  ngOnInit(): void {
    // this.userId = sessionStorage.getItem('user');
    // this.isAdmin = this.userId === '1';
    // this.getOrderDetails();

    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.userId = sessionStorage.getItem('user');
        this.isAdmin = this.userId === '1';
        this.getOrderDetails();
      } else {
        this.snackBar.open(
          'Please login to view the order summary detail',
          'Close',
          {
            duration: 5000,
          }
        );
        this.router.navigate(['/login']); // Navigate to login if not logged in
      }
    });
  }

  getOrderDetails(): void {
    if (this.isAdmin) {
      this.cartService.showProduct().subscribe(
        (data) => {
          this.dataSource.data = data.map((order) => ({
            ...order,
            totalPrice: order.product.price * order.quantity,
          }));
         
        },
        (error) => {
          console.error('Failed to fetch all orders', error);
        }
      );
    } else {
      this.cartService.getUserById(this.userId).subscribe(
        (data) => {
          this.dataSource.data = data.map((order: any) => ({
            ...order,
            totalPrice: order.product.price * order.quantity,
          }));

        },
        (error) => {
          console.error('Failed to fetch user orders', error);
        }
      );
    }
  }

  back() {
    this.router.navigate(['/product']);
  }
}
