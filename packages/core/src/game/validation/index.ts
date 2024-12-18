import { Character } from '../../stats';
import { GameGrid } from '../game-grid';

export const isMoveValid = (grid: GameGrid, character: Character, targetX: number, targetY: number) => {
  if (!grid.cells[targetY] || !grid.cells[targetY][targetX] || grid.cells[targetY][targetX].content) {
    return false;
  }

  return true;
};
