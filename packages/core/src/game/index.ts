import type { Game } from 'boardgame.io';

import { initGameGrid } from './game-grid';
import type { GameState } from './game-state';
import {
  ACTION_PHASE,
  GATHER_GROUP_PHASE,
  INIT_PHASE,
  MOVEMENT_PHASE,
  ROLL_PLACEMENT_PHASE,
  ROLL_TURN_ORDER_PHASE,
  TURN_END_PHASE,
} from './phases';
import actionPhase from './phases/action';
import gatherGroupPhase from './phases/gather-group';
import initPhase from './phases/init';
import movementPhase from './phases/movement';
import rollPhase from './phases/roll';
import rollTurnOrderPhase from './phases/roll-turn-order';
import turnEndPhase from './phases/turn-end';

export * from './cell';
export * from './constants';
export * from './dice-roll';
export * from './game-grid';
export * from './game-state';
export * from './log';
export * from './utils';

import EldoriaBot from '@/game/bot';
import type { Character } from '@/stats';

const bot = new EldoriaBot();

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
    [ROLL_PLACEMENT_PHASE]: rollPhase,
    [GATHER_GROUP_PHASE]: gatherGroupPhase,
    [ROLL_TURN_ORDER_PHASE]: rollTurnOrderPhase,
    [MOVEMENT_PHASE]: movementPhase,
    [ACTION_PHASE]: actionPhase,
    [TURN_END_PHASE]: turnEndPhase,
  },

  ai: { enumerate: bot.enumerate },
};
