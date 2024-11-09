import { FnContext } from 'boardgame.io';

import { GameState } from '../game-state';

const nextFunction: (context: FnContext<GameState>) => number | undefined = ({ ctx }) => (ctx.playOrderPos + 1) % ctx.numPlayers;

export default nextFunction;
