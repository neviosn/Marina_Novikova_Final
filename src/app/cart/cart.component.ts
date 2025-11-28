// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Game } from '../game-detail/game.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone: false,
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  userId: string | null = null;
  cartItems: Game[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.cartItems = this.cartService.getCart(this.userId);
      this.total = this.cartItems.reduce((sum, game) => sum + game.price, 0);
    }
  }
  

  remove(gameId: string) {
    if (this.userId) {
      this.cartService.removeFromCart(this.userId, gameId);
      this.cartItems = this.cartService.getCart(this.userId);
      this.total = this.cartItems.reduce((sum, game) => sum + game.price, 0);
    }
  }

  clear() {
    if (this.userId) {
      this.cartService.clearCart(this.userId);
      this.cartItems = [];
      this.total = 0;
    }
  }
}
