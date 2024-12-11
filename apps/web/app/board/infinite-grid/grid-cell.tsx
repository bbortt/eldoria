import { useDroppable } from '@dnd-kit/core';
import type { Cell } from '@repo/core';

import { DRAGGABLE_TYPE_CHARACTER } from '../constants';
import styles from './grid-cell.module.css';

const getCellContent = (cell: Cell): string => {
  return `(${cell.x},${cell.y})`;
};

export interface GridCellProps {
  cell: Cell;
}

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

  return (
    <div ref={setNodeRef} className={`${styles.gridCell} ${isOver ? 'bg-secondary/50' : 'bg-transparent'}`} data-testid={`cell-${x}-${y}`}>
      {getCellContent(cell)}
    </div>
  );
};

export default GridCell;
