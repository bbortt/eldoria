import { Character } from '../stats';

export interface InitGameState {
  username: string;
  team: Character[];
}

export interface GameState extends InitGameState {}
