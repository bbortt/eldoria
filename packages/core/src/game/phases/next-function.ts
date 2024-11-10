import { FnContext } from 'boardgame.io';

import { GameState } from '../game-state';

const nextFunction = ({ ctx }: FnContext<GameState>): number | undefined => (ctx.playOrderPos + 1) % ctx.numPlayers;

export default nextFunction;
