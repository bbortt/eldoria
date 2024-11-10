import { INVALID_MOVE } from 'boardgame.io/core';

import rollDice from './roll-dice';

import { GameState } from '../game-state';

describe('rollDice', () => {
  const mockEndTurn = jest.fn();
  const mockD20 = jest.fn();
  const mockRandom = { D20: mockD20 };

  const events = {
    endTurn: mockEndTurn,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return INVALID_MOVE for invalid player', () => {
    const G = {
      diceRoll: { '0': 0, '1': 0 },
      startingPlayer: null,
    } as GameState;

    const ctx = {
      currentPlayer: '2', // Invalid player
      random: mockRandom,
    };

    // @ts-expect-error - type is not callable
    const result = rollDice({ G, ctx, events, random: mockRandom });

    expect(result).toBe(INVALID_MOVE);
    expect(mockD20).not.toHaveBeenCalled();
    expect(mockEndTurn).not.toHaveBeenCalled();
  });

  it('should set dice roll for player 0', () => {
    const G = {
      diceRoll: { '0': 0, '1': 0 },
      startingPlayer: null,
    } as GameState;

    mockD20.mockReturnValue(4);

    // @ts-expect-error - type is not callable
    rollDice({ G, ctx: { currentPlayer: '0' }, events, random: mockRandom });

    expect(G.diceRoll['0']).toBe(4);
    expect(G.diceRoll['1']).toBe(0);
    expect(G.startingPlayer).toBeNull();
    expect(mockD20).toHaveBeenCalledTimes(1);
    expect(mockEndTurn).toHaveBeenCalledTimes(1);
  });

  it('should set dice roll for player 1', () => {
    const G = {
      diceRoll: { '0': 0, '1': 0 },
      startingPlayer: null,
    } as GameState;

    mockD20.mockReturnValue(3);

    // @ts-expect-error - type is not callable
    rollDice({ G, ctx: { currentPlayer: '1' }, events, random: mockRandom });

    expect(G.diceRoll['0']).toBe(0);
    expect(G.diceRoll['1']).toBe(3);
    expect(G.startingPlayer).toBeNull();
    expect(mockD20).toHaveBeenCalledTimes(1);
    expect(mockEndTurn).toHaveBeenCalledTimes(1);
  });

  it('should determine winner when player 0 rolls higher', () => {
    const G = {
      diceRoll: { '0': 6, '1': 0 },
      startingPlayer: null,
    } as GameState;

    mockD20.mockReturnValue(3);

    // @ts-expect-error - type is not callable
    rollDice({ G, ctx: { currentPlayer: '1' }, events, random: mockRandom });

    expect(G.diceRoll['0']).toBe(6);
    expect(G.diceRoll['1']).toBe(3);
    expect(G.startingPlayer).toBe('0');
    expect(mockEndTurn).toHaveBeenCalledTimes(1);
  });

  it('should determine winner when player 1 rolls higher', () => {
    const G = {
      diceRoll: { '0': 2, '1': 0 },
      startingPlayer: null,
    } as GameState;

    mockD20.mockReturnValue(5);

    // @ts-expect-error - type is not callable
    rollDice({ G, ctx: { currentPlayer: '1' }, events, random: mockRandom });

    expect(G.diceRoll['0']).toBe(2);
    expect(G.diceRoll['1']).toBe(5);
    expect(G.startingPlayer).toBe('1');
    expect(mockEndTurn).toHaveBeenCalledTimes(1);
  });

  it('should reset dice on tie', () => {
    const G = {
      diceRoll: { '0': 4, '1': 0 },
      startingPlayer: null,
    } as GameState;

    mockD20.mockReturnValue(4);

    // @ts-expect-error - type is not callable
    rollDice({ G, ctx: { currentPlayer: '1' }, events, random: mockRandom });

    expect(G.diceRoll).toEqual({ '0': 0, '1': 0 });
    expect(G.startingPlayer).toBeNull();
    expect(mockEndTurn).toHaveBeenCalledTimes(1);
  });
});
