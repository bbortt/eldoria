import type { Character } from '../../stats';
import { GameState } from '../game-state';
import { getSelectedCharacter } from './get-selected-character';

describe('getSelectedCharacter', () => {
  const mockCharacter1 = {
    name: 'Test Character 1',
  } as unknown as Character;

  const mockCharacter2 = {
    name: 'Test Character 2',
  } as unknown as Character;

  const createGameState = (selectedIndex?: number) =>
    ({
      team: [mockCharacter1, mockCharacter2],
      selectedCharacterIndex: selectedIndex,
    }) as unknown as GameState;

  it('should return the character at the selected index', () => {
    const gameState = createGameState(0);
    expect(getSelectedCharacter(gameState)).toBe(mockCharacter1);

    const gameState2 = createGameState(1);
    expect(getSelectedCharacter(gameState2)).toBe(mockCharacter2);
  });

  it('should return undefined when selectedCharacterIndex is undefined', () => {
    const gameState = createGameState(undefined);
    expect(getSelectedCharacter(gameState)).toBeUndefined();
  });

  it('should return undefined when selectedCharacterIndex is negative', () => {
    const gameState = createGameState(-1);
    expect(getSelectedCharacter(gameState)).toBeUndefined();
  });
});
