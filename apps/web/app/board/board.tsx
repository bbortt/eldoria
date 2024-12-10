'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import type { BoardProps, GameState, InitGameState } from '@repo/core';
import { Spinner } from '@repo/ui';
import { DefaultButton } from '@repo/ui/components';

import { resetConfiguration, restoreConfiguration } from '@/game/configuration';
import { GATHER_GROUP, INIT } from '@repo/core/src/game/phases';

import CharacterBar from './character-bar';
import DiceRoll from './dice-roll';
import InfiniteGameGrid from './infinite-grid';

import styles from './board.module.css';

const getExplainGoalsContent = (close: () => void) => {
  return (
    <div className={styles.introductionText} data-testid="game-explanation">
      <p className="w-[50vw]">
        Beneath Eldoria’s shimmering veneer—a city both fragile and ferocious, a dance of towering ambitions and whispered secrets—there
        exists a truth rarely spoken aloud. The Thieves’ Guild, whispered of in shadowed alleys and scrawled in half-hearted proclamations,
        is not the scourge some might imagine. No, their fingers may dance across purse strings and lockpicks, but their purpose delves far
        deeper than mere mischief.
      </p>
      <p className="w-[50vw]">
        For Eldoria rests precariously on the edge of chaos, a bright crown balanced atop the yawning maw of the underworld. Beneath its
        cobbled streets and glittering spires lies a labyrinth of ancient tunnels, a vast and shifting expanse where the dregs of the world
        convene. Beasts that should not have names, whispers that curdle thought itself, and dangers unseen crawl forth from this abyss,
        threatening to sunder the city above.
      </p>
      <p className="w-[50vw]">
        The Guild, for all its roguish swagger, is Eldoria’s first—and often only—line of defense. Their silent blades and unseen movements
        do not merely plunder; they guard. It is their watchful eyes and deft hands that keep the horrors below from ascending into the
        light. And so, the people of Eldoria, pragmatic to their core, have come to an unspoken accord. Let the Guild go about their
        business, for their business is all that keeps Eldoria's dreams aloft.
      </p>
      <p className="w-[50vw]">
        But now, the tides of darkness rise. Enemies gather, cunning and relentless, seeking to breach the heart of the city: the Core. This
        sacred nexus is no mere stonework—it is a threshold, the fragile seal between light and shadow. If they reach it, the underworld
        will spill forth, devouring all.
      </p>
      <p className="w-[50vw]">
        You stand here, not as an observer but as a defender, summoned by fate and bound by resolve. The Core must be protected. Eldoria’s
        future lies in your hands, even as its people slumber, unaware of the storm you will face in their name.
      </p>
      <DefaultButton color="secondary" onClick={() => close()} data-testid="button-close-game-explanation">
        Understood
      </DefaultButton>
    </div>
  );
};

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
    return getExplainGoalsContent(() => setExplainGoals(false));
  }

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
      {moves.rollDice ? <DiceRoll diceRoll={G.diceRoll} rollDice={moves.rollDice} startingPlayer={G.startingPlayer} /> : <></>}
      <InfiniteGameGrid grid={G.grid} />
      {ctx.phase === GATHER_GROUP ? <CharacterBar characters={G.team} /> : <></>}
    </div>
  );
};

export default Board;
