'use client';

import { useEffect, useState } from 'react';

import { type BoardProps, type GameState } from '@repo/core';

import { resetConfiguration, restoreConfiguration } from '@/game/configuration';
import { INIT } from '@repo/core/src/game/phases';

// TODO: Remove, once `BoardGameProps` has additional properties
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BoardGameProps extends BoardProps<GameState> {}

export const Board: React.FC<BoardGameProps> = ({ ctx, moves }) => {
  const [gameConfiguration, setGameConfiguration] = useState(null as GameState | null);

  useEffect(() => {
    setGameConfiguration(restoreConfiguration());
  }, []);

  useEffect(() => {
    if (gameConfiguration && moves.initGame) {
      moves.initGame(gameConfiguration);
    }
  }, [gameConfiguration]);

  useEffect(() => {
    if (ctx.phase && ctx.phase !== INIT) {
      resetConfiguration();
    }
  }, [ctx.phase]);

  return <></>;
};

export default Board;
