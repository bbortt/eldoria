import { useDraggable } from '@dnd-kit/core';
import { Character, Specialization } from '@repo/core';
import { render } from '@testing-library/react';

import { DRAGGABLE_TYPE_CHARACTER } from '@/game/constants';

import { CharacterCard } from './character-card';

jest.mock('@dnd-kit/core', () => ({
  DragOverlay: jest.requireActual('@dnd-kit/core').DragOverlay,
  useDraggable: jest.fn(),
}));

describe('CharacterCard', () => {
  it.each([
    [0, true],
    [0, false],
    [1234, true],
  ])('is draggable', (index: number, isPlacementPossible: boolean) => {
    (useDraggable as jest.Mock).mockReturnValue({
      attributes: {},
      isDragging: false,
      listeners: {},
      setNodeRef: jest.fn(),
    });

    const character = { name: 'Obi-Wan Kenobi', specialization: Specialization.CHAMPION.label } as Character;

    render(<CharacterCard character={character} index={index} isPlacementPossible={isPlacementPossible} />);

    expect(useDraggable).toHaveBeenCalledWith({
      id: `character-${index}`,
      data: {
        character,
        type: DRAGGABLE_TYPE_CHARACTER,
      },
      disabled: !isPlacementPossible,
    });
  });
});
