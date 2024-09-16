import { Character } from '../../stats';
import { GameState, InitGameState } from '../game-state';

import initGame from './init-game';

const mockGameState: GameState = {
  username: '',
  allies: [],
};

const mockGameConfiguration: InitGameState = {
  username: 'bbortt',
  allies: [{} as Character],
};

describe('initGame', () => {
  it('should initialize the game state with the provided configuration', () => {
    const context = { G: mockGameState };

    // @ts-expect-error - type is not callable
    initGame(context, mockGameConfiguration);

    expect(context.G.username).toBe('bbortt');
    expect(context.G.allies).toHaveLength(1);
  });
});
