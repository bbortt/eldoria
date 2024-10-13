import { Character } from '../stats';

export interface InitGameState {
  username: string;
  team: Character[];
}

// TODO: Remove as soon as `GameState` differs from `InitGameState`
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GameState extends InitGameState {}
