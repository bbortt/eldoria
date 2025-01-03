import { Crosshair, Heart, LucideProps, ShieldHalf, ShieldPlus, Skull, Stars, Swords, WandSparkles } from 'lucide-react';

export class Specialization {
  private constructor(
    public label: string,
    public icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>,
    public hpBonus: number,
    public acBonus: number,
    public strengthMod: number,
    public dexterityMod: number,
    public constitutionMod: number,
    public intelligenceMod: number,
    public wisdomMod: number,
    public charismaMod: number,
  ) {}

  static GUARDIAN = new Specialization('Guardian', ShieldHalf, 50, 3, 2, 0, 3, -1, 1, 0);
  static CHAMPION = new Specialization('Champion', Swords, 30, 1, 3, 1, 1, 0, 0, 0);
  static ROGUE = new Specialization('Rogue', Skull, 10, 1, 1, 4, 0, 1, 1, 0);
  static SHARPSHOOTER = new Specialization('Sharpshooter', Crosshair, 20, 0, 1, 3, 0, 1, 2, 0);
  static ARCANIST = new Specialization('Arcanist', WandSparkles, 0, 0, -1, 1, 0, 4, 2, 1);
  static NECROMANCER = new Specialization('Necromancer', Skull, 10, 0, 0, 1, 1, 3, 0, 2);
  static PALADIN = new Specialization('Paladin', ShieldPlus, 40, 2, 2, 0, 2, 0, 2, 1);
  static LUMINARY = new Specialization('Luminary', Heart, 20, 0, 0, 0, 1, 1, 4, 1);
  static MYSTIC_HERALD = new Specialization('Mystic Herald', Stars, 10, 0, 0, 1, 1, 2, 2, 2);

  static ALL_SPECIALIZATIONS = [
    this.GUARDIAN,
    this.CHAMPION,
    this.ROGUE,
    this.SHARPSHOOTER,
    this.ARCANIST,
    this.NECROMANCER,
    this.PALADIN,
    this.LUMINARY,
    this.MYSTIC_HERALD,
  ];

  static fromLabel(label: string): Specialization {
    const normalizedLabel = label.trim().toLowerCase();

    for (const specialization of this.ALL_SPECIALIZATIONS) {
      if (specialization.label.toLowerCase() === normalizedLabel) {
        return specialization;
      }
    }

    throw new Error(`Unknown specialization label: ${label}`);
  }
}
