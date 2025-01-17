import { Move } from 'boardgame.io';

import type { GameState, InitGameState } from '../game-state';

const initGame: Move<GameState> = ({ G, ctx }, gameConfiguration: InitGameState): void => {
  const { username, team, tutorial, showHints } = gameConfiguration;
  G.username = username;
  G.team = team;
  G.tutorial = tutorial;
  G.showHints = showHints;

  for (let i = 0; i < ctx.numPlayers; i++) {
    // @ts-expect-error - this will match ['0', '1'] in a 2 player game
    G.diceRoll[`${i}`] = 0;
  }
};

export default initGame;
