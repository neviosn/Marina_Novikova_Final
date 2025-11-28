
import { Injectable } from '@angular/core';
import { Game } from './game-detail/game.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart: { [userId: string]: Game[] } = {};
  private purchases: { [userId: string]: Game[] } = {};


  addToCart(userId: string, game: Game): boolean {
    if (!this.cart[userId]) {
      this.cart[userId] = [];
    }
    
    const exists = this.cart[userId].some(g => g.id === game.id);
    if (!exists) {
      this.cart[userId].push(game);
      return true;
    }

    return false;
  }

  getCart(userId: string): Game[] {
    return this.cart[userId] || [];
  }

  savePurchases(userId: string, games: Game[]): void {
    const key = `purchasedGames_${userId}`;
    localStorage.setItem(key, JSON.stringify(games));
  }
  
  getPurchases(userId: string): Game[] {
    const key = `purchasedGames_${userId}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }  

  checkout(userId: string): void {
    if (!this.purchases[userId]) {
      this.purchases[userId] = [];
    }

    const purchased = this.cart[userId] || [];
    this.purchases[userId].push(...purchased);
    this.cart[userId] = [];
  }

  removeFromCart(userId: string, gameId: string): void {
    if (this.cart[userId]) {
      this.cart[userId] = this.cart[userId].filter(game => game.id !== gameId);
    }
  }

  clearCart(userId: string): void {
    this.cart[userId] = [];
  }
}
