import { TestTubeIcon } from 'lucide-react';

import { Specialization } from './specialization';

describe('Specialization', () => {
  it('should create a Specialization instance with the correct properties', () => {
    const label = 'annoy';
    // @ts-expect-error TS2673: Constructor of class Race is private and only accessible within the class declaration.
    const specialization = new Specialization(label, TestTubeIcon, 50, 3, 2, 0, 3, -1, 1, 0);

    expect(specialization.label).toEqual(label);
    expect(specialization.icon).toEqual(TestTubeIcon);
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
    expect(Specialization.GUARDIAN).toBeDefined();
    expect(Specialization.CHAMPION).toBeDefined();
    expect(Specialization.ROGUE).toBeDefined();
    expect(Specialization.SHARPSHOOTER).toBeDefined();
    expect(Specialization.ARCANIST).toBeDefined();
    expect(Specialization.LUMINARY).toBeDefined();
    expect(Specialization.MYSTIC_HERALD).toBeDefined();
  });

  it('ALL_SPECIALIZATIONS should contain all Specializations', () => {
    expect(Specialization.ALL_SPECIALIZATIONS).toHaveLength(9);
  });

  it.each(Specialization.ALL_SPECIALIZATIONS)(
    'should return the correctly labelled Specialization (%s)',
    (specialization: Specialization) => {
      expect(Specialization.fromLabel(specialization.label)).toEqual(specialization);
    },
  );

  it('should throw an error on unknown label', () => {
    expect(() => Specialization.fromLabel('unknown')).toThrow('Unknown specialization label: unknown');
  });
});
