import { beforeEach } from 'node:test';

import type { Store } from 'boardgame.io';
import { Step } from 'boardgame.io/ai';
import type { ClientState } from 'boardgame.io/dist/types/src/client/client';
import { Ctx } from 'boardgame.io/src/types';

import { BotClient } from '../';
import { ROLL_PLACEMENT_PHASE } from '../phases';
import { BOT_PLAYER_ID, BotSubscription, initBot, newBotSubscription } from './index';
import { singleMoveBot } from './single-move-bot';

jest.mock('./single-move-bot');
jest.mock('boardgame.io/ai', () => ({
  Step: jest.fn(),
}));

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('EldoriaBot', () => {
  const client: BotClient = {
    store: jest.fn() as unknown as Store,
    subscribe: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('initBot', () => {
    it('should subscribe to client', () => {
      initBot(client, BOT_PLAYER_ID);

      expect(client.store).not.toHaveBeenCalled();
      expect(client.subscribe).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe('bot subscription', () => {
    const mockClient = jest.fn() as unknown as BotClient;
    const botSubscription: BotSubscription = newBotSubscription(mockClient, BOT_PLAYER_ID);

    it('should do nothing when state is null', () => {
      botSubscription(null as unknown as ClientState);

      jest.runAllTimers();
      expect(Step).not.toHaveBeenCalled();
      expect(singleMoveBot).not.toHaveBeenCalled();
    });

    it('should do nothing when currentPlayer is not BOT_PLAYER_ID', () => {
      const state = {
        ctx: {
          currentPlayer: 'human',
          phase: ROLL_PLACEMENT_PHASE,
        } as Ctx,
        G: {
          diceRoll: { [BOT_PLAYER_ID]: 0 },
        },
      } as ClientState;

      botSubscription(state);

      jest.runAllTimers();
      expect(Step).not.toHaveBeenCalled();
      expect(singleMoveBot).not.toHaveBeenCalled();
    });

    it('should do nothing when phase is not ROLL_PLACEMENT_PHASE', () => {
      const state = {
        ctx: {
          currentPlayer: BOT_PLAYER_ID,
          phase: 'other_phase',
        } as Ctx,
        G: {
          diceRoll: { [BOT_PLAYER_ID]: 0 },
        },
      } as ClientState;

      botSubscription(state);

      jest.runAllTimers();
      expect(Step).not.toHaveBeenCalled();
      expect(singleMoveBot).not.toHaveBeenCalled();
    });

    it('should do nothing when diceRoll is not 0', () => {
      const state = {
        ctx: {
          currentPlayer: BOT_PLAYER_ID,
          phase: ROLL_PLACEMENT_PHASE,
        } as Ctx,
        G: {
          diceRoll: { [BOT_PLAYER_ID]: 5 },
        },
      } as ClientState;

      botSubscription(state);

      jest.runAllTimers();
      expect(Step).not.toHaveBeenCalled();
      expect(singleMoveBot).not.toHaveBeenCalled();
    });

    it('should initiate a dice-roll when all conditions are met', () => {
      const mockBot = { play: jest.fn() };
      (singleMoveBot as jest.Mock).mockReturnValue(mockBot);

      const state = {
        ctx: {
          currentPlayer: BOT_PLAYER_ID,
          phase: ROLL_PLACEMENT_PHASE,
        } as Ctx,
        G: {
          diceRoll: { [BOT_PLAYER_ID]: 0 },
        },
      } as ClientState;

      botSubscription(state);

      jest.runAllTimers();
      expect(singleMoveBot).toHaveBeenCalledWith('rollDice', BOT_PLAYER_ID);
      expect(Step).toHaveBeenCalledWith(mockClient, mockBot);
    });

    it('should use setTimeout with 0 delay for the dice roll', () => {
      const mockBot = { play: jest.fn() };
      (singleMoveBot as jest.Mock).mockReturnValue(mockBot);

      const state = {
        ctx: {
          currentPlayer: BOT_PLAYER_ID,
          phase: ROLL_PLACEMENT_PHASE,
        } as Ctx,
        G: {
          diceRoll: { [BOT_PLAYER_ID]: 0 },
        },
      } as ClientState;

      botSubscription(state);

      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 0);
      jest.runAllTimers();
      expect(Step).toHaveBeenCalledWith(mockClient, mockBot);
    });
  });
});
