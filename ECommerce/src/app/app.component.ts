import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { BuyComponent } from './buy/buy.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ProductComponent,
    RegisterComponent,
    LoginComponent,
    CreateComponent,
    UpdateComponent,
    CartComponent,
    OrderComponent,
    ProductDialogComponent,
    BuyComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ECommerce';
}
