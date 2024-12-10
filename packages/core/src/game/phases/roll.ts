import { PhaseConfig } from 'boardgame.io';

import { GameState } from '../game-state';
import rollDice from '../moves/roll-dice';
import { GATHER_GROUP } from './index';
import nextFunction from './next-function';

const rollPhase: PhaseConfig<GameState> = {
  moves: { rollDice },
  next: GATHER_GROUP,
  turn: {
    order: {
      first: () => 0,
      next: nextFunction,
    },
  },
  endIf: ({ G }) => !!G.startingPlayer,
  onEnd: ({ G }) => {
    G.diceRoll = { '0': 0, '1': 0 };
  },
};

export default rollPhase;
