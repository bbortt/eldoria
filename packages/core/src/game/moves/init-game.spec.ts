import { Character } from '../../stats';
import { GameState, InitGameState } from '../game-state';

import type { GameGrid } from '../game-grid';
import initGame from './init-game';

const mockGameState: GameState = {
  diceRoll: { '0': 1, '1': 2 },
  grid: {} as GameGrid,
  startingPlayer: null,
  team: [],
  username: '',
};

const mockGameConfiguration: InitGameState = {
  username: 'bbortt',
  team: [{} as Character],
};

describe('initGame', () => {
  it('should initialize the game state with the provided configuration', () => {
    const context = { G: mockGameState, ctx: { numPlayers: 2 } };

    // @ts-expect-error - type is not callable
    initGame(context, mockGameConfiguration);

    expect(context.G.username).toBe('bbortt');
    expect(context.G.team).toHaveLength(1);
    expect(Object.keys(context.G.diceRoll)).toMatchSnapshot(['0', '1']);
  });
});
