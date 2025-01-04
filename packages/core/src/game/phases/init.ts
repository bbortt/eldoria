import { PhaseConfig } from 'boardgame.io';

import type { GameState } from '../game-state';
import initGame from '../moves/init-game';
import { ROLL_PLACEMENT_PHASE } from './index';

const initPhase: PhaseConfig<GameState> = {
  moves: { initGame },
  next: ROLL_PLACEMENT_PHASE,
  endIf: ({ G }) => !!G.username,
  start: true,
};

export default initPhase;
