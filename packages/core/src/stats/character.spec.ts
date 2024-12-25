import { Character, newCharacter } from './character';
import { Race } from './race';
import { Specialization } from './specialization';

jest.mock('./race', () => ({
  Race: {
    HUMAN: {
      baseStrength: 10,
      baseDexterity: 10,
      baseConstitution: 10,
      baseIntelligence: 10,
      baseWisdom: 10,
      baseCharisma: 10,
    },
  },
}));

jest.mock('./specialization', () => ({
  Specialization: {
    CHAMPION: {
      strengthMod: 2,
      dexterityMod: 1,
      constitutionMod: 2,
      intelligenceMod: 0,
      wisdomMod: 0,
      charismaMod: 0,
      hpBonus: 20,
      acBonus: 2,
    },
  },
}));

describe('Character', () => {
  it('should create a character with correct attributes', () => {
    const character: Character = newCharacter('TestWarrior', Race.HUMAN, Specialization.CHAMPION);

    expect(character.name).toEqual('TestWarrior');
    expect(character.race).toEqual(Race.HUMAN.label);
    expect(character.specialization).toEqual(Specialization.CHAMPION.label);

    // Test base attributes
    expect(character.strength).toEqual(12); // 10 (base) + 2 (mod)
    expect(character.dexterity).toEqual(11); // 10 (base) + 1 (mod)
    expect(character.constitution).toEqual(12); // 10 (base) + 2 (mod)
    expect(character.intelligence).toEqual(10); // 10 (base) + 0 (mod)
    expect(character.wisdom).toEqual(10); // 10 (base) + 0 (mod)
    expect(character.charisma).toEqual(10); // 10 (base) + 0 (mod)

    // Test derived attributes
    expect(character.maxHP).toEqual(180); // 100 + 20 (bonus) + 12 (constitution) * 5
    expect(character.ac).toEqual(12); // 10 + floor(11/2) - 5 + 2 (bonus)
  });
});
