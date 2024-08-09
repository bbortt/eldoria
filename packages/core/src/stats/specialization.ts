export class Specialization {
  constructor(
    public hpBonus: number,
    public acBonus: number,
    public strengthMod: number,
    public dexterityMod: number,
    public constitutionMod: number,
    public intelligenceMod: number,
    public wisdomMod: number,
    public charismaMod: number,
  ) {}

  static TANK = new Specialization(50, 3, 2, 0, 3, -1, 1, 0);
  static WARRIOR = new Specialization(30, 1, 3, 1, 1, 0, 0, 0);
  static ASSASSIN = new Specialization(10, 1, 1, 4, 0, 1, 1, 0);
  static ARCHER = new Specialization(20, 0, 1, 3, 0, 1, 2, 0);
  static MAGE = new Specialization(0, 0, -1, 1, 0, 4, 2, 1);
  static HEALER = new Specialization(20, 0, 0, 0, 1, 1, 4, 1);
  static BUFFER = new Specialization(10, 0, 0, 1, 1, 2, 2, 2);
}