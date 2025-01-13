import { useDroppable } from '@dnd-kit/core';
import { MountainIcon } from 'lucide-react';

import { calculateBgColor } from '@/game/board/calculate-bg-color';

import styles from './grid-cell.module.css';
import { GridCellProps } from './index';

export interface CoreCellProps extends GridCellProps {
  unselectCharacter: () => void;
}

export const CoreCell: React.FC<CoreCellProps> = ({ cell, unselectCharacter }) => {
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
    <div ref={setNodeRef} className={`${styles.gridCell} ${bgColor}`} onClick={unselectCharacter} data-testid={`cell-${x}-${y}`}>
      <MountainIcon />
    </div>
  );
};

export default CoreCell;
