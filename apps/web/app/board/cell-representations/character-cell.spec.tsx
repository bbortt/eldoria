import { useDroppable } from '@dnd-kit/core';
import { Cell, newCharacter, Race, Specialization } from '@repo/core';
import { render } from '@testing-library/react';

import CharacterCell from './character-cell';

jest.mock('@dnd-kit/core', () => ({
  useDroppable: jest.fn(),
}));

describe('CharacterCell', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it.each([
    { x: 0, y: 0 },
    { x: 123, y: 456 },
  ])('should be droppable (%s)', (cell: Cell) => {
    (useDroppable as jest.Mock).mockReturnValueOnce({ isOver: false, setNodeRef: jest.fn() });
    const character = newCharacter('bbortt', Race.HUMAN, Specialization.MAGE);

    render(<CharacterCell cell={cell} character={character} />);

    expect(useDroppable).toHaveBeenCalledWith({
      id: `grid-field-${cell.x}-${cell.y}`,
      data: {
        x: cell.x,
        y: cell.y,
        accepts: [],
      },
    });
  });
});
