import { CELL_BACKGROUND_BRIGHT, CELL_BACKGROUND_DARK, CELL_BACKGROUND_INVALID, CELL_BACKGROUND_VALID } from '../constants';

export const calculateBgColor = (isOver: boolean, isValid: boolean, x: number, y: number): string => {
  if (isOver && isValid) {
    return CELL_BACKGROUND_VALID;
  } else if (isOver) {
    return CELL_BACKGROUND_INVALID;
  }

  if ((x % 2 == 0 && y % 2 == 0) || (x % 2 == 1 && y % 2 == 1)) {
    return CELL_BACKGROUND_DARK;
  } else {
    return CELL_BACKGROUND_BRIGHT;
  }
};
