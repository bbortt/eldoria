import { Move } from 'boardgame.io';

import type { GameState } from '../game-state';

const highlightCharacter: Move<GameState> = ({ G }, characterIndex: number): void => {
  G.selectedCharacterIndex = characterIndex;
};

export default highlightCharacter;
