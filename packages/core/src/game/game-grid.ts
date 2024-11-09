import { MAX_GRID_SIZE } from './constants';

export type Cell = {
  x: number;
  y: number;
};

export type GameGrid = {
  readonly cells: ReadonlyArray<ReadonlyArray<Cell>>;
};

export const initGameGrid = (): GameGrid => {
  const cells: ReadonlyArray<Cell>[] = [];

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
