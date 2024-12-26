import { useDroppable } from '@dnd-kit/core';

import { calculateBgColor } from '@/game/board/calculate-bg-color';
import { DRAGGABLE_TYPE_CHARACTER } from '@/game/constants';

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
      <span className={styles.gridCellText}>
        ({x}, {y})
      </span>
    </div>
  );
};

export default EmptyCell;
