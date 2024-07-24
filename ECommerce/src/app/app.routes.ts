import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { NgModule } from '@angular/core';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { BuyComponent } from './buy/buy.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: ProductComponent, pathMatch: 'prefix'},
  {path:'product',component:ProductComponent},
  { path: 'create', component: CreateComponent }, // Add route for ProductComponent
  { path: 'update/:id', component: UpdateComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order', component: OrderComponent },
  {path: 'productDialog', component: ProductDialogComponent},
   {path: 'buy', component: BuyComponent}

  //{ path: 'create', component: TaskCreateComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}