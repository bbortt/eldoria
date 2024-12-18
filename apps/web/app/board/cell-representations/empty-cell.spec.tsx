import { useDroppable } from '@dnd-kit/core';
import { Cell } from '@repo/core';
import { render, screen } from '@testing-library/react';

import { DRAGGABLE_TYPE_CHARACTER } from '@/game/constants';

import { EmptyCell } from './empty-cell';

jest.mock('@dnd-kit/core', () => ({
  useDroppable: jest.fn(),
}));

describe('EmptyCell', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it.each([
    { x: 0, y: 0 },
    { x: 123, y: 456 },
  ])('should be droppable (%s)', (cell: Cell) => {
    (useDroppable as jest.Mock).mockReturnValueOnce({ isOver: false, setNodeRef: jest.fn() });

    render(<EmptyCell cell={cell} />);

    expect(useDroppable).toHaveBeenCalledWith({
      id: `grid-field-${cell.x}-${cell.y}`,
      data: {
        x: cell.x,
        y: cell.y,
        accepts: [DRAGGABLE_TYPE_CHARACTER],
      },
    });
  });

  it.each([
    [{ x: 0, y: 0 }, '(0, 0)'],
    [{ x: 123, y: 456 }, '(123, 456)'],
  ])('renders content (%s)', (cell: Cell, text: string) => {
    (useDroppable as jest.Mock).mockReturnValueOnce({ isOver: false, setNodeRef: jest.fn() });

    render(<EmptyCell cell={cell} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
