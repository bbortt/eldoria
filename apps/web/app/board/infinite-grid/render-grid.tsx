import type { GameGrid } from '@repo/core';

import { GridInformation } from './calculate-grid-information';
import { GridCell } from './grid-cell';

export const renderGrid = (gridInformation: GridInformation, grid: GameGrid) => {
  const { startX, endX, startY, endY } = gridInformation;
  const gridBoundary = grid.cells.length;

  const visibleCells = [];
  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      // Only render cells within the boundary
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (x >= 0 && x < gridBoundary && y >= 0 && y < gridBoundary && !!grid.cells[y] && !!grid.cells[y]![x]) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const cell = grid.cells[y]![x]!;
        visibleCells.push(<GridCell cell={cell} key={`${x},${y}`} />);
      }
    }
  }

  return visibleCells;
};
