import { Move } from 'boardgame.io';
import { INVALID_MOVE } from 'boardgame.io/core';

import type { Character } from '../../stats';
import { CELL_TYPE_CHARACTER } from '../cell';
import type { GameState } from '../game-state';
import { logAction } from '../log';
import { isMoveValid } from '../validation';

const placeCharacter: Move<GameState> = ({ G, events }, character: Character, x: number, y: number): typeof INVALID_MOVE | undefined => {
  const characterIndex = G.team.findIndex(c => c.name === character.name);

  if (!isMoveValid(G.grid, character, x, y) || characterIndex < 0) {
    return INVALID_MOVE;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  G.grid.cells[y]![x]!.content = {
    type: CELL_TYPE_CHARACTER,
    characterIndex,
  };

  logAction(`Placed character '${character.name}' onto (${x}/${y})`);

  events.endTurn();
};

export default placeCharacter;
