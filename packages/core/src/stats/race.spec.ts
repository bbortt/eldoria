import { Race } from './race';

describe('Race', () => {
  it('should create a Race instance with the correct properties', () => {
    const label = 'flies';
    // @ts-expect-error TS2673: Constructor of class Race is private and only accessible within the class declaration.
    const race = new Race(label, 10, 10, 10, 10, 10, 10);

    expect(race.label).toEqual(label);
    expect(race.baseStrength).toEqual(10);
    expect(race.baseDexterity).toEqual(10);
    expect(race.baseConstitution).toEqual(10);
    expect(race.baseIntelligence).toEqual(10);
    expect(race.baseWisdom).toEqual(10);
    expect(race.baseCharisma).toEqual(10);
  });

  it('should have pre-defined Race instances', () => {
    expect(Race.HUMAN).toBeDefined();
    expect(Race.DWARF).toBeDefined();
    expect(Race.ELF).toBeDefined();
    expect(Race.HALFLING).toBeDefined();
    expect(Race.GIANT).toBeDefined();
  });

  it('ALL_RACES should contain all Races', () => {
    expect(Race.ALL_RACES).toHaveLength(5);
  });

  it.each(Race.ALL_RACES)('should return the correctly labelled Race (%s)', (race: Race) => {
    expect(Race.fromLabel(race.label)).toEqual(race);
  });

  it('should throw an error on unknown label', () => {
    expect(() => Race.fromLabel('unknown')).toThrow('Unknown race label: unknown');
  });
});
