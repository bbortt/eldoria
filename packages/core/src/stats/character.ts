import { Race } from './race';
import { Specialization } from './specialization';

export const newCharacter = (name: string, race: Race, specialization: Specialization): Character => {
  const dexterity = race.baseDexterity + specialization.dexterityMod;
  const ac = 10 + Math.floor(dexterity / 2) - 5 + specialization.acBonus;

  const constitution = race.baseConstitution + specialization.constitutionMod;
  const maxHP = 100 + specialization.hpBonus + constitution * 5;

  return new Character(
    name,

    race.label,
    specialization.label,

    maxHP,
    maxHP,
    ac,

    race.baseStrength + specialization.strengthMod,
    dexterity,
    constitution,
    race.baseIntelligence + specialization.intelligenceMod,
    race.baseWisdom + specialization.wisdomMod,
    race.baseCharisma + specialization.charismaMod,
  );
};

export class Character {
  constructor(
    public name: string,

    public race: string,
    public specialization: string,

    public currentHP: number,
    public maxHP: number,
    public ac: number,

    public strength: number,
    public dexterity: number,
    public constitution: number,
    public intelligence: number,
    public wisdom: number,
    public charisma: number,
  ) {}
}
