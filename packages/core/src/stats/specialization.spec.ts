import { Specialization } from './specialization';

describe('Specialization', () => {
  it('should create a Specialization instance with the correct properties', () => {
    const label = 'annoy';
    const specialization = new Specialization(label, 50, 3, 2, 0, 3, -1, 1, 0);

    expect(specialization.label).toEqual(label);
    expect(specialization.hpBonus).toBe(50);
    expect(specialization.acBonus).toBe(3);
    expect(specialization.strengthMod).toBe(2);
    expect(specialization.dexterityMod).toBe(0);
    expect(specialization.constitutionMod).toBe(3);
    expect(specialization.intelligenceMod).toBe(-1);
    expect(specialization.wisdomMod).toBe(1);
    expect(specialization.charismaMod).toBe(0);
  });

  it('should have pre-defined Specialization instances', () => {
    expect(Specialization.TANK).toBeDefined();
    expect(Specialization.WARRIOR).toBeDefined();
    expect(Specialization.ASSASSIN).toBeDefined();
    expect(Specialization.ARCHER).toBeDefined();
    expect(Specialization.MAGE).toBeDefined();
    expect(Specialization.HEALER).toBeDefined();
    expect(Specialization.BUFFER).toBeDefined();
  });
});
