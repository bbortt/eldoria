import { Character, Specialization } from '@repo/core';
import { Card } from '@repo/ui';

export interface CharacterBarProps {
  characters: Character[];
}

export const CharacterBar: React.FC<CharacterBarProps> = ({ characters }) => {
  const handleDragStart = (e: React.DragEvent, characterId: number) => {
    e.dataTransfer.setData('character', String(characterId));
  };

  const renderCharacter = (i: number, name: string, specialization: string) => {
    const Icon = Specialization.fromLabel(specialization).icon;

    console.log('render:', i);

    return (
      <div
        key={`character-icon-${i}`}
        className="flex flex-col items-center justify-center transition-all cursor-move rounded-lg border-2 border-border hover:border-primary hover:scale-110 p-2"
      >
        <div draggable onDragStart={e => handleDragStart(e, i)}>
          <Icon className="text-secondary text-small" />
        </div>
        <span>{name}</span>
      </div>
    );
  };

  console.log('characters:', characters);

  return (
    <Card className="fixed bottom-0 left-0 right-0 pb-2 pt-2 supports-[backdrop-filter]:bg-background/60 z-50 border-t">
      <div className="flex items-center justify-center h-full gap-8 px-4">
        {characters.map(({ name, specialization }: Character, i: number) => renderCharacter(i, name, specialization))}
      </div>
    </Card>
  );
};

export default CharacterBar;
