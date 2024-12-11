import type { Cell, GameGrid } from '@repo/core';

import { GridInformation } from './calculate-grid-information';
import { renderGrid } from './render-grid';

describe('renderGrid', () => {
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

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should render cells within the visible area', () => {
    const grid = createTestGrid(4);
    const gridInfo: GridInformation = {
      startX: 0,
      endX: 2,
      startY: 0,
      endY: 2,
    };

    const result = renderGrid(gridInfo, grid);

    // Should render 4 cells (2x2 area)
    expect(result).toHaveLength(4);

    // Check content of rendered cells
    expect(result[0]?.props.cell).toEqual(grid.cells[0][0]);
    expect(result[1]?.props.cell).toEqual(grid.cells[0][1]);
    expect(result[2]?.props.cell).toEqual(grid.cells[1][0]);
    expect(result[3]?.props.cell).toEqual(grid.cells[1][1]);

    // Check uniqueness of keys
    expect(result[0]?.key).toEqual('0,0');
    expect(result[1]?.key).toEqual('1,0');
    expect(result[2]?.key).toEqual('0,1');
    expect(result[3]?.key).toEqual('1,1');
  });

  it('should respect grid boundaries when rendering', () => {
    const grid = createTestGrid(3);
    const gridInfo: GridInformation = {
      startX: -1, // Outside grid
      endX: 4, // Outside grid
      startY: -1, // Outside grid
      endY: 4, // Outside grid
    };

    const result = renderGrid(gridInfo, grid);

    // Should only render cells within 3x3 grid
    expect(result).toHaveLength(9);

    // Verify all rendered cells are within bounds
    result.forEach(cell => {
      const { x, y } = cell.props.cell;
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

    const result = renderGrid(gridInfo, grid);
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

    const result = renderGrid(gridInfo, grid);
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

    const result = renderGrid(gridInfo, grid);

    // Should only render the cells that are within bounds
    expect(result).toHaveLength(4); // 2x2 area from (2,2) to (3,3)

    // Verify correct cells are rendered
    const renderedCells = result.map(cell => cell.props.cell);
    expect(renderedCells[0]).toEqual({ x: 2, y: 2 });
    expect(renderedCells[1]).toEqual({ x: 3, y: 2 });
    expect(renderedCells[2]).toEqual({ x: 2, y: 3 });
    expect(renderedCells[3]).toEqual({ x: 3, y: 3 });
  });
});
