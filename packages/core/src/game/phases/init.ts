import { PhaseConfig } from 'boardgame.io';

import { ROLL_PHASE } from './index';

import type { GameState } from '../game-state';
import initGame from '../moves/init-game';

const initPhase: PhaseConfig<GameState> = {
  moves: { initGame },
  next: ROLL_PHASE,
  endIf: ({ G }) => !!G.username,
  start: true,
};

export default initPhase;
