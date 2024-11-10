import { Ctx, FnContext } from 'boardgame.io';

import nextFunction from './next-function';

import { GameState } from '../game-state';

describe('nextFunction', () => {
  it('should return the next player position in a 2 player game', () => {
    const mockContext = {
      ctx: {
        numPlayers: 2,
        playOrderPos: 0,
      } as Ctx,
      G: {} as GameState,
      random: undefined,
    } as unknown as FnContext<GameState>;

    expect(nextFunction(mockContext)).toEqual(1);
  });

  it('should wrap around to first player when at last position', () => {
    const mockContext = {
      ctx: {
        numPlayers: 2,
        playOrderPos: 1,
      } as Ctx,
      G: {} as GameState,
      random: undefined,
    } as unknown as FnContext<GameState>;

    expect(nextFunction(mockContext)).toEqual(0);
  });

  it('should work with 3 players', () => {
    const mockContext = {
      ctx: {
        numPlayers: 3,
        playOrderPos: 1,
      } as Ctx,
      G: {} as GameState,
      random: undefined,
    } as unknown as FnContext<GameState>;

    expect(nextFunction(mockContext)).toEqual(2);
  });

  it('should wrap around in 3 player game', () => {
    const mockContext = {
      ctx: {
        numPlayers: 3,
        playOrderPos: 2,
      },
      G: {} as GameState,
      random: undefined,
    } as unknown as FnContext<GameState>;

    expect(nextFunction(mockContext)).toEqual(0);
  });
});
