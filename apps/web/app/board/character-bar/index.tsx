import { DragOverlay, useDraggable } from '@dnd-kit/core';
import { Character, Specialization } from '@repo/core';
import { Card } from '@repo/ui';
import React from 'react';

import { DRAGGABLE_TYPE_CHARACTER } from '../constants';
import styles from './index.module.css';

const renderCharacter = (character: Character, index: number) => {
  const Icon = Specialization.fromLabel(character.specialization).icon;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { attributes, isDragging, listeners, setNodeRef } = useDraggable({
    id: `character-${index}`,
    data: {
      character,
      type: DRAGGABLE_TYPE_CHARACTER,
    },
  });

  return (
    <React.Fragment key={`character-${index}`}>
      <div className={styles.cardIcon} ref={setNodeRef} {...listeners} {...attributes}>
        <Icon className={styles.cardIconInner} />
        <span>{character.name}</span>
      </div>

      <DragOverlay dropAnimation={null}>
        {isDragging ? (
          <div className={styles.cardIcon}>
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

export interface CharacterBarProps {
  characters: Character[];
}

export const CharacterBar: React.FC<CharacterBarProps> = ({ characters }) => {
  return (
    <Card className={styles.characterCard}>
      <div className={styles.characterCardContent}>{characters.map(renderCharacter)}</div>
    </Card>
  );
};

export default CharacterBar;
