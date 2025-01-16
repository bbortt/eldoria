import { AiEnumerate, Ctx, PlayerID } from 'boardgame.io';

import { GameState } from '..';
import { ROLL_PLACEMENT_PHASE } from '../phases';

export class EldoriaBot {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public enumerate = (G: GameState, ctx: Ctx, playerID: PlayerID): AiEnumerate => {
    const { phase } = ctx;

    switch (phase) {
      case ROLL_PLACEMENT_PHASE: {
        return [{ move: 'rollDice' }];
      }
    }

    return [];
  };
}

export default EldoriaBot;
