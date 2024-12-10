export interface GridInformation {
  startX: number;
  endX: number;
  startY: number;
  endY: number;
}

export const calculateGridInformation = (center: { x: number; y: number }, gridSize: number, gridBoundary: number): GridInformation => {
  // Calculate initial boundaries
  let startX = center.x - Math.floor(gridSize / 2);
  let endX = center.x + Math.ceil(gridSize / 2);
  let startY = center.y - Math.floor(gridSize / 2);
  let endY = center.y + Math.ceil(gridSize / 2);

  // Clamp boundaries to stay within 0-63
  if (startX < 0) {
    endX -= startX; // Shift the window right
    startX = 0;
  }
  if (endX > gridBoundary) {
    startX -= endX - gridBoundary; // Shift the window left
    endX = gridBoundary;
  }
  if (startY < 0) {
    endY -= startY; // Shift the window down
    startY = 0;
  }
  if (endY > gridBoundary) {
    startY -= endY - gridBoundary; // Shift the window up
    endY = gridBoundary;
  }

  return { startX, endX, startY, endY };
};
