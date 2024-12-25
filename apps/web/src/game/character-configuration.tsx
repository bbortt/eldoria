import { Character, Race, Specialization } from '@repo/core';
import { Input } from '@repo/ui';
import { DrowdownForListItems } from '@repo/ui/components';

export interface CharacterConfigurationProps {
  character: Character;
  onChange: (updatedCharacter: Character) => void;
}

export const CharacterConfiguration: React.FC<CharacterConfigurationProps> = ({ character, onChange }) => {
  const setCharacterName = (e: React.ChangeEvent<HTMLInputElement>): void => onChange({ ...character, name: e.target.value });
  const setCharacterRace = (selection: Set<string>): void => {
    const race = Race.fromLabel(selection.values().next().value || Race.HUMAN.label);
    onChange({ ...character, race: race?.label });
  };
  const setCharacterSpecialization = (selection: Set<string>): void => {
    const specialization = Specialization.fromLabel(selection.values().next().value || Specialization.LUMINARY.label);
    onChange({ ...character, specialization: specialization?.label });
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
        items={Race.ALL_RACES}
        label={character.race}
        onSelectionChange={setCharacterRace}
      />
      <DrowdownForListItems
        ariaLabel="Character specialization selection"
        items={Specialization.ALL_SPECIALIZATIONS}
        label={character.specialization}
        onSelectionChange={setCharacterSpecialization}
      />
    </>
  );
};

export default CharacterConfiguration;
