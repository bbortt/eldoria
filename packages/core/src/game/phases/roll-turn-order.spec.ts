import highlightCharacter from '../moves/highlight-character';
import { MOVEMENT_PHASE } from './index';
import rollTurnOrderPhase from './roll-turn-order';

describe('rollTurnOrderPhase', () => {
  it('should have correct properties', () => {
    expect(rollTurnOrderPhase).toHaveProperty('moves', { highlightCharacter });
    expect(rollTurnOrderPhase).toHaveProperty('next', MOVEMENT_PHASE);
  });

  describe('moves', () => {
    it('should include highlightCharacter', () => {
      expect(rollTurnOrderPhase.moves).toHaveProperty('highlightCharacter');
      expect(rollTurnOrderPhase.moves!.highlightCharacter).toEqual(highlightCharacter);
    });
  });
});
