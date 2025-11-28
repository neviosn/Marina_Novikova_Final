import { Pipe, PipeTransform } from '@angular/core';
import { Game } from './game-detail/game.model';

@Pipe({
  name: 'searchFilter'
})
export class SearchPipe implements PipeTransform {
  transform(games: Game[], searchTerm: string): Game[] {
    if (!games || !searchTerm) return games;

    const normalizedTerm = searchTerm.trim().toLowerCase();

    return games.filter(game =>
      game.title.toLowerCase().startsWith(normalizedTerm)
    );
  }
}
