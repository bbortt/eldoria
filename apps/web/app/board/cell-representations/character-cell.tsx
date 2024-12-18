import { useDroppable } from '@dnd-kit/core';
import { Character, Specialization } from '@repo/core';
import { useMemo } from 'react';

import { calculateBgColor } from '@/game/styling/calculate-bg-color';

import styles from './grid-cell.module.css';
import { GridCellProps } from './index';

export interface CharacterCellProps extends GridCellProps {
  character: Character;
}

export const CharacterCell: React.FC<CharacterCellProps> = ({ cell, character }: CharacterCellProps) => {
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

  const Icon = useMemo(() => Specialization.fromLabel(character.specialization).icon, [character.specialization]);

  return (
    <div ref={setNodeRef} className={`${styles.gridCell} ${bgColor}`} data-testid={`cell-${x}-${y}`}>
      <Icon />
    </div>
  );
};

export default CharacterCell;
