import { Bot } from 'boardgame.io/ai';

import type { BotAction } from './make-move';
import { makeMove } from './make-move';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const singleMoveBot = (move: string, args?: any): Bot =>
  ({
    play(): Promise<{ action: BotAction; metadata?: never }> {
      return Promise.resolve({ action: makeMove(move, args) });
    },
  }) as unknown as Bot;
