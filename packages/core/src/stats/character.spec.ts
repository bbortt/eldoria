import { Character } from './character';
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
    WARRIOR: {
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
    const character = new Character('TestWarrior', Race.HUMAN, Specialization.WARRIOR);

    expect(character.name).toBe('TestWarrior');
    expect(character.race).toBe(Race.HUMAN);
    expect(character.specialization).toBe(Specialization.WARRIOR);

    // Test base attributes
    expect(character.strength).toBe(12); // 10 (base) + 2 (mod)
    expect(character.dexterity).toBe(11); // 10 (base) + 1 (mod)
    expect(character.constitution).toBe(12); // 10 (base) + 2 (mod)
    expect(character.intelligence).toBe(10); // 10 (base) + 0 (mod)
    expect(character.wisdom).toBe(10); // 10 (base) + 0 (mod)
    expect(character.charisma).toBe(10); // 10 (base) + 0 (mod)

    // Test derived attributes
    expect(character.maxHP).toBe(180); // 100 + 20 (bonus) + 12 (constitution) * 5
    expect(character.ac).toBe(12); // 10 + floor(11/2) - 5 + 2 (bonus)
  });
});
