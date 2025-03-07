'use client';

import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core/dist/types';
import { BoardProps, GameState, getActionLog, getSelectedCharacter, InitGameState } from '@repo/core';
import { GATHER_GROUP_PHASE, INIT_PHASE, MOVEMENT_PHASE } from '@repo/core/src/game/phases';
import { Spinner } from '@repo/ui';
import { AnimatePresence, motion } from '@repo/ui/lib';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { resetConfiguration, restoreConfiguration } from '@/game/configuration';
import { addNotification, NotificationsContainer } from '@/notification';

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

export const Board: React.FC<BoardGameProps> = ({ G, ctx, moves, playerID }) => {
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
    if (gameConfiguration && ctx.phase === INIT_PHASE && moves.initGame) {
      moves.initGame(gameConfiguration);
    }
  }, [gameConfiguration, ctx.phase, moves]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && ctx.phase !== INIT_PHASE) {
      resetConfiguration();
    }
  }, [ctx.phase]);

  useEffect(() => {
    if (G.showHints) {
      addNotification({
        title: 'Ah, my dear friend, let me guide you through this peculiar little endeavor.',
        body: (
          <p>
            Cast your gaze upon the bar below, where the characters await, each brimming with quiet purpose. Gently take hold of them - yes,
            just so - and place them upon the grid, as one would carefully lay stones for a hearth. Only when all have found their proper
            place will the game unfold, like the turning of a great and wondrous key.
          </p>
        ),
      });
    }
  }, [G.showHints]);

  useEffect(() => {
    if (G.showHints && ctx.phase === MOVEMENT_PHASE) {
      addNotification({
        title: 'Ah, the ebb and flow of the game is as a dance, each step revealing a new part of the story.',
        body: (
          <p>
            First, the dice will decide the order of things—a roll of fate to see who acts when. Then comes the heart of the game, where
            each character takes their turn to move, act, or perhaps seize an opportune moment. And finally, the turn ends, but not without
            attending to the lingering echoes of choices made. For those seeking greater understanding, the wiki awaits with its deeper
            wisdom.
          </p>
        ),
      });
    }
  }, [G.showHints, ctx.phase]);

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
      <NotificationsContainer />

      <DndContext onDragEnd={handleDragEnd}>
        {moves.rollDice && playerID && (
          <DiceRoll diceRoll={G.diceRoll} playerId={playerID} rollDice={moves.rollDice} startingPlayer={G.startingPlayer} />
        )}
        {moves.highlightCharacter && (
          <InfiniteGameGrid grid={G.grid} gameViewModelMapper={new GameViewModelMapper(G.grid, G.team, moves.highlightCharacter)} />
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
                isPlayerTurn={ctx.currentPlayer === playerID}
                highlightCharacter={moves.highlightCharacter}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </DndContext>

      <Sidebar chatMessages={getActionLog()} selectedCharacter={getSelectedCharacter(G)} />
    </>
  );
};

export default Board;
