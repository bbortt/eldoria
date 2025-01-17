import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { Client, Eldoria, initBot, Local, PlainJSClient } from '@repo/core';
import { render, screen } from '@testing-library/react';

import Board from './board';
import GamePage from './page';

jest.mock('@repo/core', () => ({
  ...jest.requireActual('@repo/core'),
  Client: jest.fn(() => () => <div data-testid="mocked-client"></div>),
  Eldoria: { name: 'Eldoria' },
  initBot: jest.fn(),
  Local: jest.fn(),
  PlainJSClient: jest.fn(),
}));

jest.mock('./board', () => ({
  __esModule: true,
  default: { name: 'Board' },
}));

describe('Game Client', () => {
  it('creates a client with correct parameters', () => {
    const localResult = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Local as jest.MockedFn<any>).mockReturnValueOnce(localResult);

    const client = { start: jest.fn(), stop: jest.fn() };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (PlainJSClient as jest.MockedFn<any>).mockReturnValueOnce(client);

    render(<GamePage />);

    expect(screen.getByTestId('mocked-client')).toBeInTheDocument();

    expect(Client).toHaveBeenCalledWith({
      game: Eldoria,
      board: Board,
      multiplayer: localResult,
    });
    expect(Local).toHaveBeenCalledTimes(2);

    expect(client.start).toHaveBeenCalled();

    expect(initBot).toHaveBeenCalledWith(client, '1');
  });

  it('has "use client" directive at the top of the file', () => {
    const filePath = resolve(__dirname, './page.tsx');
    const fileContent = readFileSync(filePath, 'utf8');
    expect(fileContent.trimStart().startsWith("'use client';")).toBeTruthy();
  });
});
