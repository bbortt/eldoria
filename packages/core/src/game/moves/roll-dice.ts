import { Move } from 'boardgame.io';
import { INVALID_MOVE } from 'boardgame.io/core';

import type { GameState } from '../game-state';
import { getPlayerString, logAction } from '../log';

const rollDice: Move<GameState> = ({ G, ctx, events, random }): typeof INVALID_MOVE | undefined => {
  if (!Object.keys(G.diceRoll).includes(ctx.currentPlayer)) {
    return INVALID_MOVE;
  }

  const diceRoll = random.D20();
  // @ts-expect-error we've checked this with the condition above
  G.diceRoll[ctx.currentPlayer] = diceRoll;
  logAction(`${getPlayerString(ctx.currentPlayer)} rolled ${diceRoll}.`);

  // If both players have rolled, determine starting player
  if (G.diceRoll['0'] !== 0 && G.diceRoll['1'] !== 0) {
    if (G.diceRoll['0'] === G.diceRoll['1']) {
      // On tie, reset dice
      G.diceRoll = { '0': 0, '1': 0 };
      logAction(`It's a tie! You'll need to roll again...`);
    } else {
      // Set starting player
      const startingPlayer = G.diceRoll['0'] > G.diceRoll['1'] ? '0' : '1';
      G.startingPlayer = startingPlayer;
      logAction(`${getPlayerString(startingPlayer)} rolled higher and will start the game.`);
    }
  }

  events.endTurn();
};

export default rollDice;
