import type { DiceRoll } from './dice-roll';
import type { GameGrid } from './game-grid';

import type { Character } from '../stats';

export interface InitGameState {
  team: Character[];
  username: string;
}

export interface GameState extends InitGameState {
  diceRoll: DiceRoll;
  grid: GameGrid;
  startingPlayer?: string;
}
