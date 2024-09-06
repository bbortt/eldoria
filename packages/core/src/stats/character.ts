import { Race } from './race';
import { Specialization } from './specialization';

export class Character {
  public maxHP: number;
  public ac: number;

  public strength: number;
  public dexterity: number;
  public constitution: number;
  public intelligence: number;
  public wisdom: number;
  public charisma: number;

  constructor(
    public name: string,
    private race: Race,
    private specialization: Specialization,
  ) {
    this.strength = race.baseStrength + specialization.strengthMod;
    this.dexterity = race.baseDexterity + specialization.dexterityMod;
    this.constitution = race.baseConstitution + specialization.constitutionMod;
    this.intelligence = race.baseIntelligence + specialization.intelligenceMod;
    this.wisdom = race.baseWisdom + specialization.wisdomMod;
    this.charisma = race.baseCharisma + specialization.charismaMod;

    this.maxHP = 100 + specialization.hpBonus + this.constitution * 5;
    this.ac = 10 + Math.floor(this.dexterity / 2) - 5 + specialization.acBonus;
  }
}
