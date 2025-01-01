import type { Game } from 'boardgame.io';

import { initGameGrid } from './game-grid';
import type { GameState } from './game-state';
import { GATHER_GROUP_PHASE, INIT_PHASE, PLAY_PHASE, ROLL_PHASE } from './phases';
import gatherGroupPhase from './phases/gather-group';
import initPhase from './phases/init';
import playPhase from './phases/play';
import rollPhase from './phases/roll';

export * from './cell';
export * from './constants';
export * from './dice-roll';
export * from './game-grid';
export * from './game-state';
export * from './log';
export * from './utils';

import type { Character } from '../stats';

export const Eldoria: Game<GameState> = {
  name: 'fantasy-board-game',

  minPlayers: 2,
  maxPlayers: 2,

  setup: (): GameState => ({
    diceRoll: {
      '0': 0,
      '1': 0,
    },
    grid: initGameGrid(),
    startingPlayer: undefined,
    team: [] as Character[],
    username: '',
    tutorial: false,
    showHints: true,
  }),

  // A phase that doesn’t specify any moves just uses moves from the main moves section in the game.
  // However, if it does, then the moves section in the phase overrides the global one.
  moves: {},

  turn: { minMoves: 1, maxMoves: 1 },

  phases: {
    [INIT_PHASE]: initPhase,
    [ROLL_PHASE]: rollPhase,
    [GATHER_GROUP_PHASE]: gatherGroupPhase,
    [PLAY_PHASE]: playPhase,
  },
};
