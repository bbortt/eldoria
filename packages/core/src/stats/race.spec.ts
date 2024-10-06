import { Race } from './race';

describe('Race', () => {
  it('should create a Race instance with the correct properties', () => {
    const label = 'flies';
    const race = new Race(label, 10, 10, 10, 10, 10, 10);

    expect(race.label).toEqual(label);
    expect(race.baseStrength).toBe(10);
    expect(race.baseDexterity).toBe(10);
    expect(race.baseConstitution).toBe(10);
    expect(race.baseIntelligence).toBe(10);
    expect(race.baseWisdom).toBe(10);
    expect(race.baseCharisma).toBe(10);
  });

  it('should have pre-defined Race instances', () => {
    expect(Race.HUMAN).toBeDefined();
    expect(Race.DWARF).toBeDefined();
    expect(Race.ELF).toBeDefined();
    expect(Race.HALFLING).toBeDefined();
    expect(Race.GIANT).toBeDefined();
  });
});
