import { PhaseConfig } from 'boardgame.io';

import { CELL_TYPE_CHARACTER } from '../cell';
import type { GameState } from '../game-state';
import highlightCharacter from '../moves/highlight-character';
import placeCharacter from '../moves/place-character';
import { ROLL_TURN_ORDER_PHASE } from './index';
import nextFunction from './next-function';

const gatherGroupPhase: PhaseConfig<GameState> = {
  moves: { highlightCharacter, placeCharacter },
  next: ROLL_TURN_ORDER_PHASE,
  turn: {
    order: {
      first: () => 0,
      next: nextFunction,
      playOrder: ({ G }) => (G.startingPlayer === '0' ? ['0', '1'] : ['1', '0']),
    },
  },
  endIf: ({ G }) => {
    let characterCount = 0;

    for (const cellY of G.grid.cells) {
      for (const cellX of cellY) {
        if (cellX.content && cellX.content.type === CELL_TYPE_CHARACTER) {
          characterCount++;
        }
      }
    }

    return characterCount === G.team.length;
  },
};

export default gatherGroupPhase;
