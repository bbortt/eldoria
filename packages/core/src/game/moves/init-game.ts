import { Move } from 'boardgame.io';

import { GameState, InitGameState } from '../game-state';

const initGame: Move<GameState> = ({ G }, gameConfiguration: InitGameState) => {
  const { username, allies } = gameConfiguration;
  G.username = username;
  G.allies = allies;
};

export default initGame;
