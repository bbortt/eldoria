import { clearActionLog, getActionLog, getLastNActions, logAction } from './index';

describe('log', () => {
  beforeEach(() => {
    clearActionLog();
  });

  describe('getActionLog', () => {
    test('should add and retrieve messages', () => {
      logAction('Hello');
      logAction('World');

      expect(getActionLog()).toEqual(['Hello', 'World']);
    });

    test('should return a copy of messages array', () => {
      logAction('Original');
      const messages = getActionLog();
      messages.push('Modified');

      expect(getActionLog()).toEqual(['Original']);
    });
  });

  describe('getLastNActions', () => {
    test('should get last message', () => {
      logAction('First');
      logAction('Last');

      expect(getLastNActions(1)).toEqual(['Last']);
    });

    test('should get last N message', () => {
      logAction('First');
      logAction('Second');
      logAction('Third');

      expect(getLastNActions(2)).toEqual(['Second', 'Third']);
    });

    test('should return empty array for last N message when chat is empty', () => {
      expect(getLastNActions(1)).toEqual([]);
    });
  });

  describe('clearActionLog', () => {
    test('should clear chat', () => {
      logAction('Test');
      clearActionLog();

      expect(getActionLog()).toEqual([]);
    });
  });
});
