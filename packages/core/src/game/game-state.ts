import { Character } from '../stats';

export interface InitGameState {
  username: string;
  allies: Character[];
}

export interface GameState extends InitGameState {}
