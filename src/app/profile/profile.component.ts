import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    favoriteGenre: '',
    newPassword: ''
  };

  saveSuccess = false;
  genres = ['Shooters', 'Solo RPG', 'Action', 'MOBA'];
  purchasedGames: Game[] = [];

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.user.name = localStorage.getItem('userName') || '';
    this.user.email = localStorage.getItem('userEmail') || '';
    this.user.favoriteGenre = localStorage.getItem('favoriteGenre') || '';

    const userId = localStorage.getItem('userId');
    if (userId) {
      this.purchasedGames = this.cartService.getPurchases(userId);
    }
  }

  saveProfile(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const body: any = { name: this.user.name };
    if (this.user.newPassword) body.password = this.user.newPassword;

    this.http.put(`http://localhost:3000/users/${userId}`, body).subscribe({
      next: () => {
        localStorage.setItem('userName', this.user.name);
        localStorage.setItem('favoriteGenre', this.user.favoriteGenre);
        this.user.newPassword = '';
        this.saveSuccess = true;
        setTimeout(() => this.saveSuccess = false, 3000);
      },
      error: (err) => console.error('Profile update error:', err)
    });
  }
}
