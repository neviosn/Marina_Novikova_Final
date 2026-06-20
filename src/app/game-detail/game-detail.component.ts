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
  gameDbId!: number;

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
  currentUserId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private cartService: CartService,
    private router: Router,
    private authService: AuthService
   ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('userEmail');
    this.userEmail = this.authService.getUserEmail();
    this.currentUserId = Number(localStorage.getItem('userId')) || null;

    this.route.params.subscribe((params) => {
      this.gameId = params['id'];

      this.gameService.getGames().subscribe(dbGames => {
        const dbGame = dbGames.find((g: any) => g.slug === this.gameId);
        if (dbGame) {
          this.gameDbId = dbGame.id;
          this.game = {
            id: dbGame.slug,
            title: dbGame.title,
            genre: dbGame.genre,
            image: dbGame.image,
            price: dbGame.price,
            rating: dbGame.rating,
            description: dbGame.description,
            reviews: []
          };
          this.prepareStars();
          this.loadReviews();
        }
      });
    });
  }

  loadReviews(): void {
    this.gameService.getReviewsFromDb(this.gameDbId).subscribe({
      next: (reviews) => {
        this.game.reviews = reviews;
        console.log('Reviews:', reviews);
        console.log('Current user ID:', this.currentUserId);
      },
      error: (err) => console.error('Failed to load reviews:', err)
    });
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
        alert(' This game is already in your cart!');
      }
    }
  }

  editingReview: any = null;

  startEdit(review: any): void {
    this.editingReview = { ...review };
  }

  cancelEdit(): void {
    this.editingReview = null;
  }

  saveEdit(): void {
    this.gameService.updateReviewInDb(this.editingReview.id, this.editingReview.comment, this.editingReview.rating).subscribe({
      next: () => {
        const idx = this.game.reviews.findIndex((r: any) => r.id === this.editingReview.id);
        if (idx !== -1) this.game.reviews[idx] = { ...this.editingReview };
        this.editingReview = null;
      },
      error: (err) => console.error(err)
    });
  }

  deleteReview(reviewId: number): void {
    this.gameService.deleteReviewFromDb(reviewId).subscribe({
      next: () => {
        this.game.reviews = this.game.reviews.filter((r: any) => r.id !== reviewId);
      },
      error: (err) => console.error(err)
    });
  }

  submitReview(): void {
    const userId = localStorage.getItem('userId');

    const review = {
      user_id: Number(userId),
      game_id: this.gameDbId,
      comment: this.newReview.comment,
      rating: this.newReview.rating
    };

    this.gameService.addReviewToDb(review).subscribe({
      next: (savedReview) => {
        this.game.reviews.push(savedReview);
        this.newReview = { comment: '', rating: 5 };
      },
      error: (err) => console.error(err)
    });
  }
}
