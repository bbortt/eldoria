import { Specialization } from './specialization';

describe('Specialization', () => {
  it('should create a Specialization instance with the correct properties', () => {
    const label = 'annoy';
    const specialization = new Specialization(label, 50, 3, 2, 0, 3, -1, 1, 0);

    expect(specialization.label).toEqual(label);
    expect(specialization.hpBonus).toEqual(50);
    expect(specialization.acBonus).toEqual(3);
    expect(specialization.strengthMod).toEqual(2);
    expect(specialization.dexterityMod).toEqual(0);
    expect(specialization.constitutionMod).toEqual(3);
    expect(specialization.intelligenceMod).toEqual(-1);
    expect(specialization.wisdomMod).toEqual(1);
    expect(specialization.charismaMod).toEqual(0);
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

  it.each([
    [Specialization.TANK.label, Specialization.TANK],
    [Specialization.WARRIOR.label, Specialization.WARRIOR],
    [Specialization.ASSASSIN.label, Specialization.ASSASSIN],
    [Specialization.ARCHER.label, Specialization.ARCHER],
    [Specialization.MAGE.label, Specialization.MAGE],
    [Specialization.HEALER.label, Specialization.HEALER],
    [Specialization.BUFFER.label, Specialization.BUFFER],
  ])('should return the correctly labelled Specialization (%s)', (label: string, specialization: Specialization) => {
    expect(Specialization.fromLabel(label)).toEqual(specialization);
  });

  it('should throw an error on unknown label', () => {
    expect(() => Specialization.fromLabel('unknown')).toThrow('Unknown specialization label: unknown');
  });
});
