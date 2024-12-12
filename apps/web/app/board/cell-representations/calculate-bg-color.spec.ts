import { Cell } from '@repo/core';

import { CELL_BACKGROUND_BRIGHT, CELL_BACKGROUND_DARK, CELL_BACKGROUND_INVALID, CELL_BACKGROUND_VALID } from '../constants';
import { calculateBgColor } from './calculate-bg-color';

describe('calculateBgColor', () => {
  it.each([
    [{ x: 0, y: 0 }, true, true, CELL_BACKGROUND_VALID],
    [{ x: 0, y: 1 }, true, true, CELL_BACKGROUND_VALID],
    [{ x: 0, y: 0 }, false, true, CELL_BACKGROUND_DARK],
    [{ x: 0, y: 1 }, false, true, CELL_BACKGROUND_BRIGHT],
    [{ x: 0, y: 0 }, true, false, CELL_BACKGROUND_INVALID],
    [{ x: 0, y: 1 }, true, false, CELL_BACKGROUND_INVALID],
    [{ x: 0, y: 0 }, false, false, CELL_BACKGROUND_DARK],
    [{ x: 0, y: 1 }, false, false, CELL_BACKGROUND_BRIGHT],
  ])(
    'should render VALID cells with correct content and styling (cell: %s, isOver: %s)',
    (cell: Cell, isOver: boolean, isValid: boolean, className: string) => {
      const result = calculateBgColor(isOver, isValid, cell.x, cell.y);

      expect(result).toEqual(className);
    },
  );
});
