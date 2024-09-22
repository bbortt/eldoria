import { PhaseConfig } from 'boardgame.io';

import initGame from '../moves/init-game';

const initPhase: PhaseConfig = {
  moves: { initGame },
  next: 'phaseB',
  endIf: ({ G }) => !!G.username,
  start: true,
};

export default initPhase;
