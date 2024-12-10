import type { Character } from '../stats';
import type { DiceRoll } from './dice-roll';
import type { GameGrid } from './game-grid';

export interface InitGameState {
  team: Character[];
  username: string;
  tutorial: boolean;
  showHints: boolean;
}

export interface GameState extends InitGameState {
  diceRoll: DiceRoll;
  grid: GameGrid;
  startingPlayer?: string;
}
