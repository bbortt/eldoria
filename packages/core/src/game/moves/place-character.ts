import { Move } from 'boardgame.io';

import type { Character } from '../../stats';
import type { GameState } from '../game-state';

const placeCharacter: Move<GameState> = (_, character: Character, x: number, y: number): void => {
  console.log('place character:', character);
  console.log('coordinates:', x, '/', y);
};

export default placeCharacter;
