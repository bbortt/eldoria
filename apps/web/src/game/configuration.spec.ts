import { InitGameState } from '@repo/core';

import { persistConfiguration, resetConfiguration, restoreConfiguration } from './configuration';

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => delete store[key],
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Configuration Persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('persistConfiguration', () => {
    it('should store configuration in localStorage', () => {
      const mockConfig: InitGameState = { username: 'someValue', allies: [] };
      persistConfiguration(mockConfig);
      expect(localStorage.getItem('eldoria-configuration')).toBe(JSON.stringify(mockConfig));
    });
  });

  describe('restoreConfiguration', () => {
    it('should return null when no configuration is stored', () => {
      const restoredConfig = restoreConfiguration();
      expect(restoredConfig).toBeNull();
    });

    it('should restore configuration from localStorage', () => {
      const mockConfig: InitGameState = { username: 'someValue', allies: [] };
      localStorage.setItem('eldoria-configuration', JSON.stringify(mockConfig));
      const restoredConfig = restoreConfiguration();
      expect(restoredConfig).toEqual(mockConfig);
    });

    it('should return null and log error when stored data is invalid JSON', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      localStorage.setItem('eldoria-configuration', 'invalid JSON');
      const restoredConfig = restoreConfiguration();
      expect(restoredConfig).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith('Failed to parse stored configuration:', expect.any(Error));
      consoleSpy.mockRestore();
    });
  });

  describe('resetConfiguration', () => {
    it('removes and existing items', () => {
      const mockConfig: InitGameState = { username: 'someValue', allies: [] };
      localStorage.setItem('eldoria-configuration', JSON.stringify(mockConfig));
      resetConfiguration();
      expect(localStorage.getItem('eldoria-configuration')).toBeNull();
    });

    it('ignores any non-existent items', () => {
      expect(() => resetConfiguration()).not.toThrowError();
    });
  });
});
