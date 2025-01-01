import { getPlayerString } from './get-player-string';

describe('getPlayerString', () => {
  it('returns "Player" when activePlayer is "0"', () => {
    expect(getPlayerString('0')).toBe('Player');
  });

  it('returns "Enemy" when activePlayer is not "0"', () => {
    expect(getPlayerString('1')).toBe('Enemy');
    expect(getPlayerString('2')).toBe('Enemy');
    expect(getPlayerString('')).toBe('Enemy');
  });
});
