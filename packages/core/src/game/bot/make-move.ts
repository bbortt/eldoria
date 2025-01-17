// See https://github.com/boardgameio/boardgame.io/blob/4f3c90df0d891f2e17f2bfafbed1bd4f4b804256/src/types.ts#L458
export interface MakeMove {
  type: 'MAKE_MOVE';
  payload: {
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args: any;
    playerID: string | null | undefined;
    credentials: string | undefined;
  };
}

// See https://github.com/boardgameio/boardgame.io/blob/4f3c90df0d891f2e17f2bfafbed1bd4f4b804256/src/ai/bot.ts#L14
export type BotAction = MakeMove;

// See https://github.com/boardgameio/boardgame.io/blob/4f3c90df0d891f2e17f2bfafbed1bd4f4b804256/src/core/action-creators.ts#L21
export const makeMove = (type: string, args?: never, playerID?: string | null, credentials?: string): MakeMove => ({
  type: 'MAKE_MOVE',
  payload: { type, args, playerID, credentials },
});
