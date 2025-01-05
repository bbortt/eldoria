import highlightCharacter from '../moves/highlight-character';
import rollDice from '../moves/roll-dice';
import { GATHER_GROUP_PHASE } from './index';
import rollTurnOrderPhase from './roll-turn-order';

describe('rollTurnOrderPhase', () => {
  it('should have correct properties', () => {
    expect(rollTurnOrderPhase).toHaveProperty('moves', { rollDice });
    expect(rollTurnOrderPhase).toHaveProperty('next', GATHER_GROUP_PHASE);
    expect(rollTurnOrderPhase).toHaveProperty('endIf');
    expect(rollTurnOrderPhase).toHaveProperty('onEnd');
  });

  describe('moves', () => {
    it('should include highlightCharacter', () => {
      expect(rollTurnOrderPhase.moves).toHaveProperty('highlightCharacter');
      expect(rollTurnOrderPhase.moves!.highlightCharacter).toEqual(highlightCharacter);
    });
  });
});
