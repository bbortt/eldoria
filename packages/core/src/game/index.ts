import type { Game } from 'boardgame.io';

import { Character } from '../stats';

import { GameState } from './game-state';

import initPhase from './phases/init';

export * from './game-state';

export const Eldoria: Game<GameState> = {
  name: 'fantasy-board-game',

  minPlayers: 1,
  maxPlayers: 1,

  setup: ctx => ({
    username: '',
    allies: [] as Character[],
  }),

  validateSetupData: (numPlayers: number) => {
    if (numPlayers !== 1) {
      return 'Mulitplayer is currently not supported!';
    }
  },

  // A phase that doesn’t specify any moves just uses moves from the main moves section in the game.
  // However, if it does, then the moves section in the phase overrides the global one.
  moves: {},

  turn: { minMoves: 1, maxMoves: 1 },

  phases: {
    init: initPhase,
    phaseB: {},
  },
};
