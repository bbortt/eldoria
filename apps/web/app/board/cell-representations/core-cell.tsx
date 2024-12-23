import { useDroppable } from '@dnd-kit/core';
import { Mountain } from 'lucide-react';

import { calculateBgColor } from '@/game/styling/calculate-bg-color';

import styles from './grid-cell.module.css';
import { GridCellProps } from './index';

export const CoreCell: React.FC<GridCellProps> = ({ cell }: GridCellProps) => {
  const { x, y } = cell;
  const { isOver, setNodeRef } = useDroppable({
    id: `grid-field-${x}-${y}`,
    data: {
      x,
      y,
      accepts: [],
    },
  });

  const bgColor = calculateBgColor(isOver, false, x, y);

  return (
    <div ref={setNodeRef} className={`${styles.gridCell} ${bgColor}`} data-testid={`cell-${x}-${y}`}>
      <Mountain />
    </div>
  );
};

export default CoreCell;
