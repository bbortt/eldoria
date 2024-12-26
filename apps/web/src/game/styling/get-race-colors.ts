import { Race } from '@repo/core';

export interface RaceColors {
  background: string;
  text: string;
}

export const getRaceColors = (race: Race): RaceColors => {
  const colorMap: Record<string, { background: string; text: string }> = {
    Human: {
      background: 'bg-primary-300',
      text: 'text-primary-300',
    },
    Dwarf: {
      background: 'bg-primary-600',
      text: 'text-primary-600',
    },
    Elf: {
      background: 'bg-success',
      text: 'text-success',
    },
    Halfling: {
      background: 'bg-warning',
      text: 'text-warning',
    },
    Giant: {
      background: 'bg-secondary',
      text: 'text-secondary',
    },
  };

  const defaultColors = {
    background: 'bg-primary-400',
    text: 'text-primary-400',
  };

  return race?.label ? colorMap[race.label] || defaultColors : defaultColors;
};
