import { PhaseConfig } from 'boardgame.io';

import type { GameState } from '../game-state';
import highlightCharacter from '../moves/highlight-character';
import { TURN_END_PHASE } from './index';

const actionPhase: PhaseConfig<GameState> = {
  moves: { highlightCharacter },
  next: TURN_END_PHASE,
};

export default actionPhase;
