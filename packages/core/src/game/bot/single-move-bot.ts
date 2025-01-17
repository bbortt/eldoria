import { Bot } from 'boardgame.io/ai';
import type { BotAction } from './make-move';
import { makeMove } from './make-move';

export const singleMoveBot = (move: string): Bot =>
  ({
    play(): Promise<{ action: BotAction; metadata?: any }> {
      return Promise.resolve({ action: makeMove(move) });
    },
  }) as unknown as Bot;
