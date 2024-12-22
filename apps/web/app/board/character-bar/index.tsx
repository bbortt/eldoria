import { Character, type GameGrid } from '@repo/core';
import { Card } from '@repo/ui';

import { CharacterCard } from './character-card';
import styles from './index.module.css';

export interface CharacterBarProps {
  characters: Character[];
  grid: GameGrid;
}

const gridContainsCharacter = (grid: GameGrid, characterIndex: number): boolean => {
  for (const rowY of grid.cells) {
    for (const rowX of rowY) {
      if (rowX.content?.characterIndex === characterIndex) {
        return true;
      }
    }
  }

  return false;
};

export const CharacterBar: React.FC<CharacterBarProps> = ({ characters, grid }) => {
  return (
    <Card className={styles.characterCard}>
      <div className={styles.characterCardContent}>
        {characters.map((character: Character, index: number) => (
          <CharacterCard
            character={character}
            index={index}
            key={`character-${index}`}
            isPlacementPossible={!gridContainsCharacter(grid, index)}
          />
        ))}
      </div>
    </Card>
  );
};

export default CharacterBar;
