import { useDroppable } from '@dnd-kit/core';
import { Character, Race, Specialization } from '@repo/core';
import { useMemo } from 'react';

import { calculateBgColor } from '@/game/board/calculate-bg-color';
import { determineHealthBarColor } from '@/game/styling/determine-health-bar-color';
import { getRaceColors } from '@/game/styling/get-race-colors';

import styles from './character-cell.module.css';
import globalStyles from './grid-cell.module.css';
import { GridCellProps } from './index';

export interface CharacterCellProps extends GridCellProps {
  character: Character;
  highlightCharacter: () => void;
}

export const CharacterCell: React.FC<CharacterCellProps> = ({ cell, character, highlightCharacter }) => {
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

  const race = useMemo(() => Race.fromLabel(character.race), [character.race]);
  const Icon = useMemo(() => Specialization.fromLabel(character.specialization).icon, [character.specialization]);

  const healthBarColor = useMemo(() => determineHealthBarColor(character), [character]);
  const healthPercent = (character.currentHP / character.maxHP) * 100;

  return (
    <div ref={setNodeRef} className={`${globalStyles.gridCell} ${bgColor}`} onClick={highlightCharacter} data-testid={`cell-${x}-${y}`}>
      <div className={styles.characterIconContainer}>
        <Icon className={`${styles.gridCellText} ${getRaceColors(race).text}`} />
      </div>

      <div className={styles.healthBar}>
        <div className={`${styles.healthBarInner} ${healthBarColor}`} style={{ width: `${healthPercent}%` }} />
      </div>
    </div>
  );
};

export default CharacterCell;
