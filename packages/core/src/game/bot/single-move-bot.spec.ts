import type { State } from 'boardgame.io';
import { PlayerID } from 'boardgame.io';

import { makeMove } from './make-move';
import { singleMoveBot } from './single-move-bot';

jest.mock('./make-move', () => ({
  makeMove: jest.fn(),
}));

describe('singleMoveBot', () => {
  const gameState = {} as State;
  const playerID: PlayerID = '0';

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should create a bot that returns a promise with the specified move', async () => {
    const mockMove = 'testMove';
    const expectedAction = { type: 'MAKE_MOVE', payload: { type: mockMove } };
    (makeMove as jest.Mock).mockReturnValue(expectedAction);

    const bot = singleMoveBot(mockMove);
    const result = await bot.play(gameState, playerID);

    expect(result).toEqual({ action: expectedAction });
    expect(makeMove).toHaveBeenCalledWith(mockMove, undefined);
    expect(makeMove).toHaveBeenCalledTimes(1);
  });

  it('should pass additional arguments to makeMove when provided', async () => {
    const mockMove = 'testMove';
    const mockArgs = { test: 'value' };
    const expectedAction = {
      type: 'MAKE_MOVE',
      payload: { type: mockMove, args: mockArgs },
    };
    (makeMove as jest.Mock).mockReturnValue(expectedAction);

    const bot = singleMoveBot(mockMove, mockArgs);
    const result = await bot.play(gameState, playerID);

    expect(result).toEqual({ action: expectedAction });
    expect(makeMove).toHaveBeenCalledWith(mockMove, mockArgs);
    expect(makeMove).toHaveBeenCalledTimes(1);
  });

  it('should return a valid Bot instance', () => {
    const bot = singleMoveBot('testMove');

    expect(bot).toBeDefined();
    expect(typeof bot.play).toBe('function');
  });

  it('should always return a Promise from play()', () => {
    const bot = singleMoveBot('testMove');
    const result = bot.play(gameState, playerID);

    expect(result).toBeInstanceOf(Promise);
  });

  it('should not include metadata in the returned object', async () => {
    const bot = singleMoveBot('testMove');
    const result = bot.play(gameState, playerID);

    expect(result).not.toHaveProperty('metadata');
  });
});
