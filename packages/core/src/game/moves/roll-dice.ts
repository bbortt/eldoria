import { Move } from 'boardgame.io';
import { INVALID_MOVE } from 'boardgame.io/core';

import type { GameState } from '../game-state';

const rollDice: Move<GameState> = ({ G, ctx, events, random }): typeof INVALID_MOVE | undefined => {
  if (!Object.keys(G.diceRoll).includes(ctx.currentPlayer)) {
    return INVALID_MOVE;
  }

  // @ts-expect-error we've checked this with the condition above
  G.diceRoll[ctx.currentPlayer] = random.D20();

  // If both players have rolled, determine starting player
  if (G.diceRoll['0'] !== 0 && G.diceRoll['1'] !== 0) {
    if (G.diceRoll['0'] === G.diceRoll['1']) {
      // On tie, reset dice
      G.diceRoll = { '0': 0, '1': 0 };
    } else {
      // Set starting player
      G.startingPlayer = G.diceRoll['0'] > G.diceRoll['1'] ? '0' : '1';
    }
  }

  events.endTurn();
};

export default rollDice;
