import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from './game.service';
import { CartService } from '../cart.service'; 
import { Game } from './game.model';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  standalone: false,
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css'],
})
export class GameDetailComponent implements OnInit {
  gameId!: string;

  game: Game = {
    id: '',
    title: '',
    description: '',
    price: 0,
    rating: 0,
    image: '',
    reviews: [],
    genre: ''
  };

  fullStars: number[] = [];
  halfStar: boolean = false;  
  emptyStars: number[] = [];

  newReview = {
    rating: 5,
    comment: ''
  };
  
  isLoggedIn = false;
  userEmail: string | null = null;

  constructor(
    private route: ActivatedRoute, 
    private gameService: GameService, 
    private cartService: CartService,
    private router: Router,
    private authService: AuthService
   ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      const foundGame = this.gameService.getGameById(this.gameId);
      if (foundGame) {
        this.game = foundGame;
        this.prepareStars();
      }
    });

    this.isLoggedIn = !!localStorage.getItem('userEmail');
  this.game.reviews = this.gameService.getReviews(this.gameId); 
  this.userEmail = this.authService.getUserEmail();
  }

  prepareStars(): void {
    const rating = this.game.rating;
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const empty = 5 - full - (hasHalf ? 1 : 0);

    this.fullStars = Array(full).fill(0);
    this.halfStar = hasHalf;
    this.emptyStars = Array(empty).fill(0);
  }

  addToCart(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const added = this.cartService.addToCart(userId, this.game);
      if (added) {
        this.router.navigate(['/cart']);
      } else {
        alert('⚠️ This game is already in your cart!');
      }
    }
  }

  submitReview(): void {
    const username = localStorage.getItem('userEmail') || 'Anonymous';

  const review = {
    username,
    comment: this.newReview.comment,
    rating: this.newReview.rating
  };

  this.game.reviews.push(review);
  this.gameService.saveReviews(this.gameId, this.game.reviews);

  this.newReview = { comment: '', rating: 5 }; 
}

  
  
}