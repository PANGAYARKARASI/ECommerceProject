import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, MatButtonModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  formData = {
    Name: '',
    Role: '',
    Email: '',
    Password: '',
  };
  message: string = '';
  constructor(
    private service: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  // onSubmit() {
  //   this.https.post<any>(this.service.RegisterPost(), this.formData).subscribe(
  //     (response) => {
  //       console.log('Registration Successful', response);
  //       this.router.navigate(['/login']);
  //     },
  //     (error) => {
  //       console.error('Registration failed', error);
  //     }
  //   );
  // }

  onSubmit(): void {
    this.service.register(this.formData).subscribe(
      (response) => {
        if (response.isSuccess) {
          
          this.message = 'Registration successful! Please login.';
          this.snackBar.open('You have registered successfully', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/login']);
        } else {
          this.message = response.message;
        }
      },
      (error) => {
        this.message = 'An error occurred while registering.';
      }
    );
  }
}
