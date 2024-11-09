import { calculateGridInformation } from './calculate-grid-information';

describe('calculateGridInformation', () => {
  const GRID_BOUNDARY = 64;

  it('should calculate correct boundaries for centered view', () => {
    const center = { x: 32, y: 32 };
    const gridSize = 10;

    const result = calculateGridInformation(center, gridSize, GRID_BOUNDARY);

    expect(result).toEqual({
      startX: 27, // 32 - floor(10/2)
      endX: 37, // 32 + ceil(10/2)
      startY: 27,
      endY: 37,
    });
  });

  it('should handle odd and even grid sizes correctly', () => {
    const center = { x: 32, y: 32 };

    // Even grid size (10)
    const evenResult = calculateGridInformation(center, 10, GRID_BOUNDARY);
    expect(evenResult.endX - evenResult.startX).toBe(10);
    expect(evenResult.endY - evenResult.startY).toBe(10);

    // Odd grid size (9)
    const oddResult = calculateGridInformation(center, 9, GRID_BOUNDARY);
    expect(oddResult.endX - oddResult.startX).toBe(9);
    expect(oddResult.endY - oddResult.startY).toBe(9);
  });

  it('should clamp to left boundary', () => {
    const center = { x: 2, y: 32 };
    const gridSize = 10;

    const result = calculateGridInformation(center, gridSize, GRID_BOUNDARY);

    expect(result.startX).toBe(0);
    expect(result.endX).toBe(10);
    expect(result.endX - result.startX).toBe(gridSize);
  });

  it('should clamp to right boundary', () => {
    const center = { x: 62, y: 32 };
    const gridSize = 10;

    const result = calculateGridInformation(center, gridSize, GRID_BOUNDARY);

    expect(result.startX).toBe(54);
    expect(result.endX).toBe(64);
    expect(result.endX - result.startX).toBe(gridSize);
  });

  it('should clamp to top boundary', () => {
    const center = { x: 32, y: 2 };
    const gridSize = 10;

    const result = calculateGridInformation(center, gridSize, GRID_BOUNDARY);

    expect(result.startY).toBe(0);
    expect(result.endY).toBe(10);
    expect(result.endY - result.startY).toBe(gridSize);
  });

  it('should clamp to bottom boundary', () => {
    const center = { x: 32, y: 62 };
    const gridSize = 10;

    const result = calculateGridInformation(center, gridSize, GRID_BOUNDARY);

    expect(result.startY).toBe(54);
    expect(result.endY).toBe(64);
    expect(result.endY - result.startY).toBe(gridSize);
  });

  it('should handle corner cases', () => {
    // Top-left corner
    expect(calculateGridInformation({ x: 0, y: 0 }, 10, GRID_BOUNDARY)).toEqual({
      startX: 0,
      endX: 10,
      startY: 0,
      endY: 10,
    });

    // Bottom-right corner
    expect(calculateGridInformation({ x: 63, y: 63 }, 10, GRID_BOUNDARY)).toEqual({
      startX: 54,
      endX: 64,
      startY: 54,
      endY: 64,
    });
  });

  it('should maintain grid size when clamping', () => {
    const testCases = [
      { center: { x: 0, y: 0 }, desc: 'top-left' },
      { center: { x: 63, y: 0 }, desc: 'top-right' },
      { center: { x: 0, y: 63 }, desc: 'bottom-left' },
      { center: { x: 63, y: 63 }, desc: 'bottom-right' },
      { center: { x: -5, y: 32 }, desc: 'off-left' },
      { center: { x: 68, y: 32 }, desc: 'off-right' },
      { center: { x: 32, y: -5 }, desc: 'off-top' },
      { center: { x: 32, y: 68 }, desc: 'off-bottom' },
    ];

    const gridSize = 10;

    testCases.forEach(({ center, desc }) => {
      const result = calculateGridInformation(center, gridSize, GRID_BOUNDARY);

      expect(result.endX - result.startX).toBe(gridSize, `Grid width should be ${gridSize} for ${desc} case`);
      expect(result.endY - result.startY).toBe(gridSize, `Grid height should be ${gridSize} for ${desc} case`);

      // Verify boundaries
      expect(result.startX).toBeGreaterThanOrEqual(0);
      expect(result.endX).toBeLessThanOrEqual(GRID_BOUNDARY);
      expect(result.startY).toBeGreaterThanOrEqual(0);
      expect(result.endY).toBeLessThanOrEqual(GRID_BOUNDARY);
    });
  });

  it('should handle extreme center positions', () => {
    const gridSize = 10;
    const extremeCases = [
      { x: -1000, y: -1000 },
      { x: 1000, y: 1000 },
      { x: -1000, y: 1000 },
      { x: 1000, y: -1000 },
    ];

    extremeCases.forEach(center => {
      const result = calculateGridInformation(center, gridSize, GRID_BOUNDARY);

      expect(result.startX).toBeGreaterThanOrEqual(0);
      expect(result.endX).toBeLessThanOrEqual(GRID_BOUNDARY);
      expect(result.startY).toBeGreaterThanOrEqual(0);
      expect(result.endY).toBeLessThanOrEqual(GRID_BOUNDARY);
      expect(result.endX - result.startX).toBe(gridSize);
      expect(result.endY - result.startY).toBe(gridSize);
    });
  });
});
