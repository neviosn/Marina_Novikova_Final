import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { Game } from '../game-detail/game.model';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})

export class CheckoutComponent implements OnInit {
  cartItems: Game[] = [];
  total: number = 0;
  userId: string | null = null;

  paymentInfo = {
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  };

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.cartItems = this.cartService.getCart(this.userId);
      this.total = this.cartItems.reduce((sum, game) => sum + game.price, 0);
    }
  }

  placeOrder(): void {
    const { name, cardNumber, expiry, cvv } = this.paymentInfo;
  
    if (!name || !cardNumber || !expiry || !cvv) {
      alert('Please fill in all payment fields.');
      return;
    }
  
    const cardNumberValid = /^\d{16}$/.test(cardNumber);
    const cvvValid = /^\d{3,4}$/.test(cvv);
    const expiryValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry); 
  
    if (!cardNumberValid) {
      alert('Card number must be 16 digits.');
      return;
    }
  
    if (!cvvValid) {
      alert('CVV must be 3 or 4 digits.');
      return;
    }
  
    if (!expiryValid) {
      alert('Expiry must be in MM/YY format.');
      return;
    }
  
    if (this.userId) {
      console.log('Order placed for:', this.cartItems);
      this.cartService.savePurchases(this.userId, this.cartItems);
      this.cartService.clearCart(this.userId);
      alert('Payment successful! Thank you for your order.');
      this.router.navigate(['/mainpage']);
    }
  }
  
  
  
}
