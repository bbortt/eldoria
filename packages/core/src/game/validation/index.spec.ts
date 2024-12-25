import { newCharacter, Race, Specialization } from '../../stats';
import { CELL_TYPE_CHARACTER } from '../cell';
import { isMoveValid } from './index';

describe('isMoveValid', () => {
  describe('should return `false`', () => {
    it('when y coordinate is wrong', () => {
      const result = isMoveValid({ cells: [] }, newCharacter('bbortt', Race.HUMAN, Specialization.ARCANIST), 1, 0);
      expect(result).toEqual(false);
    });

    it('when x coordinate is wrong', () => {
      const result = isMoveValid({ cells: [[]] }, newCharacter('bbortt', Race.HUMAN, Specialization.ARCANIST), 0, 1);
      expect(result).toEqual(false);
    });

    it('when cell is occupied', () => {
      const result = isMoveValid(
        { cells: [[{ x: 0, y: 0, content: { type: CELL_TYPE_CHARACTER } }]] },
        newCharacter('bbortt', Race.HUMAN, Specialization.ARCANIST),
        0,
        0,
      );
      expect(result).toEqual(false);
    });
  });

  describe('should return `true`', () => {
    it('when cell is free', () => {
      const result = isMoveValid({ cells: [[{ x: 0, y: 0 }]] }, newCharacter('bbortt', Race.HUMAN, Specialization.ARCANIST), 0, 0);
      expect(result).toEqual(true);
    });
  });
});
