import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: MainpageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'mainpage', component: MainpageComponent},
  { path: 'game/:id', component: GameDetailComponent},
  { path: 'cart', component: CartComponent},
  { path: 'checkout', component: CheckoutComponent },
  { path: 'profile', component: ProfileComponent },
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
