import { Cell, CELL_TYPE_CORE } from './cell';
import { MAX_GRID_SIZE } from './constants';

export interface GameGrid {
  readonly cells: readonly (readonly Cell[])[];
}

export const initGameGrid = (): GameGrid => {
  const cells: (readonly Cell[])[] = [];
  const centerStart = MAX_GRID_SIZE / 2 - 1;

  for (let y = 0; y < MAX_GRID_SIZE; y++) {
    const row: Cell[] = [];
    for (let x = 0; x < MAX_GRID_SIZE; x++) {
      // Check if current position is one of the center 4 tiles
      const isCenter = (x === centerStart || x === centerStart + 1) && (y === centerStart || y === centerStart + 1);

      row[x] = { x, y, content: isCenter ? { type: CELL_TYPE_CORE } : undefined };
    }

    cells.push(Object.freeze(row));
  }

  return {
    cells: Object.freeze(cells),
  };
};
