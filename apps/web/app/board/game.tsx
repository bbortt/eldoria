'use client';

import { Client, Eldoria } from '@repo/core';

import Board from './board';

export const game: ReturnType<typeof Client> = Client({ game: Eldoria, board: Board });

export default game;
