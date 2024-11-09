import type { Cell, GameGrid } from '@repo/core';

import { GridInformation } from './calculate-grid-information';

const getCellContent = (cell: Cell): string => {
  return `(${cell.x},${cell.y})`;
};

export const renderGrid = (gridInformation: GridInformation, grid: GameGrid) => {
  const { startX, endX, startY, endY } = gridInformation;
  const gridBoundary = grid.cells.length;

  const visibleCells = [];
  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      // Only render cells within the boundary
      if (x >= 0 && x < gridBoundary && y >= 0 && y < gridBoundary) {
        const cell = grid.cells[y]![x]!;
        visibleCells.push(
          <div
            key={`${cell.x},${cell.y}`}
            style={{
              border: '1px solid',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {getCellContent(cell)}
          </div>,
        );
      }
    }
  }

  return visibleCells;
};
