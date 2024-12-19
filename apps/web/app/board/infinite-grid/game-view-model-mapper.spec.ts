import { Cell, GameGrid } from '@repo/core';

import type { GridInformation } from '@/game/board/grid-information';

import { CellViewModel, GameViewModelMapper } from './game-view-model-mapper';

describe('GameViewModelMapper', () => {
  let fixture: GameViewModelMapper;

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();

    fixture = new GameViewModelMapper();
  });

  describe('toViewModel', () => {
    // Helper function to create a test grid
    const createTestGrid = (size: number): GameGrid => {
      const cells: (readonly Cell[])[] = [];
      for (let y = 0; y < size; y++) {
        const row: Cell[] = [];
        for (let x = 0; x < size; x++) {
          row.push({ x, y });
        }
        cells.push(Object.freeze(row));
      }

      return { cells: Object.freeze(cells) };
    };

    it('should render cells within the visible area', () => {
      const grid = createTestGrid(4);
      const gridInfo: GridInformation = {
        startX: 0,
        endX: 2,
        startY: 0,
        endY: 2,
      };

      const result: CellViewModel[] = fixture.toViewModel(grid, gridInfo);

      // Should render 4 cells (2x2 area)
      expect(result).toHaveLength(4);

      // Check content of rendered cells
      expect(result[0]).toEqual(expect.objectContaining({ x: 0, y: 0 }));
      expect(result[1]).toEqual(expect.objectContaining({ x: 1, y: 0 }));
      expect(result[2]).toEqual(expect.objectContaining({ x: 0, y: 1 }));
      expect(result[3]).toEqual(expect.objectContaining({ x: 1, y: 1 }));
    });

    it('should respect grid boundaries when rendering', () => {
      const grid = createTestGrid(3);
      const gridInfo: GridInformation = {
        startX: -1, // Outside grid
        endX: 4, // Outside grid
        startY: -1, // Outside grid
        endY: 4, // Outside grid
      };

      const result: CellViewModel[] = fixture.toViewModel(grid, gridInfo);

      // Should only render cells within 3x3 grid
      expect(result).toHaveLength(9);

      // Verify all rendered cells are within bounds
      result.forEach(viewModel => {
        const { x, y } = viewModel;
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThan(3);
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThan(3);
      });
    });

    it('should handle empty visible area', () => {
      const grid = createTestGrid(4);
      const gridInfo: GridInformation = {
        startX: 0,
        endX: 0,
        startY: 0,
        endY: 0,
      };

      const result: CellViewModel[] = fixture.toViewModel(grid, gridInfo);
      expect(result).toHaveLength(0);
    });

    it('should handle visible area completely outside grid', () => {
      const grid = createTestGrid(4);
      const gridInfo: GridInformation = {
        startX: 5,
        endX: 7,
        startY: 5,
        endY: 7,
      };

      const result: CellViewModel[] = fixture.toViewModel(grid, gridInfo);
      expect(result).toHaveLength(0);
    });

    it('should render correct cells when grid area partially overlaps', () => {
      const grid = createTestGrid(4);
      const gridInfo: GridInformation = {
        startX: 2,
        endX: 5, // Beyond grid boundary
        startY: 2,
        endY: 5, // Beyond grid boundary
      };

      const result: CellViewModel[] = fixture.toViewModel(grid, gridInfo);

      // Should only render the cells that are within bounds
      expect(result).toHaveLength(4); // 2x2 area from (2,2) to (3,3)

      // Verify correct cells are rendered
      expect(result[0]).toEqual(expect.objectContaining({ x: 2, y: 2 }));
      expect(result[1]).toEqual(expect.objectContaining({ x: 3, y: 2 }));
      expect(result[2]).toEqual(expect.objectContaining({ x: 2, y: 3 }));
      expect(result[3]).toEqual(expect.objectContaining({ x: 3, y: 3 }));
    });

    it('returns a `draw` function for each cell', () => {
      const grid = createTestGrid(4);
      const gridInfo: GridInformation = {
        startX: 0,
        endX: 4,
        startY: 0,
        endY: 4,
      };

      const result: CellViewModel[] = fixture.toViewModel(grid, gridInfo);

      result.forEach(viewModel => {
        expect(viewModel.draw).toBeDefined();
      });
    });
  });
});
