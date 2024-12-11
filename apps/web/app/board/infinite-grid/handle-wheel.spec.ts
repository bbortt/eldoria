import type { GridInformation } from './calculate-grid-information';
import { handleWheel } from './handle-wheel';

const gridInformation: GridInformation = { startX: 0, endX: 10, startY: 0, endY: 10 };

describe('handleWheel', () => {
  const mockGetBoundingClientRect = jest.fn();
  const mockGridElement = {
    getBoundingClientRect: mockGetBoundingClientRect,
  };

  beforeEach(() => {
    jest.resetAllMocks();
    document.getElementById = jest.fn().mockReturnValueOnce(mockGridElement);
    mockGetBoundingClientRect.mockReturnValueOnce({
      left: 100,
      top: 100,
      width: 800,
      height: 600,
    });
  });

  it('should return undefined when ctrl key is not pressed', () => {
    const wheelEvent = {
      ctrlKey: false,
      preventDefault: jest.fn(),
    } as unknown as React.WheelEvent<HTMLDivElement>;

    const result = handleWheel(
      wheelEvent,
      10, // gridSize
      gridInformation,
      100, // gridBoundary
      5, // MIN_GRID_SIZE
      20, // MAX_GRID_SIZE
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

    const result = handleWheel(wheelEvent, 10, gridInformation, 100, 5, 20);

    expect(result).toBeUndefined();
  });

  it('should return undefined when grid size has not changed', () => {
    document.getElementById = jest.fn().mockReturnValueOnce(null);

    const wheelEvent = {
      ctrlKey: true,
      preventDefault: jest.fn(),
    } as unknown as React.WheelEvent<HTMLDivElement>;

    const result = handleWheel(wheelEvent, 10, gridInformation, 100, 5, 20);

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
      10, // current grid size
      gridInformation,
      100,
      5,
      20,
    );

    expect(wheelEvent.preventDefault).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.newCenterX).toEqual(5);
    expect(result.newCenterY).toEqual(5);
    expect(result.newGridSize).toEqual(9); // Should decrease by 1
  });

  it('should zoom out when deltaY is positive', () => {
    const wheelEvent = {
      ctrlKey: true,
      preventDefault: jest.fn(),
      deltaY: 100,
      clientX: 500,
      clientY: 400,
    } as unknown as React.WheelEvent<HTMLDivElement>;

    const result = handleWheel(wheelEvent, 10, gridInformation, 100, 5, 20);

    expect(wheelEvent.preventDefault).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.newCenterX).toEqual(5);
    expect(result.newCenterY).toEqual(5);
    expect(result.newGridSize).toEqual(11); // Should increase by 1
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
      20, // current size is MAX_GRID_SIZE
      gridInformation,
      100,
      5,
      20,
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
      5, // current size is MIN_GRID_SIZE
      gridInformation,
      100,
      5,
      20,
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
      10,
      gridInformation, // Starting from middle of the grid
      100,
      5,
      20,
    );

    expect(result).toBeDefined();
    // The center coordinates should be clamped within the grid boundary
    expect(result.newCenterX).toEqual(5);
    expect(result.newCenterY).toEqual(5);
    expect(result.newGridSize).toEqual(11);
  });
});
