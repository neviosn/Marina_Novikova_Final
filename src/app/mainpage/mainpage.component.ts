// mainpage.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game-detail/game.service';
import { Game } from '../game-detail/game.model';

@Component({
  standalone: false,
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  games: Game[] = [];
  filteredGames: Game[] = [];
  searchTerm: string = '';

  showFilter: boolean = false;

  categories: { name: string; selected: boolean; games: Game[] }[] = [
    { name: 'Shooters', selected: false, games: [] },
    { name: 'Solo RPG', selected: false, games: [] },
    { name: 'MOBA', selected: false, games: [] },
    { name: 'Action', selected: false, games: [] }
  ];
  
  
  
  categoryGameIds: { [key: string]: string[] } = {
    'Shooters': ['valorant', 'csgo', 'overwatch'],
    'Solo RPG': ['witcher3', 'skyrim', 'bg3'],
    'MOBA': ['lol', 'dota2'],
    'Action': ['hitman3', 'cyberpunk']
  };
  
  

  constructor(
  private gameService: GameService,
  private router: Router
) {}

  ngOnInit(): void {
  console.log('MAINPAGE OPENED');

  this.gameService.getGames().subscribe({
    next: (data) => {
      console.log('Games from DB:', data);

      this.games = data;
      this.filteredGames = [...this.games];

      this.categories.forEach(category => {
        category.games = this.games.filter(g => g.genre === category.name);
      });
    },
    error: (err) => console.error('DB ERROR:', err)
  });
}

  toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }

  applyGenreFilter(): void {
    const selectedIds = this.categories
  .filter(cat => cat.selected)
  .flatMap(cat => cat.games.map(g => g.id)); 
  
    this.filteredGames = selectedIds.length === 0
      ? [...this.games]
      : this.games.filter(game => selectedIds.includes(game.id));
  
    this.showFilter = false;
  }
  

  goToGame(id: string): void {
    this.router.navigate(['/game', id]);
  }

  getGamesByCategory(categoryName: string): Game[] {
    const category = this.categories.find(c => c.name === categoryName);
    return category ? this.games.filter(g => category.games.some(cg => cg.id === g.id)) : [];

  }
  

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

cycleLeft(category: any) {
  const last = category.games.pop();
  if (last) category.games.unshift(last);
}

cycleRight(category: any) {
  const first = category.games.shift();
  if (first) category.games.push(first);
}
}