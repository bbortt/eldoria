import { PhaseConfig } from 'boardgame.io';

import type { GameState } from '../game-state';
import highlightCharacter from '../moves/highlight-character';

const playPhase: PhaseConfig<GameState> = {
  moves: { highlightCharacter },
};

export default playPhase;
