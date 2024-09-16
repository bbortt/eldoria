'use client';

import { useEffect, useState } from 'react';

import type { BoardProps, GameState } from '@repo/core';

import { restoreConfiguration } from '@/game/configuration';

interface BoardGameProps extends BoardProps<GameState> {}

export const Board: React.FC<BoardGameProps> = ({ moves }: BoardGameProps) => {
  const [gameConfiguration, setGameConfiguration] = useState(null as GameState | null);

  useEffect(() => {
    setGameConfiguration(restoreConfiguration());
  }, []);

  useEffect(() => {
    if (gameConfiguration !== null && moves.initGame) {
      moves.initGame(gameConfiguration);
    }
  }, [gameConfiguration]);

  return <></>;
};

export default Board;
