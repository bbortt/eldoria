import { DragOverlay, useDraggable } from '@dnd-kit/core';
import { Character, Specialization } from '@repo/core';
import React, { useMemo } from 'react';

import { DRAGGABLE_TYPE_CHARACTER } from '@/game/constants';

import styles from './character-card.module.css';

export interface CharacterCardProps {
  character: Character;
  index: number;
  isPlacementPossible: boolean;
  highlightCharacter: () => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  index,
  isPlacementPossible,
  highlightCharacter,
}: CharacterCardProps) => {
  const { attributes, isDragging, listeners, setNodeRef } = useDraggable({
    id: `character-${index}`,
    data: {
      character,
      type: DRAGGABLE_TYPE_CHARACTER,
    },
    disabled: !isPlacementPossible,
  });

  const Icon = useMemo(() => Specialization.fromLabel(character.specialization).icon, [character.specialization]);

  return (
    <React.Fragment>
      <div
        className={`${styles.cardIcon} ${isPlacementPossible && styles.cardIconFocus}`}
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        onClick={highlightCharacter}
      >
        <Icon className={styles.cardIconInner} />
        <span>{character.name}</span>
      </div>

      <DragOverlay dropAnimation={null}>
        {isDragging ? (
          <div className={`${styles.cardIcon} ${isPlacementPossible && styles.cardIconFocus}`}>
            <Icon className={styles.cardIconInner} />
            <span>{character.name}</span>
          </div>
        ) : (
          <></>
        )}
      </DragOverlay>
    </React.Fragment>
  );
};

export default CharacterCard;
