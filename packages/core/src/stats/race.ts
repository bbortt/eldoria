export class Race {
  private constructor(
    public label: string,
    public baseStrength: number,
    public baseDexterity: number,
    public baseConstitution: number,
    public baseIntelligence: number,
    public baseWisdom: number,
    public baseCharisma: number,
  ) {}

  static HUMAN = new Race('Human', 10, 10, 10, 10, 10, 10);
  static DWARF = new Race('Dwarf', 12, 8, 13, 10, 11, 9);
  static ELF = new Race('Elf', 8, 12, 9, 12, 11, 11);
  static HALFLING = new Race('Halfling', 8, 13, 10, 10, 11, 12);
  static GIANT = new Race('Giant', 14, 6, 13, 7, 10, 8);

  static ALL_RACES = [this.HUMAN, this.DWARF, this.ELF, this.HALFLING, this.GIANT];

  static fromLabel(label: string): Race {
    const normalizedLabel = label.trim().toLowerCase();

    for (const race of this.ALL_RACES) {
      if (race.label.toLowerCase() === normalizedLabel) {
        return race;
      }
    }

    throw new Error(`Unknown race label: ${label}`);
  }
}
