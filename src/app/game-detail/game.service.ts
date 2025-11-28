import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GameService {
  private games = [
    {
      "id": "valorant",
      "title": "VALORANT",
      "genre": "Shooters",
      "image": "assets/images/valorant.jpg",
      "price": 5.00,
      "rating": 4.5,
      "description": "A free-to-play multiplayer tactical first-person shooter developed by Riot Games.",
      "reviews": []
    },
    {
      "id": "csgo",
      "title": "Counter-Strike: Global Offensive",
      "genre": "Shooters",
      "image": "assets/images/csgo.jpg",
      "price": 5.50,
      "rating": 4.7,
      "description": "Classic tactical shooter from Valve featuring team-based bomb and hostage scenarios.",
      "reviews": []
    },
    {
      "id": "witcher3",
      "title": "The Witcher 3: Wild Hunt",
      "genre": "Solo RPG",
      "image": "assets/images/witcher3.jpg",
      "price": 29.99,
      "rating": 4.9,
      "description": "An open-world fantasy RPG with deep storylines and unforgettable characters.",
      "reviews": []
    },
    {
      "id": "cyberpunk",
      "title": "Cyberpunk 2077",
      "genre": "Action",
      "image": "assets/images/cyberpunk.jpg",
      "price": 39.99,
      "rating": 4.0,
      "description": "Futuristic open-world RPG set in a neon-drenched Night City.",
      "reviews": []
    },
    {
      "id": "dota2",
      "title": "Dota 2",
      "genre": "MOBA",
      "image": "assets/images/dota2.jpg",
      "price": 7.00,
      "rating": 4.6,
      "description": "Competitive MOBA from Valve where two teams of five heroes face off.",
      "reviews": []
    },
    {
      "id": "lol",
      "title": "League of Legends",
      "genre": "MOBA",
      "image": "assets/images/lol.jpg",
      "price": 7.50,
      "rating": 4.7,
      "description": "Massively popular online battle arena from Riot Games.",
      "reviews": []
    },
    {
      "id": "skyrim",
      "title": "The Elder Scrolls V: Skyrim",
      "genre": "Solo RPG",
      "image": "assets/images/skyrim.jpg",
      "price": 19.99,
      "rating": 4.8,
      "description": "Epic fantasy open-world RPG with dragons and rich lore.",
      "reviews": []
    },
    {
      "id": "hitman3",
      "title": "Hitman 3",
      "genre": "Action",
      "image": "assets/images/hitman3.jpg",
      "price": 49.99,
      "rating": 4.2,
      "description": "Stealth-based assassination gameplay in exotic locations.",
      "reviews": []
    },
    {
      "id": "apex",
      "title": "Apex Legends",
      "genre": "Shooters",
      "image": "assets/images/apex.jpg",
      "price": 10.00,     
      "rating": 4.4,
      "description": "Fast-paced battle royale set in the Titanfall universe.",
      "reviews": []
    },
    {
      "id": "bg3",
      "title": "Baldur\u2019s Gate 3",
      "genre": "Solo RPG",
      "image": "assets/images/bg3.jpg",
      "price": 59.99,
      "rating": 4.9,
      "description": "Rich narrative RPG based on Dungeons & Dragons mechanics.",
      "reviews": []
    }
  ]

  getGameById(id: string) {
    return this.games.find(g => g.id === id);
  }

  getAllGames() {
    return this.games;
  }

  getReviews(gameId: string): any[] {
    const stored = localStorage.getItem(`reviews-${gameId}`);
    return stored ? JSON.parse(stored) : [];
  }

  saveReviews(gameId: string, reviews: any[]): void {
    localStorage.setItem(`reviews-${gameId}`, JSON.stringify(reviews));
  }

}
