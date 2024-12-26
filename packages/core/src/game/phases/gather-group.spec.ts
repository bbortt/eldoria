import { FnContext } from 'boardgame.io';

import { Character } from '../../stats';
import { CELL_TYPE_CHARACTER, CELL_TYPE_CORE } from '../cell';
import { initGameGrid } from '../game-grid';
import type { GameState } from '../game-state';
import highlightCharacter from '../moves/highlight-character';
import placeCharacter from '../moves/place-character';
import gatherGroupPhase from './gather-group';
import { PLAY_PHASE } from './index';
import nextFunction from './next-function';

describe('gatherGroupPhase', () => {
  const createMockGameState = (overrides = {}): GameState =>
    ({
      grid: initGameGrid(),
      team: [{ name: 'Character 1' } as Character, { name: 'Character 2' } as Character],
      startingPlayer: '0',
      ...overrides,
    }) as unknown as GameState;

  const createMockContext = (G: GameState): FnContext =>
    ({
      G,
      ctx: {
        currentPlayer: '0',
        playOrder: ['0', '1'],
      },
    }) as unknown as FnContext;

  it('should have correct properties', () => {
    expect(gatherGroupPhase).toHaveProperty('moves', { highlightCharacter, placeCharacter });
    expect(gatherGroupPhase).toHaveProperty('next', PLAY_PHASE);
    expect(gatherGroupPhase).toHaveProperty('endIf');
  });

  describe('turn order', () => {
    it('should always start with player 0', () => {
      expect(gatherGroupPhase.turn?.order?.first(createMockContext(createMockGameState()))).toEqual(0);
    });

    it('should use `nextFunction`', () => {
      expect(gatherGroupPhase.turn?.order?.next).toEqual(nextFunction);
    });

    it('generates correct play order when starting player is 0', () => {
      const G = createMockGameState({ startingPlayer: '0' });
      const playOrder = gatherGroupPhase.turn?.order?.playOrder?.(createMockContext(G));
      expect(playOrder).toEqual(['0', '1']);
    });

    it('generates correct play order when starting player is 1', () => {
      const G = createMockGameState({ startingPlayer: '1' });
      const playOrder = gatherGroupPhase.turn?.order?.playOrder?.(createMockContext(G));
      expect(playOrder).toEqual(['1', '0']);
    });
  });

  describe('endIf', () => {
    it('returns false when no characters are placed', () => {
      const G = createMockGameState();
      const ctx = createMockContext(G);
      expect(gatherGroupPhase.endIf?.(ctx)).toBe(false);
    });

    it('returns false when only some characters are placed', () => {
      const G = createMockGameState();
      G.grid.cells[0]![0]!.content = {
        type: CELL_TYPE_CHARACTER,
        characterIndex: 1,
      };
      const ctx = createMockContext(G);
      expect(gatherGroupPhase.endIf?.(ctx)).toBe(false);
    });

    it('returns true when all team characters are placed', () => {
      const G = createMockGameState();
      // Place all characters
      G.grid.cells[0]![0]!.content = {
        type: CELL_TYPE_CHARACTER,
        characterIndex: 1,
      };
      G.grid.cells[0]![1]!.content = {
        type: CELL_TYPE_CHARACTER,
        characterIndex: 2,
      };
      const ctx = createMockContext(G);
      expect(gatherGroupPhase.endIf?.(ctx)).toBe(true);
    });

    it('ignores non-character content in cells', () => {
      const G = createMockGameState();
      G.grid.cells[0]![0]!.content = {
        type: CELL_TYPE_CORE,
      };
      const ctx = createMockContext(G);
      expect(gatherGroupPhase.endIf?.(ctx)).toBe(false);
    });
  });
});
