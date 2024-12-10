import { Character } from '../../stats';
import type { GameGrid } from '../game-grid';
import { GameState, InitGameState } from '../game-state';
import initGame from './init-game';

const mockGameState: GameState = {
  diceRoll: { '0': 1, '1': 2 },
  grid: {} as GameGrid,
  team: [],
  username: '',
  tutorial: false,
  showHints: false,
};

const mockGameConfiguration: Omit<InitGameState, 'tutorial' | 'showHints'> = {
  username: 'bbortt',
  team: [{} as Character],
};

describe('initGame', () => {
  it.each([true, false])('should initialize the game state with the provided configuration', (booleanArg: boolean) => {
    const context = { G: mockGameState, ctx: { numPlayers: 2 } };

    (mockGameConfiguration as InitGameState).tutorial = booleanArg;
    (mockGameConfiguration as InitGameState).showHints = booleanArg;

    // @ts-expect-error - type is not callable
    initGame(context, mockGameConfiguration);

    expect(context.G.username).toEqual('bbortt');
    expect(context.G.team).toHaveLength(1);
    expect(context.G.tutorial).toEqual(booleanArg);
    expect(context.G.showHints).toEqual(booleanArg);
    expect(Object.keys(context.G.diceRoll)).toMatchSnapshot(['0', '1']);
  });
});
