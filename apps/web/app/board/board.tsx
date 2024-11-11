'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import type { BoardProps, GameState, InitGameState } from '@repo/core';
import { Spinner } from '@repo/ui';

import { resetConfiguration, restoreConfiguration } from '@/game/configuration';
import { GATHER_GROUP, INIT } from '@repo/core/src/game/phases';

import CharacterBar from './character-bar';
import DiceRoll from './dice-roll';
import InfiniteGameGrid from './infinite-grid';

import styles from './board.module.css';

// TODO: Remove, once `BoardGameProps` has additional properties
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BoardGameProps extends BoardProps<GameState> {}

export const Board: React.FC<BoardGameProps> = ({ ctx, G, moves }) => {
  const [gameConfiguration, setGameConfiguration] = useState(null as InitGameState | null);

  const router = useRouter();

  useEffect(() => {
    const restoredConfiguration = restoreConfiguration();
    if (!gameConfiguration && restoredConfiguration) {
      setGameConfiguration(restoredConfiguration);
    } else if (!gameConfiguration && !restoredConfiguration) {
      router.push('/configuration');
    }
  }, []);

  useEffect(() => {
    if (gameConfiguration && moves.initGame) {
      moves.initGame(gameConfiguration);
    }
  }, [gameConfiguration]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && ctx.phase !== INIT) {
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
      {moves.rollDice ? <DiceRoll diceRoll={G.diceRoll} rollDice={moves.rollDice} startingPlayer={G.startingPlayer} /> : null}
      <InfiniteGameGrid grid={G.grid} />
      {ctx.phase === GATHER_GROUP ? <CharacterBar characters={G.team} /> : null}
    </div>
  );
};

export default Board;
