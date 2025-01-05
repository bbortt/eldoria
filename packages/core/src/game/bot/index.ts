import type { State } from 'boardgame.io';
import { MAKE_MOVE } from 'boardgame.io/dist/types/src/core/action-types';
import type { Middleware } from 'redux';

export const eldoriaBot: Middleware<{}, State> = storeApi => next => action => {
  if (action.type === MAKE_MOVE) {
  }

  return next(action);
};
