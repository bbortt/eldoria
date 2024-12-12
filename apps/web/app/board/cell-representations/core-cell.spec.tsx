import { useDroppable } from '@dnd-kit/core';
import { Cell } from '@repo/core';
import { render } from '@testing-library/react';

import CoreCell from './core-cell';

jest.mock('@dnd-kit/core', () => ({
  useDroppable: jest.fn(),
}));

describe('CoreCell', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it.each([
    { x: 0, y: 0 },
    { x: 123, y: 456 },
  ])('should be droppable (%s)', (cell: Cell) => {
    (useDroppable as jest.Mock).mockReturnValueOnce({ isOver: false, setNodeRef: jest.fn() });

    render(<CoreCell cell={cell} />);

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
