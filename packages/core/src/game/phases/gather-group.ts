import { PhaseConfig } from 'boardgame.io';

import type { GameState } from '../game-state';
import placeCharacter from '../moves/place-character';
import nextFunction from './next-function';

const gatherGroupPhase: PhaseConfig<GameState> = {
  moves: { placeCharacter },
  next: 'phaseB',
  turn: {
    order: {
      first: () => 0,
      next: nextFunction,
      playOrder: ({ G }) => (G.startingPlayer === '0' ? ['0', '1'] : ['1', '0']),
    },
  },
};

export default gatherGroupPhase;
