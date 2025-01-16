import { Ctx } from 'boardgame.io';

import { GameState } from '../';
import { ROLL_PLACEMENT_PHASE } from '../phases';
import { EldoriaBot } from './index';

describe('EldoriaBot', () => {
  let mockGameState: GameState;
  let mockCtx: Ctx;
  const mockPlayerID = '0';

  let bot: EldoriaBot;

  beforeEach(() => {
    mockGameState = {} as GameState;
    mockCtx = {
      phase: '',
      turn: 0,
      currentPlayer: '0',
      numPlayers: 2,
    } as Ctx;

    bot = new EldoriaBot();
  });

  describe('enumerate', () => {
    describe('ROLL_PLACEMENT_PHASE', () => {
      it("should return 'rollDice' move", () => {
        mockCtx.phase = ROLL_PLACEMENT_PHASE;

        const moves = bot.enumerate(mockGameState, mockCtx, mockPlayerID);

        expect(moves).toHaveLength(1);
        expect(moves[0]).toEqual({ move: 'rollDice' });
      });
    });

    it('should return empty array for unknown phase', () => {
      mockCtx.phase = 'UNKNOWN_PHASE';

      const moves = bot.enumerate(mockGameState, mockCtx, mockPlayerID);

      expect(moves).toHaveLength(0);
      expect(moves).toEqual([]);
    });
  });
});
