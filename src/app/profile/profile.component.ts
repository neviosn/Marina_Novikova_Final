import { Component, OnInit } from '@angular/core';
import { Game } from '../game-detail/game.model';
import { CartService } from '../cart.service';


@Component({
  standalone: false,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = {
    name: '',
    email: '',
    favoriteGenre: ''
  };

  genres = ['Shooters', 'Solo RPG', 'Action', 'MOBA'];
  purchasedGames: Game[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');
    const storedGenre = localStorage.getItem('favoriteGenre');

    this.user.name = storedName || '';
    this.user.email = storedEmail || '';
    this.user.favoriteGenre = storedGenre || '';

    const userId = localStorage.getItem('userId');
    if (userId) {
      this.purchasedGames = this.cartService.getPurchases(userId); 
    }
  }

  saveProfile(): void {
    localStorage.setItem('userName', this.user.name);
    localStorage.setItem('favoriteGenre', this.user.favoriteGenre);
    alert('Profile updated!');
  }
}
