import { newCharacter } from './character';
import { Race } from './race';
import { Specialization } from './specialization';

export const THANE = newCharacter('Thane', Race.DWARF, Specialization.TANK);
export const NYSSA = newCharacter('Nyssa', Race.HUMAN, Specialization.ASSASSIN);
export const ELYNDOR = newCharacter('Elyndor', Race.DWARF, Specialization.MAGE);
export const BROM = newCharacter('Brom', Race.GIANT, Specialization.WARRIOR);
export const SELENE = newCharacter('Selene', Race.ELF, Specialization.HEALER);
