import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BuyService } from '../buy.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    MatRadioModule,
  ],
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'], // Corrected from `styleUrl` to `styleUrls`
})
export class BuyComponent implements OnInit {
  AddressForm: FormGroup;
  exitAddress: any;

  cartDetails: any[] = [];
  displayedColumns: string[] = ['name', 'description', 'price', 'quantity', 'totalPrice'];
  userEmail: string | null = null;
  addresses: any[] = [];
  selectedAddress = new FormControl(null);
  selectedAddressId: number | null = null; // Use FormControl directly

  constructor(
    private fb: FormBuilder,
    private https: HttpClient,
    private service: BuyService,
    private snackBar: MatSnackBar,
    private cartService: CartService,
    private router: Router
  ) {
    this.AddressForm = this.fb.group({
      streetAdd: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: [0, [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.userEmail = sessionStorage.getItem('userName');
    this.cartDetails = this.cartService.viewcartitems();
    this.fetchAddresses();

    this.selectedAddress.valueChanges.subscribe((value) => {
      if (value) {
        this.selectedAddressId = value; // Update the selected addressId
        this.fetchCartDetails();
      }
    });
  }

  fetchAddresses(): void {
    this.https.get<any[]>('https://localhost:7110/api/Address').subscribe(
      (response) => {
        this.addresses = response;
      },
      (error) => {
        console.error('Error fetching addresses', error);
      }
    );
  }

  onSubmit(): void {
    if (this.AddressForm.valid) {
      const address = this.AddressForm.value; // Extract the form values
      console.log(address);
      this.https.post('https://localhost:7110/api/Address', address).subscribe(
        (response) => {
          console.log('Address added successfully', response);
          this.fetchAddresses();
        },
        (error) => {
          console.error('Error on adding address', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  fetchCartDetails(): void {
    this.cartDetails = this.cartService.viewcartitems();
  }

  goToPayment(): void {
    console.log(this.selectedAddressId);
    if(this.AddressForm.value){
      this.snackBar.open('Please select or add an address to proceed ', 'Close', {
        duration: 3000,
      });
    }
    this.buyProduct(this.cartDetails);
  }

  buyProduct(product: any) {
    console.log('Buy button clicked', product);
    this.cartService.buyAllProducts(this.selectedAddressId).subscribe(
      (responses) => {
        console.log('All products purchased successfully', responses);
        this.cartService.clearCart();
        this.snackBar.open('Your Order has been placed successfully', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/order']);
      },
      (error) => {
        console.error('Error purchasing all products', error);
      }
    );
  }
}
