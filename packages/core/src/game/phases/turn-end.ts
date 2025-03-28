import { PhaseConfig } from 'boardgame.io';

import type { GameState } from '../game-state';
import highlightCharacter from '../moves/highlight-character';
import { MOVEMENT_PHASE } from './index';

const turnEndPhase: PhaseConfig<GameState> = {
  moves: { highlightCharacter },
  next: MOVEMENT_PHASE,
};

export default turnEndPhase;
