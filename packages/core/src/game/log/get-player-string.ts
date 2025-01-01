export const getPlayerString = (activePlayer: string): string => {
  return activePlayer === '0' ? 'Player' : 'Enemy';
};
