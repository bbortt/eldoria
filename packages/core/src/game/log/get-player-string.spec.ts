import { PlayerID } from 'boardgame.io';

import { getPlayerString } from './get-player-string';

describe('getPlayerString', () => {
  it('returns "Player" when activePlayer is equal to playerId', () => {
    expect(getPlayerString('0', '0')).toBe('Player');
  });

  it.each([
    ['1', '2'],
    ['1', ''],
    ['', '2'],
    ['', ''],
  ])('returns "Enemy" when activePlayer is not equal to playerId: %s', (activePlayer: PlayerID, playerId: PlayerID) => {
    expect(getPlayerString(activePlayer, playerId)).toBe('Enemy');
  });
});
