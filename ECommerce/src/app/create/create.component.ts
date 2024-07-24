import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    
  ],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private https: HttpClient,
    private service: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      imageUrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value; // Extract the form values
      console.log(productData);
      this.https
        .post('https://localhost:7110/api/Product', productData)
        .subscribe(
          (response) => {
            console.log('Product created successfully', response);
            this.router.navigate(['/product']);
          },
          (error) => {
            console.error('Error creating product', error);
          }
        );
    } else {
      console.error('Form is invalid');
    }
  }
}
