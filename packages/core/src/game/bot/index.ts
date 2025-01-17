import { AiEnumerate, Ctx, PlayerID, Store } from 'boardgame.io';
import { Step } from 'boardgame.io/ai';
import type { ClientState } from 'boardgame.io/dist/types/src/client/client';

import { GameState, MAX_GROUP_SIZE } from '..';
import type { Character } from '../../stats';
import { GATHER_GROUP_PHASE, ROLL_PLACEMENT_PHASE } from '../phases';
import { AICharacterGenerator } from './ai-character-generation.js';
import { singleMoveBot } from './single-move-bot';

const BOT_PLAYER_ID: PlayerID = '1';

class EldoriaBotInternal {
  private readonly characterGenerator = new AICharacterGenerator();

  private team: Character[] = [];

  public enumerate = (G: GameState, ctx: Ctx, playerID: PlayerID): AiEnumerate => {
    const { phase } = ctx;

    console.log('phase:', phase);
    console.log('playerID:', playerID);

    if (phase === ROLL_PLACEMENT_PHASE) {
      return [{ move: 'rollDice' }];
    } else if (phase === GATHER_GROUP_PHASE) {
      if (this.team.length === 0) {
        this.team = this.characterGenerator.generateTeam(MAX_GROUP_SIZE);
      }

      console.log('this.team:', this.team);

      return [{ move: 'placeCharacter', args: [this.team[0], 0, 0] }];
    }

    return [];
  };
}

export interface BotClient {
  store: Store;
  subscribe(fn: (state: ClientState<GameState>) => void): void;
}

export const initBot = (client: BotClient) => {
  const botInternal = new EldoriaBotInternal();

  return client.subscribe((state: ClientState<GameState>) => {
    if (!state) return;

    const { ctx, G } = state;
    if (ctx.currentPlayer === BOT_PLAYER_ID) {
      if (
        ctx.phase === ROLL_PLACEMENT_PHASE &&
        // @ts-expect-error TS7053: Element implicitly has an any type because expression of type string can't be used to index type DiceRoll
        G.diceRoll[BOT_PLAYER_ID] === 0
      ) {
        setTimeout(() => Step(client, singleMoveBot('rollDice')), 0);
      }

      // Delay AI stepping by a tick to allow React to render before the main thread gets blocked by AI iterations
      // return new MCTSBot({ Eldoria, iterations: 10, enumerate: botInternal.enumerate });
      // setTimeout(() => Step(client, bot), 0);
    }
  });
};
