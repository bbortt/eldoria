'use client';

import { useEffect, useState } from 'react';

import type { BoardProps, GameState } from '@repo/core';

import { resetConfiguration, restoreConfiguration } from '@/game/configuration';

export interface BoardGameProps extends BoardProps<GameState> {}

export const Board: React.FC<BoardGameProps> = ({ moves }) => {
  const [gameConfiguration, setGameConfiguration] = useState(null as GameState | null);

  useEffect(() => {
    setGameConfiguration(restoreConfiguration());
  }, []);

  useEffect(() => {
    if (gameConfiguration !== null && moves.initGame) {
      moves.initGame(gameConfiguration);
      resetConfiguration();
    }
  }, [gameConfiguration]);

  return <></>;
};

export default Board;
