'use client';

import { useEffect, useState } from 'react';

import type { BoardProps, GameState, InitGameState } from '@repo/core';
import { Spinner } from '@repo/ui';

import { resetConfiguration, restoreConfiguration } from '@/game/configuration';
import { INIT } from '@repo/core/src/game/phases';

import { InfiniteGameGrid } from './infinite-grid';

import styles from './board.module.css';

// TODO: Remove, once `BoardGameProps` has additional properties
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BoardGameProps extends BoardProps<GameState> {}

export const Board: React.FC<BoardGameProps> = ({ ctx, G, moves }) => {
  const [gameConfiguration, setGameConfiguration] = useState(null as InitGameState | null);

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

  if (!ctx.phase || ctx.phase === INIT) {
    return (
      <div className={styles.main}>
        <Spinner color="secondary" />
        <p className="ml-2">Game is Loading, hang on a second...</p>
      </div>
    );
  }

  return (
    <div>
      <InfiniteGameGrid grid={G.grid} />
    </div>
  );
};

export default Board;
