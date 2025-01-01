import { PhaseConfig } from 'boardgame.io';

import type { GameState } from '../game-state';
import highlightCharacter from '../moves/highlight-character';
import { ACTION_PHASE } from './index';

const movementPhase: PhaseConfig<GameState> = {
  moves: { highlightCharacter },
  next: ACTION_PHASE,
};

export default movementPhase;
