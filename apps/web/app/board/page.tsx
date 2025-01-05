'use client';

import { Client, Eldoria, Local, MCTSBot } from '@repo/core';

import Board from './board';

export default () => {
  const Game: ReturnType<typeof Client> = Client({
    game: Eldoria,
    board: Board,
    numPlayers: 2,
    multiplayer: Local({
      bots: {
        1: MCTSBot,
      },
    }),
  });
  // @ts-expect-error TS2786: Game cannot be used as a JSX component.
  return <Game playerID="0" matchID="vs-game" />;
};
