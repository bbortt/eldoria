import { useDroppable } from '@dnd-kit/core';
import { Cell } from '@repo/core';
import { render, screen } from '@testing-library/react';

import { DRAGGABLE_TYPE_CHARACTER } from '../constants';
import GridCell from './grid-cell';

jest.mock('@dnd-kit/core', () => ({
  useDroppable: jest.fn(),
}));

describe('GridCell', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it.each([
    { x: 0, y: 0 },
    { x: 123, y: 456 },
  ])('should be droppable (%s)', (cell: Cell) => {
    (useDroppable as jest.Mock).mockReturnValueOnce({ isOver: false, setNodeRef: jest.fn() });

    render(<GridCell cell={cell} />);

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
    [{ x: 0, y: 0 }, '(0,0)'],
    [{ x: 123, y: 456 }, '(123,456)'],
  ])('renders content (%s)', (cell: Cell, text: string) => {
    (useDroppable as jest.Mock).mockReturnValueOnce({ isOver: false, setNodeRef: jest.fn() });

    render(<GridCell cell={cell} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it.each([
    [true, 'bg-secondary/50'],
    [false, 'bg-transparent'],
  ])('should render cells with correct content and styling (isOver: %s)', (isOver: boolean, className: string) => {
    (useDroppable as jest.Mock).mockReturnValueOnce({ isOver, setNodeRef: jest.fn() });

    const cell: Cell = { x: 0, y: 0 };
    render(<GridCell cell={cell} />);

    // Check styling
    const gridCell = screen.getByTestId('cell-0-0');
    expect(gridCell).toBeInTheDocument();
    expect(gridCell).toHaveClass(className);
  });
});
