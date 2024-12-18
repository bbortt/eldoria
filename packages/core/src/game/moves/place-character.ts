import { Move } from 'boardgame.io';

import type { Character } from '../../stats';
import { CELL_TYPE_CHARACTER } from '../cell';
import type { GameState } from '../game-state';
import { isMoveValid } from '../validation';

const placeCharacter: Move<GameState> = ({ G }, character: Character, x: number, y: number): void => {
  console.log('place character:', character);
  console.log('coordinates:', x, '/', y);
  console.log('grid:', G.grid);

  if (isMoveValid(G.grid, character, x, y)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    G.grid.cells[y]![x]!.content = {
      type: CELL_TYPE_CHARACTER,
      character,
    };
  }
};

export default placeCharacter;
