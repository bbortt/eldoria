export class Specialization {
  constructor(
    public label: string,
    public hpBonus: number,
    public acBonus: number,
    public strengthMod: number,
    public dexterityMod: number,
    public constitutionMod: number,
    public intelligenceMod: number,
    public wisdomMod: number,
    public charismaMod: number,
  ) {}

  static TANK = new Specialization('Tank', 50, 3, 2, 0, 3, -1, 1, 0);
  static WARRIOR = new Specialization('Warrior', 30, 1, 3, 1, 1, 0, 0, 0);
  static ASSASSIN = new Specialization('Assassin', 10, 1, 1, 4, 0, 1, 1, 0);
  static ARCHER = new Specialization('Archer', 20, 0, 1, 3, 0, 1, 2, 0);
  static MAGE = new Specialization('Mage', 0, 0, -1, 1, 0, 4, 2, 1);
  static HEALER = new Specialization('Healer', 20, 0, 0, 0, 1, 1, 4, 1);
  static BUFFER = new Specialization('Buffer', 10, 0, 0, 1, 1, 2, 2, 2);

  static fromLabel(label: string): Specialization {
    const normalizedLabel = label.trim().toLowerCase();

    switch (normalizedLabel) {
      case 'tank':
        return Specialization.TANK;
      case 'warrior':
        return Specialization.WARRIOR;
      case 'assassin':
        return Specialization.ASSASSIN;
      case 'archer':
        return Specialization.ARCHER;
      case 'mage':
        return Specialization.MAGE;
      case 'healer':
        return Specialization.HEALER;
      case 'buffer':
        return Specialization.BUFFER;
      default:
        throw new Error(`Unknown specialization label: ${label}`);
    }
  }
}
