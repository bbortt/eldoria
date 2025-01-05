import { PlayerID } from 'boardgame.io';

export const getPlayerString = (activePlayer: PlayerID): string => {
  return activePlayer === '0' ? 'Player' : 'Enemy';
};
