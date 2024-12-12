import { useDroppable } from '@dnd-kit/core';
import type { Cell } from '@repo/core';

import { CELL_BACKGROUND_BRIGHT, CELL_BACKGROUND_DARK, CELL_BACKGROUND_VALID, DRAGGABLE_TYPE_CHARACTER } from '../constants';
import styles from './grid-cell.module.css';

const getCellContent = (cell: Cell): string => {
  return `(${cell.x},${cell.y})`;
};

export interface GridCellProps {
  cell: Cell;
}

const calculateBgColor = (isOver: boolean, x: number, y: number): string => {
  if (isOver) {
    return CELL_BACKGROUND_VALID;
  }

  if ((x % 2 == 0 && y % 2 == 0) || (x % 2 == 1 && y % 2 == 1)) {
    return CELL_BACKGROUND_DARK;
  } else {
    return CELL_BACKGROUND_BRIGHT;
  }
};

export const GridCell: React.FC<GridCellProps> = ({ cell }) => {
  const { x, y } = cell;
  const { isOver, setNodeRef } = useDroppable({
    id: `grid-field-${x}-${y}`,
    data: {
      x,
      y,
      accepts: [DRAGGABLE_TYPE_CHARACTER],
    },
  });

  const bgColor = calculateBgColor(isOver, x, y);

  return (
    <div ref={setNodeRef} className={`${styles.gridCell} ${bgColor}`} data-testid={`cell-${x}-${y}`}>
      {getCellContent(cell)}
    </div>
  );
};

export default GridCell;
