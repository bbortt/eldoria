import type { GameGrid } from './game-grid';

import type { Character } from '../stats';

export interface InitGameState {
  team: Character[];
  username: string;
}

export interface GameState extends InitGameState {
  diceRoll: { '0': number; '1': number };
  grid: GameGrid;
  startingPlayer: string | null;
}
