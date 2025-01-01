export * from './get-player-string';

let actionLog: string[] = [];

export const logAction = (message: string): void => {
  actionLog.push(message);
};

export const getActionLog = (): string[] => {
  return [...actionLog];
};

export const getLastNActions = (n: number): string[] => {
  return [...actionLog].slice(-n);
};

export const clearActionLog = (): void => {
  actionLog = [];
};
