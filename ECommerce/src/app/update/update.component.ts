
import { Component, OnInit } from '@angular/core';
import { ProductService} from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  productForm: FormGroup;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private service: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private https: HttpClient
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      imageUrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const productIdParam = params.get('id');
      if (productIdParam !== null) {
        this.id = +productIdParam;
        this.getProductDetails(this.id);
      }
    });
  }

  getProductDetails(id: number): void {
    this.https.get(`https://localhost:7110/api/Product/ById/${id}`).subscribe(
      (response: any) => {
        console.log('API Response:', response);
        this.productForm.patchValue(response);
      },
      (error) => {
        console.error('Error fetching product details', error);
      }
    );
  }

  async onSubmit(): Promise<void> {
    if (this.productForm.valid && this.id !== null) {
      await this.service
        .updateProduct(this.id, this.productForm.value)
        .subscribe(
          (response) => {
            console.log('Product updated successfully', response);
            this.router.navigate(['/product']);
          },
          (error) => {
            console.error('Error updating product', error);
          }
        );
    } else {
      console.error('Form is invalid or productId is null');
    }
  }
}