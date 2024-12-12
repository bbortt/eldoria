import { useDroppable } from '@dnd-kit/core';
import { Cell } from '@repo/core';
import { render, screen } from '@testing-library/react';

import { CELL_BACKGROUND_BRIGHT, CELL_BACKGROUND_DARK, CELL_BACKGROUND_VALID, DRAGGABLE_TYPE_CHARACTER } from '../constants';
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
    [{ x: 0, y: 0 }, true, CELL_BACKGROUND_VALID],
    [{ x: 0, y: 1 }, true, CELL_BACKGROUND_VALID],
    [{ x: 0, y: 0 }, false, CELL_BACKGROUND_BRIGHT],
    [{ x: 0, y: 1 }, false, CELL_BACKGROUND_DARK],
  ])('should render cells with correct content and styling (cell: %s, isOver: %s)', (cell: Cell, isOver: boolean, className: string) => {
    (useDroppable as jest.Mock).mockReturnValueOnce({ isOver, setNodeRef: jest.fn() });

    render(<GridCell cell={cell} />);

    // Check styling
    const gridCell = screen.getByTestId(`cell-${cell.x}-${cell.y}`);
    expect(gridCell).toBeInTheDocument();
    expect(gridCell).toHaveClass(className);
  });
});
