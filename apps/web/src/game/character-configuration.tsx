import { Character, Race, Specialization } from '@repo/core';
import { Input } from '@repo/ui';
import { DrowdownForListItems } from '@repo/ui/components';

const races = [Race.HUMAN, Race.DWARF, Race.ELF, Race.HALFLING, Race.GIANT];

const specializations = [
  Specialization.TANK,
  Specialization.WARRIOR,
  Specialization.ASSASSIN,
  Specialization.ARCHER,
  Specialization.MAGE,
  Specialization.HEALER,
  Specialization.BUFFER,
];

export interface CharacterConfigurationProps {
  character: Character;
  onChange: (updatedCharacter: Character) => void;
}

export const CharacterConfiguration: React.FC<CharacterConfigurationProps> = ({ character, onChange }) => {
  const setCharacterName = (e: React.ChangeEvent<HTMLInputElement>): void => onChange({ ...character, name: e.target.value });
  const setCharacterRace = (selection: Set<string>): void => {
    const race = races.find((race: Race) => race.label === selection.values().next().value);
    if (race) {
      onChange({ ...character, race: race?.label });
    }
  };
  const setCharacterSpecialization = (selection: Set<string>): void => {
    const specialization = specializations.find(
      (specialization: Specialization) => specialization.label === selection.values().next().value,
    );
    if (specialization) {
      onChange({ ...character, specialization: specialization?.label });
    }
  };

  return (
    <>
      <Input
        key="Name"
        type="text"
        label="Name"
        value={character.name}
        onChange={setCharacterName}
        variant="bordered"
        color="secondary"
        fullWidth={true}
        isRequired={true}
      />

      <DrowdownForListItems
        ariaLabel="Character race selection"
        items={races}
        label={character.race}
        onSelectionChange={setCharacterRace}
      />
      <DrowdownForListItems
        ariaLabel="Character specialization selection"
        items={specializations}
        label={character.specialization}
        onSelectionChange={setCharacterSpecialization}
      />
    </>
  );
};

export default CharacterConfiguration;
