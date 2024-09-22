import { FnContext } from 'boardgame.io';
import initGame from '../moves/init-game';

import initPhase from './init';

describe('initPhase', () => {
  test('should have correct properties', () => {
    expect(initPhase).toHaveProperty('moves');
    expect(initPhase).toHaveProperty('next', 'phaseB');
    expect(initPhase).toHaveProperty('endIf');
    expect(initPhase).toHaveProperty('start', true);
  });

  describe('moves', () => {
    test('should include initGame', () => {
      expect(initPhase.moves).toHaveProperty('initGame');
      expect(initPhase.moves!.initGame).toBe(initGame);
    });
  });

  describe('endIf', () => {
    test('should return true when G.username is set', () => {
      const G = { username: 'testUser' };
      expect(initPhase.endIf!({ G } as unknown as FnContext)).toBeTruthy();
    });

    test('should return false when G.username is not set', () => {
      const G = {};
      expect(initPhase.endIf!({ G } as unknown as FnContext)).toBeFalsy();
    });

    test('should return false when G.username is an empty string', () => {
      const G = { username: '' };
      expect(initPhase.endIf!({ G } as unknown as FnContext)).toBeFalsy();
    });
  });
});
