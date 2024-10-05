import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { act, render } from '@testing-library/react';

import { INIT } from '@repo/core/src/game/phases';

import { resetConfiguration, restoreConfiguration } from '@/game/configuration';

import { Board, BoardGameProps } from './board';

jest.mock('@/game/configuration', () => ({
  restoreConfiguration: jest.fn(),
  resetConfiguration: jest.fn(),
}));

describe('Board', () => {
  const mockMoves = {
    initGame: jest.fn(), // as Move<GameState>
  };

  const boardGameProps = {
    ctx: {
      phase: INIT,
    },
    moves: mockMoves,
  } as unknown as BoardGameProps;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call restoreConfiguration on mount', () => {
    render(<Board {...boardGameProps} />);
    expect(restoreConfiguration).toHaveBeenCalledTimes(1);
  });

  it('should call initGame when gameConfiguration is set', async () => {
    const mockGameState = { someKey: 'someValue' };
    (restoreConfiguration as jest.Mock).mockReturnValue(mockGameState);

    await act(async () => {
      render(<Board {...boardGameProps} />);
    });

    expect(mockMoves.initGame).toHaveBeenCalledWith(mockGameState);
    expect(resetConfiguration).not.toHaveBeenCalled();
  });

  it('should not do anything if gameConfiguration is null', () => {
    (restoreConfiguration as jest.Mock).mockReturnValue(null);

    render(<Board {...boardGameProps} />);

    expect(mockMoves.initGame).not.toHaveBeenCalled();
    expect(resetConfiguration).not.toHaveBeenCalled();
  });

  it('should call resetConfiguration if phase changes', () => {
    boardGameProps.ctx.phase = 'not-init';

    render(<Board {...boardGameProps} />);

    expect(mockMoves.initGame).not.toHaveBeenCalled();
    expect(resetConfiguration).toHaveBeenCalled();
  });

  it('should not do anything if phase is null', () => {
    boardGameProps.ctx.phase = null;

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
