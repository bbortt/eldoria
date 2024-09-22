import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { act, render } from '@testing-library/react';

import { GameState, Move } from '@repo/core';

import { resetConfiguration, restoreConfiguration } from '@/game/configuration';

import { Board, BoardGameProps } from './board';

jest.mock('@/game/configuration', () => ({
  restoreConfiguration: jest.fn(),
  resetConfiguration: jest.fn(),
}));

describe('Board Component', () => {
  const mockMoves = {
    initGame: jest.fn() as Move<GameState>,
  };

  const boardGameProps = {
    moves: mockMoves,
  } as unknown as BoardGameProps;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call restoreConfiguration on mount', () => {
    render(<Board {...boardGameProps} />);
    expect(restoreConfiguration).toHaveBeenCalledTimes(1);
  });

  it('should call initGame and resetConfiguration when gameConfiguration is set', async () => {
    const mockGameState = { someKey: 'someValue' };
    (restoreConfiguration as jest.Mock).mockReturnValue(mockGameState);

    await act(async () => {
      render(<Board {...boardGameProps} />);
    });

    expect(mockMoves.initGame).toHaveBeenCalledWith(mockGameState);
    expect(resetConfiguration).toHaveBeenCalledTimes(1);
  });

  it('should not call initGame or resetConfiguration if gameConfiguration is null', () => {
    (restoreConfiguration as jest.Mock).mockReturnValue(null);

    render(<Board {...boardGameProps} />);

    expect(mockMoves.initGame).not.toHaveBeenCalled();
    expect(resetConfiguration).not.toHaveBeenCalled();
  });

  it('has "use client" directive at the top of the file', () => {
    const filePath = resolve(__dirname, './board.tsx');
    const fileContent = readFileSync(filePath, 'utf8');
    expect(fileContent.trimStart().startsWith("'use client';")).toBeTruthy();
  });
});
