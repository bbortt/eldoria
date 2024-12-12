import { useDroppable } from '@dnd-kit/core';

import { DRAGGABLE_TYPE_CHARACTER } from '../constants';
import { calculateBgColor } from './calculate-bg-color';
import styles from './grid-cell.module.css';
import { GridCellProps } from './index';

export const EmptyCell: React.FC<GridCellProps> = ({ cell }: GridCellProps) => {
  const { x, y } = cell;
  const { isOver, setNodeRef } = useDroppable({
    id: `grid-field-${x}-${y}`,
    data: {
      x,
      y,
      accepts: [DRAGGABLE_TYPE_CHARACTER],
    },
  });

  const bgColor = calculateBgColor(isOver, true, x, y);

  return (
    <div ref={setNodeRef} className={`${styles.gridCell} ${bgColor}`} data-testid={`cell-${x}-${y}`}>
      ({x}, {y})
    </div>
  );
};

export default EmptyCell;
