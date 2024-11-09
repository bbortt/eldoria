'use client';

import { Client, Eldoria } from '@repo/core';

import Board from './board';

export default () => {
  const Game: ReturnType<typeof Client> = Client({ game: Eldoria, board: Board, numPlayers: 2 });
  return <Game />;
};
