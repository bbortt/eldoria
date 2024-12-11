import { Character } from '@repo/core';
import { Card } from '@repo/ui';
import React from 'react';

import { CharacterCard } from './character-card';
import styles from './index.module.css';

export interface CharacterBarProps {
  characters: Character[];
}

export const CharacterBar: React.FC<CharacterBarProps> = ({ characters }) => {
  return (
    <Card className={styles.characterCard}>
      <div className={styles.characterCardContent}>
        {characters.map((character: Character, index: number) => (
          <CharacterCard character={character} index={index} key={`character-${index}`} />
        ))}
      </div>
    </Card>
  );
};

export default CharacterBar;
