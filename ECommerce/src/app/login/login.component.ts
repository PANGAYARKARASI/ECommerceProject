import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { AuthService } from '../auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ProductComponent, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  log = {
    Email: '',
    Password: '',
    Role: '',
    Message: '',
  };
  constructor(
    private service: UserService,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}
  // async onSubmit() {

  //   this.authService.login('dummyToken');

  //   var response = await this.service.GetUser(this.log.Email,this.log.Password);

  //   console.log(response);
  //   console.log(this.log.Password);
  //   console.log(response.password);
  //   // Check if user data is retrieved successfully
  //   if (response) {
  //     // Compare the password entered by the user with the password retrieved from the service

  //       console.log('login successful');
  //       sessionStorage.setItem('userEmail', this.log.Email);

  //       sessionStorage.setItem('user', response.userId);
  //       this.router.navigate(['/product']);
  //     }
  //   else {
  //     console.log('User not found. Please check the username.');
  //   }
  // }

  onSubmit(): void {
    this.authService.login('dummyToken');

    this.service.login(this.log.Email, this.log.Password).subscribe(
      (response) => {
        if (response.isSuccess) {
          // Store user info and navigate
          sessionStorage.setItem('user', response.userId);
          sessionStorage.setItem('userEmail', this.log.Email);
          sessionStorage.setItem('userName', response.name);
          sessionStorage.setItem('userRole', response.role);
          this.snackBar.open('You have loggedIn successfully', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/product']);
        } else {
          this.log.Message = response.message;
        }
      },
      (error) => {
        this.log.Message = 'An error occurred while logging in.';
      }
    );
  }

  back(){
    this.router.navigate(['/product']);
  }
}
