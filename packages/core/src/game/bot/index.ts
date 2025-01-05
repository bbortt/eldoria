import { AiEnumerate, Ctx } from 'boardgame.io';

import { GameState } from '@/game';
import { ROLL_PLACEMENT_PHASE } from '@/game/phases';

export class EldoriaBot {
  public enumerate = (G: GameState, ctx: Ctx): AiEnumerate => {
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
