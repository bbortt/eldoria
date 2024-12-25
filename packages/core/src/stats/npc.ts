import { newCharacter } from './character';
import { Race } from './race';
import { Specialization } from './specialization';

export const THANE = newCharacter('Thane', Race.DWARF, Specialization.GUARDIAN);
export const NYSSA = newCharacter('Nyssa', Race.HUMAN, Specialization.ROGUE);
export const ELYNDOR = newCharacter('Elyndor', Race.DWARF, Specialization.ARCANIST);
export const BROM = newCharacter('Brom', Race.GIANT, Specialization.CHAMPION);
export const SELENE = newCharacter('Selene', Race.ELF, Specialization.LUMINARY);
