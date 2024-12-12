import { CELL_TYPE_CORE } from './cell';
import { MAX_GRID_SIZE } from './constants';
import { GameGrid, initGameGrid } from './game-grid';

describe('initGameGrid', () => {
  let gameGrid: GameGrid;

  beforeEach(() => {
    gameGrid = initGameGrid();
  });

  it('should create a grid with correct dimensions', () => {
    expect(gameGrid.cells.length).toEqual(MAX_GRID_SIZE);
    gameGrid.cells.forEach(row => {
      expect(row.length).toEqual(MAX_GRID_SIZE);
    });
  });

  it('should initialize all cells with correct coordinates', () => {
    const centerStart = MAX_GRID_SIZE / 2 - 1;

    for (let y = 0; y < MAX_GRID_SIZE; y++) {
      for (let x = 0; x < MAX_GRID_SIZE; x++) {
        const cell = gameGrid.cells[y]![x];
        const isCenter = (x === centerStart || x === centerStart + 1) && (y === centerStart || y === centerStart + 1);

        if (!isCenter) {
          expect(cell).toEqual({ x, y });
        }
      }
    }
  });

  it('should calculate core size of 2x2 cells', () => {
    expect(gameGrid.cells[31]![31]).toEqual({ x: 31, y: 31, content: { type: CELL_TYPE_CORE } });
    expect(gameGrid.cells[31]![32]).toEqual({ x: 32, y: 31, content: { type: CELL_TYPE_CORE } });
    expect(gameGrid.cells[32]![31]).toEqual({ x: 31, y: 32, content: { type: CELL_TYPE_CORE } });
    expect(gameGrid.cells[32]![32]).toEqual({ x: 32, y: 32, content: { type: CELL_TYPE_CORE } });
  });

  it('should create immutable grid structure', () => {
    const grid = initGameGrid();

    // Test that the main cells array is frozen
    expect(Object.isFrozen(grid.cells)).toEqual(true);

    // Test that each row is frozen
    grid.cells.forEach(row => {
      expect(Object.isFrozen(row)).toEqual(true);
    });

    // Test that individual cells are not frozen
    grid.cells.forEach(row => {
      row.forEach(cell => {
        expect(Object.isFrozen(cell)).toEqual(false);
      });
    });
  });

  it('should create a new grid instance on each call', () => {
    const grid1 = initGameGrid();
    const grid2 = initGameGrid();
    expect(grid1).not.toBe(grid2);
    expect(grid1.cells).not.toBe(grid2.cells);
  });

  it('should handle corner cases correctly', () => {
    // Test top-left corner (0,0)
    expect(gameGrid.cells[0]![0]).toEqual({ x: 0, y: 0 });

    // Test top-right corner (MAX-1,0)
    expect(gameGrid.cells[0]![MAX_GRID_SIZE - 1]).toEqual({
      x: MAX_GRID_SIZE - 1,
      y: 0,
    });

    // Test bottom-left corner (0,MAX-1)
    expect(gameGrid.cells[MAX_GRID_SIZE - 1]![0]).toEqual({
      x: 0,
      y: MAX_GRID_SIZE - 1,
    });

    // Test bottom-right corner (MAX-1,MAX-1)
    expect(gameGrid.cells[MAX_GRID_SIZE - 1]![MAX_GRID_SIZE - 1]).toEqual({
      x: MAX_GRID_SIZE - 1,
      y: MAX_GRID_SIZE - 1,
    });
  });
});
