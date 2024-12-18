'use client';

import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core/dist/types';
import type { BoardProps, GameState, InitGameState } from '@repo/core';
import { GATHER_GROUP, INIT } from '@repo/core/src/game/phases';
import { Spinner } from '@repo/ui';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { resetConfiguration, restoreConfiguration } from '@/game/configuration';

import styles from './board.module.css';
import CharacterBar from './character-bar';
import DiceRoll from './dice-roll';
import GameEntryBanner from './game-entry-banner';
import InfiniteGameGrid from './infinite-grid';

// TODO: Remove, once `BoardGameProps` has additional properties
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BoardGameProps extends BoardProps<GameState> {}

export const Board: React.FC<BoardGameProps> = ({ ctx, G, moves }) => {
  const [gameConfiguration, setGameConfiguration] = useState(null as InitGameState | null);
  const [explainGoals, setExplainGoals] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const restoredConfiguration = restoreConfiguration();
    if (!gameConfiguration && restoredConfiguration) {
      setGameConfiguration(restoredConfiguration);
    } else if (!gameConfiguration && !restoredConfiguration) {
      router.push('/configuration');
    }
  }, [gameConfiguration, router]);

  useEffect(() => {
    if (gameConfiguration && moves.initGame) {
      moves.initGame(gameConfiguration);
    }
  }, [gameConfiguration, moves]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && ctx.phase !== INIT) {
      resetConfiguration();
    }
  }, [ctx.phase]);

  if (G.showHints && explainGoals) {
    return <GameEntryBanner close={() => setExplainGoals(false)} />;
  }

  if (!ctx.phase || ctx.phase === INIT) {
    return (
      <div className={styles.main}>
        <Spinner color="secondary" />
        <p className="ml-2">Game is Loading, hang on a second...</p>
      </div>
    );
  }

  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.over || !moves.placeCharacter) {
      return;
    }

    const sourceData = event.active.data.current;
    const targetData = event.over.data.current;

    if (!sourceData || !targetData) {
      return;
    }

    moves.placeCharacter(sourceData.character, targetData.x, targetData.y);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {moves.rollDice ? <DiceRoll diceRoll={G.diceRoll} rollDice={moves.rollDice} startingPlayer={G.startingPlayer} /> : <></>}
      <InfiniteGameGrid grid={G.grid} />
      {ctx.phase === GATHER_GROUP ? <CharacterBar characters={G.team} /> : <></>}
    </DndContext>
  );
};

export default Board;
