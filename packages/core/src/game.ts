import type { Game } from 'boardgame.io';

export interface GameState {}

export const FantasyBoardGame: Game<GameState> = {
  name: 'fantasy-board-game',

  setup: (ctx, setupData) => ({
    username: setupData.username,
    companions: setupData.companions,
    // Add other initial game state here
  }),

  moves: {
    // Define your game moves here
  },

  // Add other game logic here
};
