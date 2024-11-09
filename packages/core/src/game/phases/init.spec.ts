import { FnContext } from 'boardgame.io';

import { ROLL_PHASE } from './index';
import initPhase from './init';

import initGame from '../moves/init-game';

describe('initPhase', () => {
  it('should have correct properties', () => {
    expect(initPhase).toHaveProperty('moves');
    expect(initPhase).toHaveProperty('next', ROLL_PHASE);
    expect(initPhase).toHaveProperty('endIf');
    expect(initPhase).toHaveProperty('start', true);
  });

  describe('moves', () => {
    it('should include initGame', () => {
      expect(initPhase.moves).toHaveProperty('initGame');
      expect(initPhase.moves!.initGame).toBe(initGame);
    });
  });

  describe('endIf', () => {
    it('should return true when G.username is set', () => {
      const G = { username: 'testUser' };

      const result = initPhase.endIf!({ G } as unknown as FnContext);

      expect(result).toBeTruthy();
    });

    it.each([null, ''])('should return false when G.username is not set (%s)', username => {
      const G = { username };

      const result = initPhase.endIf!({ G } as unknown as FnContext);

      expect(result).toBeFalsy();
    });
  });
});
