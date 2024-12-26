import { Character } from '@repo/core';

export const determineHealthBarColor = (character: Character): string => {
  const healthPercent = (character.currentHP / character.maxHP) * 100;

  return healthPercent > 70 ? 'bg-success' : healthPercent > 30 ? 'bg-warning' : 'bg-danger';
};
