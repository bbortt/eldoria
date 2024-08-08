export class Race {
  constructor(
    public baseStrength: number,
    public baseDexterity: number,
    public baseConstitution: number,
    public baseIntelligence: number,
    public baseWisdom: number,
    public baseCharisma: number,
  ) {}

  static HUMAN = new Race(10, 10, 10, 10, 10, 10);
  static DWARF = new Race(12, 8, 13, 10, 11, 9);
  static ELF = new Race(8, 12, 9, 12, 11, 11);
  static HALFLING = new Race(8, 13, 10, 10, 11, 12);
  static GIANT = new Race(14, 6, 13, 7, 10, 8);
}
