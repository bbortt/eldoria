import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { initGameGrid } from '@repo/core';
import { INIT_PHASE } from '@repo/core/src/game/phases';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';

import { resetConfiguration, restoreConfiguration } from '@/game/configuration';

import { Board, BoardGameProps } from './board';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/game/configuration', () => ({
  restoreConfiguration: jest.fn(),
  resetConfiguration: jest.fn(),
}));

describe('Board', () => {
  const mockPush = jest.fn();

  const mockMoves = {
    initGame: jest.fn(), // as Move<GameState>
  };

  const boardGameProps = {
    ctx: {
      phase: INIT_PHASE,
    },
    G: {
      grid: initGameGrid(),
    },
    moves: mockMoves,
    chatMessages: [],
  } as unknown as BoardGameProps;

  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    originalEnv = { ...process.env };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should call restoreConfiguration on mount', () => {
    render(<Board {...boardGameProps} />);
    expect(restoreConfiguration).toHaveBeenCalledTimes(1);
  });

  it('should call initGame when gameConfiguration is set', async () => {
    const mockGameState = { someKey: 'someValue' };
    (restoreConfiguration as jest.Mock).mockReturnValueOnce(mockGameState);

    await act(async () => {
      render(<Board {...boardGameProps} />);
    });

    expect(mockMoves.initGame).toHaveBeenCalledWith(mockGameState);
    expect(resetConfiguration).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should not do anything if gameConfiguration is null', () => {
    (restoreConfiguration as jest.Mock).mockReturnValueOnce(null);

    render(<Board {...boardGameProps} />);

    expect(mockMoves.initGame).not.toHaveBeenCalled();
    expect(resetConfiguration).not.toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith('/configuration');
  });

  it('should call `resetConfiguration` if phase changes in production', () => {
    process.env.NODE_ENV = 'production';

    boardGameProps.ctx.phase = 'not-init';

    render(<Board {...boardGameProps} />);

    expect(mockMoves.initGame).not.toHaveBeenCalled();
    expect(resetConfiguration).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith('/configuration');
  });

  it.each(['not-init', null])('should not call `resetConfiguration` if phase is not `INIT` (%s)', phase => {
    boardGameProps.ctx.phase = phase;

    render(<Board {...boardGameProps} />);

    expect(mockMoves.initGame).not.toHaveBeenCalled();
    expect(resetConfiguration).not.toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith('/configuration');
  });

  it('has "use client" directive at the top of the file', () => {
    const filePath = resolve(__dirname, './board.tsx');
    const fileContent = readFileSync(filePath, 'utf8');
    expect(fileContent.trimStart().startsWith("'use client';")).toBeTruthy();
  });

  describe('game explanation', () => {
    it('is being shown when hints are enabled', async () => {
      const user = userEvent.setup();
      boardGameProps.G.showHints = true;

      render(<Board {...boardGameProps} />);

      expect(screen.getByTestId('game-explanation')).toBeInTheDocument();

      await user.click(screen.getByTestId('button-close-game-explanation'));
      expect(screen.queryByTestId('game-explanation')).toBeNull();
    });

    it('is hidden when hints are disabled', () => {
      boardGameProps.G.showHints = false;

      render(<Board {...boardGameProps} />);

      expect(screen.queryByTestId('game-explanation')).toBeNull();
    });
  });
});
