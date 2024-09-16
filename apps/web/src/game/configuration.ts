import { InitGameState } from '@repo/core';

const LOCALSTORAGE_KEY = Object.freeze('eldoria-configuration');

export const persistConfiguration = (configuration: InitGameState) => {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(configuration));
};

export const restoreConfiguration = (): InitGameState | null => {
  const storedData = localStorage.getItem(LOCALSTORAGE_KEY);

  if (storedData) {
    try {
      return JSON.parse(storedData) as InitGameState;
    } catch (error) {
      console.error('Failed to parse stored configuration:', error);
    }
  }

  return null;
};
