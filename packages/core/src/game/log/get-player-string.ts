import { PlayerID } from 'boardgame.io';

export const getPlayerString = (activePlayer: PlayerID, playerId: PlayerID): string => {
  return activePlayer && playerId && activePlayer === playerId ? 'Player' : 'Enemy';
};
