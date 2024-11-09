import { Move } from 'boardgame.io';

import { GameState, InitGameState } from '../game-state';

const initGame: Move<GameState> = ({ G }, gameConfiguration: InitGameState): void => {
  const { username, team } = gameConfiguration;
  G.username = username;
  G.team = team;
};

export default initGame;
