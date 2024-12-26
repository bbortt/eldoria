import { Race } from '@repo/core';

import { getRaceColors, RaceColors } from './get-race-colors';

describe('getRaceColors', () => {
  it.each([
    { race: Race.HUMAN, expectedBg: 'bg-primary-300', expectedText: 'text-primary-300' },
    { race: Race.DWARF, expectedBg: 'bg-primary-600', expectedText: 'text-primary-600' },
    { race: Race.ELF, expectedBg: 'bg-success', expectedText: 'text-success' },
    { race: Race.HALFLING, expectedBg: 'bg-warning', expectedText: 'text-warning' },
    { race: Race.GIANT, expectedBg: 'bg-secondary', expectedText: 'text-secondary' },
  ])('returns correct colors for $race.label', ({ race, expectedBg, expectedText }) => {
    const colors = getRaceColors(race);
    expect(colors.background).toBe(expectedBg);
    expect(colors.text).toBe(expectedText);
  });

  it('returns default colors for unknown race', () => {
    // @ts-expect-error - testing with invalid race
    const colors: RaceColors = getRaceColors({ label: 'Unknown' });
    expect(colors.background).toBe('bg-primary-400');
    expect(colors.text).toBe('text-primary-400');
  });

  it('handles null/undefined race gracefully', () => {
    const nullColors: RaceColors = getRaceColors(null);
    const undefinedColors: RaceColors = getRaceColors(undefined);

    expect(nullColors).toEqual({
      background: 'bg-primary-400',
      text: 'text-primary-400',
    });
    expect(undefinedColors).toEqual({
      background: 'bg-primary-400',
      text: 'text-primary-400',
    });
  });

  it('returns object with both background and text colors', () => {
    const colors: RaceColors = getRaceColors(Race.HUMAN);
    expect(colors).toHaveProperty('background');
    expect(colors).toHaveProperty('text');
  });

  describe('returned colors', () => {
    it.each([Race.HUMAN, Race.DWARF, Race.ELF, Race.HALFLING, Race.GIANT])('returns consistent bg/text pair for %s', race => {
      const colors: RaceColors = getRaceColors(race);
      // Verify the text color uses the same theme color as the background
      expect(colors.text.replace('text-', '')).toBe(colors.background.replace('bg-', ''));
    });
  });
});
