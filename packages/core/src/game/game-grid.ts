import { MAX_GRID_SIZE } from './constants';

export interface Cell {
  x: number;
  y: number;
}

export interface GameGrid {
  readonly cells: readonly (readonly Cell[])[];
}

export const initGameGrid = (): GameGrid => {
  const cells: (readonly Cell[])[] = [];

  for (let y = 0; y < MAX_GRID_SIZE; y++) {
    const row: Cell[] = [];
    for (let x = 0; x < MAX_GRID_SIZE; x++) {
      row[x] = { x, y };
    }
    cells.push(Object.freeze(row));
  }

  return {
    cells: Object.freeze(cells),
  };
};
