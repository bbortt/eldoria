import {
  CrosshairIcon,
  HeartIcon,
  LucideProps,
  ShieldHalfIcon,
  ShieldPlusIcon,
  SkullIcon,
  StarsIcon,
  SwordsIcon,
  WandSparklesIcon,
} from 'lucide-react';

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

  // Base Movement: Roll 1D6 and move half the result (rounded up).
  // Unique Rule: Can "Shield Charge" in a straight line for 4 tiles, but only if it moves towards an ally or enemy.
  static GUARDIAN = new Specialization('Guardian', ShieldHalfIcon, 50, 3, 2, 0, 3, -1, 1, 0);

  // Base Movement: Roll 1D8 and move up to the result.
  // Unique Rule: Gains +2 movement if moving towards an enemy directly.
  static CHAMPION = new Specialization('Champion', SwordsIcon, 30, 1, 3, 1, 1, 0, 0, 0);

  // Base Movement: Roll 2D6 and move up to the total result.
  // Unique Rule: Can "Shadow Step" diagonally through obstacles once per turn for 4 tiles, bypassing enemies.
  static ROGUE = new Specialization('Rogue', SkullIcon, 10, 1, 1, 4, 0, 1, 1, 0);

  // Base Movement: Roll 1D6 and move up to the result.
  // Unique Rule: Can "Retreat" backward (away from enemies) up to 3 tiles without rolling.
  static SHARPSHOOTER = new Specialization('Sharpshooter', CrosshairIcon, 20, 0, 1, 3, 0, 1, 2, 0);

  // Base Movement: Roll 1D8 and move half the result (rounded up).
  // Unique Rule: Can teleport to any adjacent tile within a 3x3 square once per turn.
  static ARCANIST = new Specialization('Arcanist', WandSparklesIcon, 0, 0, -1, 1, 0, 4, 2, 1);

  // Base Movement: Roll 1D6 and move up to the result.
  // Unique Rule: Can summon a minion on an adjacent tile once per turn; the minion moves 3 tiles independently.
  static NECROMANCER = new Specialization('Necromancer', SkullIcon, 10, 0, 0, 1, 1, 3, 0, 2);

  // Base Movement: Roll 1D8 and move up to the result.
  // Unique Rule: Can charge in a straight line for 5 tiles, but must end next to an enemy or ally.
  static PALADIN = new Specialization('Paladin', ShieldPlusIcon, 40, 2, 2, 0, 2, 0, 2, 1);

  // Base Movement: Roll 1D6 and move up to the result.
  // Unique Rule: Gains +2 movement if moving towards an ally to heal or buff them.
  static LUMINARY = new Specialization('Luminary', HeartIcon, 20, 0, 0, 0, 1, 1, 4, 1);

  // Base Movement: Roll 1D8 and move up to the result.
  // Unique Rule: Can "Inspire" an adjacent ally, granting them +2 movement in their next turn.
  static MYSTIC_HERALD = new Specialization('Mystic Herald', StarsIcon, 10, 0, 0, 1, 1, 2, 2, 2);

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
