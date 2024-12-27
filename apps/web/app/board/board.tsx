'use client';

import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core/dist/types';
import { BoardProps, GameState, getSelectedCharacter, InitGameState } from '@repo/core';
import { GATHER_GROUP_PHASE, INIT_PHASE } from '@repo/core/src/game/phases';
import { Spinner } from '@repo/ui';
import { AnimatePresence, motion } from '@repo/ui/lib';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { resetConfiguration, restoreConfiguration } from '@/game/configuration';
import { Notification } from '@/notification';

import styles from './board.module.css';
import CharacterBar from './character-bar';
import DiceRoll from './dice-roll';
import GameEntryBanner from './game-entry-banner';
import InfiniteGameGrid from './infinite-grid';
import GameViewModelMapper from './infinite-grid/game-view-model-mapper';
import Sidebar from './sidebar';

// TODO: Remove, once `BoardGameProps` has additional properties
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BoardGameProps extends BoardProps<GameState> {}

export const Board: React.FC<BoardGameProps> = ({ G, ctx, moves, chatMessages }) => {
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
    if (process.env.NODE_ENV === 'production' && ctx.phase !== INIT_PHASE) {
      resetConfiguration();
    }
  }, [ctx.phase]);

  if (G.showHints && explainGoals) {
    return <GameEntryBanner close={() => setExplainGoals(false)} />;
  }

  if (!ctx.phase || ctx.phase === INIT_PHASE) {
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
    <>
      <DndContext onDragEnd={handleDragEnd}>
        {moves.rollDice && <DiceRoll diceRoll={G.diceRoll} rollDice={moves.rollDice} startingPlayer={G.startingPlayer} />}
        {moves.highlightCharacter && (
          <InfiniteGameGrid grid={G.grid} gameViewModelMapper={new GameViewModelMapper(G.grid, G.team, moves.highlightCharacter)} />
        )}
        {G.showHints && (
          <Notification title="Ah, my dear friend, let me guide you through this peculiar little endeavor.">
            <p>
              Cast your gaze upon the bar below, where the characters await, each brimming with quiet purpose. Gently take hold of them -
              yes, just so - and place them upon the grid, as one would carefully lay stones for a hearth. Only when all have found their
              proper place will the game unfold, like the turning of a great and wondrous key.
            </p>
          </Notification>
        )}

        <AnimatePresence>
          {ctx.phase === GATHER_GROUP_PHASE && moves.highlightCharacter && (
            <motion.div
              initial={{ opacity: 0, x: 0, y: 100 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 0, y: 100 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
            >
              <CharacterBar
                characters={G.team}
                grid={G.grid}
                isPlayerTurn={ctx.currentPlayer === '0'}
                highlightCharacter={moves.highlightCharacter}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </DndContext>

      <Sidebar chatMessages={chatMessages} selectedCharacter={getSelectedCharacter(G)} />
    </>
  );
};

export default Board;
