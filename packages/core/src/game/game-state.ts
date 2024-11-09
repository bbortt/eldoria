import type { GameGrid } from './game-grid';

import type { Character } from '../stats';

export interface InitGameState {
  username: string;
  team: Character[];
}

export interface GameState extends InitGameState {
  grid: GameGrid;
}
