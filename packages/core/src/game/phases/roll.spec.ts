import { FnContext } from 'boardgame.io';

import type { GameState } from '../game-state';
import rollDice from '../moves/roll-dice';
import { GATHER_GROUP } from './index';
import nextFunction from './next-function';
import rollPhase from './roll';

describe('rollPhase', () => {
  it('should have correct properties', () => {
    expect(rollPhase).toHaveProperty('moves');
    expect(rollPhase).toHaveProperty('next', GATHER_GROUP);
    expect(rollPhase).toHaveProperty('endIf');
    expect(rollPhase).toHaveProperty('onEnd');
  });

  describe('moves', () => {
    it('should include rollDice', () => {
      expect(rollPhase.moves).toHaveProperty('rollDice');
      expect(rollPhase.moves!.rollDice).toEqual(rollDice);
    });
  });

  describe('turn order', () => {
    it('should always start with player 0', () => {
      expect(rollPhase.turn?.order?.first({} as FnContext<GameState>)).toEqual(0);
    });

    it('should use `nextFunction`', () => {
      expect(rollPhase.turn?.order?.next).toEqual(nextFunction);
    });
  });

  describe('endIf', () => {
    it('should return true when G.startingPlayer is set', () => {
      const G = { startingPlayer: 'testUser' };

      const result = rollPhase.endIf!({ G } as unknown as FnContext);

      expect(result).toBeTruthy();
    });

    it.each([null, ''])('should return false when G.startingPlayer is not set (startingPlayer: %s)', startingPlayer => {
      const G = { startingPlayer };

      const result = rollPhase.endIf!({ G } as unknown as FnContext);

      expect(result).toBeFalsy();
    });
  });

  describe('onEnd', () => {
    it('should reset diceRoll', () => {
      const diceRoll = { '0': 1, '1': 2 };
      const G = { diceRoll };

      rollPhase.onEnd!({ G } as unknown as FnContext);

      expect(G.diceRoll).toEqual({ '0': 0, '1': 0 });
    });
  });
});
