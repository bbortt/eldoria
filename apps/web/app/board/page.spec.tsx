import { render, screen } from '@testing-library/react';

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { Client, Eldoria } from '@repo/core';

import Board from './board';
import GamePage from './page';

jest.mock('@repo/core', () => ({
  Client: jest.fn(() => () => <div data-testid="mocked-client"></div>),
  Eldoria: { name: 'Eldoria' },
}));

jest.mock('./board', () => ({
  __esModule: true,
  default: { name: 'Board' },
}));

describe('Game Client', () => {
  it('creates a client with correct parameters', () => {
    render(<GamePage />);

    expect(screen.getByTestId('mocked-client')).toBeInTheDocument();

    expect(Client).toHaveBeenCalledWith({
      game: Eldoria,
      board: Board,
      numPlayers: 2,
    });
  });

  it('has "use client" directive at the top of the file', () => {
    const filePath = resolve(__dirname, './page.tsx');
    const fileContent = readFileSync(filePath, 'utf8');
    expect(fileContent.trimStart().startsWith("'use client';")).toBeTruthy();
  });
});
