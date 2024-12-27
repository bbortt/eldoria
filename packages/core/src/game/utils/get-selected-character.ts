import type { Character } from '../../stats';
import { GameState } from '../game-state';

export const getSelectedCharacter = (gameState: GameState): Character | undefined => {
  if (gameState.selectedCharacterIndex !== undefined && gameState.selectedCharacterIndex >= 0) {
    return gameState.team[gameState.selectedCharacterIndex];
  }
};
