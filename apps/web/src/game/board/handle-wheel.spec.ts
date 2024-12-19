import type { GridInformation } from './grid-information';
import { handleWheel } from './handle-wheel';

describe('handleWheel', () => {
  const mockGetBoundingClientRect = jest.fn();
  const mockGridElement = {
    getBoundingClientRect: mockGetBoundingClientRect,
  };

  let gridInformation: GridInformation;

  beforeEach(() => {
    jest.resetAllMocks();

    document.getElementById = jest.fn().mockReturnValueOnce(mockGridElement);
    mockGetBoundingClientRect.mockReturnValueOnce({
      left: 100,
      top: 100,
      width: 800,
      height: 600,
    });

    gridInformation = { startX: 5, endX: 10, startY: 5, endY: 10 };
  });

  it('should return undefined when ctrl key is not pressed', () => {
    const wheelEvent = {
      ctrlKey: false,
      preventDefault: jest.fn(),
    } as unknown as React.WheelEvent<HTMLDivElement>;

    const result = handleWheel(
      wheelEvent,
      5, // gridSize
      gridInformation,
      100, // gridBoundary
      2, // MIN_GRID_SIZE
      10, // MAX_GRID_SIZE
    );

    expect(result).toBeUndefined();
    expect(wheelEvent.preventDefault).not.toHaveBeenCalled();
  });

  it('should return undefined when grid element is not found', () => {
    document.getElementById = jest.fn().mockReturnValueOnce(null);

    const wheelEvent = {
      ctrlKey: true,
      preventDefault: jest.fn(),
    } as unknown as React.WheelEvent<HTMLDivElement>;

    const result = handleWheel(wheelEvent, 5, gridInformation, 100, 2, 10);
    expect(result).toBeUndefined();
    expect(wheelEvent.preventDefault).toHaveBeenCalled();
  });

  it('should return undefined when grid size has not changed', () => {
    document.getElementById = jest.fn().mockReturnValueOnce(null);

    const wheelEvent = {
      ctrlKey: true,
      preventDefault: jest.fn(),
    } as unknown as React.WheelEvent<HTMLDivElement>;

    const result = handleWheel(wheelEvent, 5, gridInformation, 100, 2, 10);

    expect(result).toBeUndefined();
  });

  it('should zoom in when deltaY is negative', () => {
    const wheelEvent = {
      ctrlKey: true,
      preventDefault: jest.fn(),
      deltaY: -100,
      clientX: 500,
      clientY: 400,
    } as unknown as React.WheelEvent<HTMLDivElement>;

    const result = handleWheel(
      wheelEvent,
      5, // current grid size
      gridInformation,
      100,
      2,
      10,
    );

    expect(wheelEvent.preventDefault).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.startX).toEqual(6);
    expect(result.startY).toEqual(6);
    expect(result.newGridSize).toEqual(4); // Should decrease by 1
  });

  it('should zoom out when deltaY is positive', () => {
    const wheelEvent = {
      ctrlKey: true,
      preventDefault: jest.fn(),
      deltaY: 100,
      clientX: 500,
      clientY: 400,
    } as unknown as React.WheelEvent<HTMLDivElement>;

    const result = handleWheel(wheelEvent, 5, gridInformation, 100, 2, 10);

    expect(wheelEvent.preventDefault).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.startX).toEqual(5);
    expect(result.startY).toEqual(5);
    expect(result.newGridSize).toEqual(6); // Should increase by 1
  });

  it('should not exceed MAX_GRID_SIZE when zooming out', () => {
    const wheelEvent = {
      ctrlKey: true,
      preventDefault: jest.fn(),
      deltaY: 100,
      clientX: 500,
      clientY: 400,
    } as unknown as React.WheelEvent<HTMLDivElement>;

    const result = handleWheel(
      wheelEvent,
      10, // current size is MAX_GRID_SIZE
      gridInformation,
      100,
      5,
      10,
    );

    expect(result).toBeUndefined(); // Should stay at MAX_GRID_SIZE
  });

  it('should not go below MIN_GRID_SIZE when zooming in', () => {
    const wheelEvent = {
      ctrlKey: true,
      preventDefault: jest.fn(),
      deltaY: -100,
      clientX: 500,
      clientY: 400,
    } as unknown as React.WheelEvent<HTMLDivElement>;

    const result = handleWheel(
      wheelEvent,
      2, // current size is MIN_GRID_SIZE
      gridInformation,
      100,
      2,
      10,
    );

    expect(result).toBeUndefined(); // Should stay at MIN_GRID_SIZE
  });

  it('should maintain cursor position over the same cell when zooming', () => {
    const wheelEvent = {
      ctrlKey: true,
      preventDefault: jest.fn(),
      deltaY: 100,
      clientX: 500, // Middle of grid horizontally
      clientY: 400, // Middle of grid vertically
    } as unknown as React.WheelEvent<HTMLDivElement>;

    const result = handleWheel(
      wheelEvent,
      5,
      gridInformation, // Starting from middle of the grid
      100,
      2,
      10,
    );

    expect(result).toBeDefined();
    // The center coordinates should be clamped within the grid boundary
    expect(result.startX).toEqual(5);
    expect(result.startY).toEqual(5);
    expect(result.newGridSize).toEqual(6);
  });

  it('should not go below 0/0 when zooming out', () => {
    gridInformation = { startX: 0, endX: 5, startY: 0, endY: 5 };
    const wheelEvent = {
      ctrlKey: true,
      preventDefault: jest.fn(),
      deltaY: 100,
      clientX: 500,
      clientY: 400,
    } as unknown as React.WheelEvent<HTMLDivElement>;

    const result = handleWheel(wheelEvent, 5, gridInformation, 100, 2, 10);

    expect(wheelEvent.preventDefault).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.startX).toEqual(0);
    expect(result.startY).toEqual(0);
    expect(result.newGridSize).toEqual(6); // Should increase by 1
  });

  it('should not go above gridBoundary when zooming out', () => {
    gridInformation = { startX: 95, endX: 100, startY: 95, endY: 100 };
    const wheelEvent = {
      ctrlKey: true,
      preventDefault: jest.fn(),
      deltaY: 100,
      clientX: 500,
      clientY: 400,
    } as unknown as React.WheelEvent<HTMLDivElement>;

    const result = handleWheel(wheelEvent, 5, gridInformation, 100, 2, 10);

    expect(wheelEvent.preventDefault).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.startX).toEqual(94);
    expect(result.startY).toEqual(94);
    expect(result.newGridSize).toEqual(6); // Should increase by 1
  });
});
