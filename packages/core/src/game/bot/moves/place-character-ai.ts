import { Move } from 'boardgame.io';
import { INVALID_MOVE } from 'boardgame.io/core';

import { GameState } from '@/game';
import placeCharacter from '@/game/moves/place-character';
import { isMoveValid } from '@/game/validation';
import { Character } from '@/stats';

import PositionEvaluator from '../position-evaluator';

const evaluator = new PositionEvaluator();

const placeCharacterAi: Move<GameState> = ({ G, events }, character: Character): typeof INVALID_MOVE | undefined => {
  const bestPos = evaluator.findBestPosition(G.grid, character);
  if (!bestPos || !isMoveValid(G.grid, character, bestPos.x, bestPos.y)) {
    return INVALID_MOVE;
  }

  return placeCharacter({ G, events }, character, bestPos.x, bestPos.y);
};

export default placeCharacterAi;
