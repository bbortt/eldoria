import { useDroppable } from '@dnd-kit/core';
import type { Cell, GameGrid } from '@repo/core';

import { DRAGGABLE_TYPE_CHARACTER } from '../constants';
import { GridInformation } from './calculate-grid-information';
import styles from './render-grid.module.css';

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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (x >= 0 && x < gridBoundary && y >= 0 && y < gridBoundary && !!grid.cells[y] && !!grid.cells[y]![x]) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { isOver, setNodeRef } = useDroppable({
          id: `grid-field-${x}-${y}`,
          data: {
            x,
            y,
            accepts: [DRAGGABLE_TYPE_CHARACTER],
          },
        });

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const cell = grid.cells[y]![x]!;
        visibleCells.push(
          <div ref={setNodeRef} className={`${styles.gridCell} ${isOver ? 'bg-secondary/50' : 'bg-transparent'}`} key={`${x},${y}`}>
            {getCellContent(cell)}
          </div>,
        );
      }
    }
  }

  return visibleCells;
};
