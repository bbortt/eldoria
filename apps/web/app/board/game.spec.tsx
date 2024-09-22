import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { Client, Eldoria } from '@repo/core';

import Board from './board';
import game from './game';

jest.mock('@repo/core', () => ({
  Client: jest.fn(() => 'MockedClient'),
  Eldoria: { name: 'Eldoria' },
}));

jest.mock('./board', () => ({
  __esModule: true,
  default: { name: 'Board' },
}));

describe('Game Client', () => {
  it('creates a client with correct parameters', () => {
    expect(Client).toHaveBeenCalledWith({
      game: Eldoria,
      board: Board,
    });
  });

  it('exports the created client', () => {
    expect(game).toBe('MockedClient');
  });

  it('has "use client" directive at the top of the file', () => {
    const filePath = resolve(__dirname, './game.tsx');
    const fileContent = readFileSync(filePath, 'utf8');
    expect(fileContent.trimStart().startsWith("'use client';")).toBeTruthy();
  });
});
