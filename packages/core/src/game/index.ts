import type { Game } from 'boardgame.io';

import { initGameGrid } from './game-grid';
import type { GameState } from './game-state';

import { INIT } from './phases';
import initPhase from './phases/init';

export * from './constants';
export * from './game-grid';
export * from './game-state';

import type { Character } from '../stats';

export const Eldoria: Game<GameState> = {
  name: 'fantasy-board-game',

  minPlayers: 1,
  maxPlayers: 1,

  setup: (): GameState => ({
    username: '',
    team: [] as Character[],
    grid: initGameGrid(),
  }),

  validateSetupData: (numPlayers: number) => {
    if (numPlayers !== 1) {
      return 'Multiplayer is currently not supported!';
    }
  },

  // A phase that doesn’t specify any moves just uses moves from the main moves section in the game.
  // However, if it does, then the moves section in the phase overrides the global one.
  moves: {},

  turn: { minMoves: 1, maxMoves: 1 },

  phases: {
    [INIT]: initPhase,
    phaseB: {},
  },
};
