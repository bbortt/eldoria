import { Character, newCharacter, Race, Specialization } from '@repo/core';

import { determineHealthBarColor } from './determine-health-bar-color';

describe('determineHealthBarColor', () => {
  // Test helper to create character with specific HP values
  const createCharacterWithHP = (currentHP: number, maxHP: number): Character => {
    const character: Character = newCharacter('bbortt', Race.HUMAN, Specialization.CHAMPION);
    character.currentHP = currentHP;
    character.maxHP = maxHP;
    return character;
  };

  it.each([
    { current: 100, max: 100 }, // 100%
    { current: 80, max: 100 }, // 80%
    { current: 71, max: 100 }, // 71%
  ])('returns bg-success when health is above 70% (current: $current, max: $max)', ({ current, max }) => {
    const character = createCharacterWithHP(current, max);
    expect(determineHealthBarColor(character)).toBe('bg-success');
  });

  it.each([
    { current: 70, max: 100 }, // 70%
    { current: 50, max: 100 }, // 50%
    { current: 31, max: 100 }, // 31%
  ])('returns bg-warning when health is between 30% and 70% (current: $current, max: $max)', ({ current, max }) => {
    const character = createCharacterWithHP(current, max);
    expect(determineHealthBarColor(character)).toBe('bg-warning');
  });

  it.each([
    { current: 30, max: 100 }, // 30%
    { current: 15, max: 100 }, // 15%
    { current: 0, max: 100 }, // 0%
  ])('returns bg-danger when health is 30% or below (current: $current, max: $max)', ({ current, max }) => {
    const character = createCharacterWithHP(current, max);
    expect(determineHealthBarColor(character)).toBe('bg-danger');
  });

  it.each([
    { current: 160, max: 200, expected: 'bg-success' }, // 80%
    { current: 80, max: 200, expected: 'bg-warning' }, // 40%
    { current: 40, max: 200, expected: 'bg-danger' }, // 20%
  ])('handles non-100 maxHP values correctly (current: $current, max: $max)', ({ current, max, expected }) => {
    const character = createCharacterWithHP(current, max);
    expect(determineHealthBarColor(character)).toBe(expected);
  });

  it.each([
    { current: 70.1, max: 100, expected: 'bg-success' }, // Just above 70%
    { current: 30.1, max: 100, expected: 'bg-warning' }, // Just above 30%
    { current: 0, max: 100, expected: 'bg-danger' }, // Zero health
  ])('handles edge cases correctly (current: $current, max: $max)', ({ current, max, expected }) => {
    const character = createCharacterWithHP(current, max);
    expect(determineHealthBarColor(character)).toBe(expected);
  });
});
