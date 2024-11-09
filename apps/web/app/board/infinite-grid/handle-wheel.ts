import { WheelEvent } from 'react';

import type { GridInformation } from './calculate-grid-information';
import { GAME_GRID } from './index';

export const handleWheel = (
  wheelEvent: WheelEvent<HTMLDivElement>,
  gridSize: number,
  gridInformation: GridInformation,
  gridBoundary: number,
  minGridSize: number,
  maxGridSize: number,
): { newGridSize: number; newCenterX: number; newCenterY: number } | undefined => {
  if (wheelEvent.ctrlKey) {
    wheelEvent.preventDefault();

    // Handle event only when grid size changes
    const zoomDelta = wheelEvent.deltaY > 0 ? 1 : -1;
    const newGridSize = Math.min(Math.max(gridSize + zoomDelta, minGridSize), maxGridSize);
    if (newGridSize === gridSize) return;

    const gridElement = document.getElementById(GAME_GRID);
    if (!gridElement) return;

    // Get cursor position relative to the grid
    const rect = gridElement.getBoundingClientRect();
    const cursorX = (wheelEvent.clientX - rect.left) / rect.width;
    const cursorY = (wheelEvent.clientY - rect.top) / rect.height;

    // Calculate current cell under cursor
    const cellX = Math.floor(cursorX * gridSize);
    const cellY = Math.floor(cursorY * gridSize);

    // Calculate current cell's global coordinates
    const globalX = gridInformation.startX + cellX;
    const globalY = gridInformation.startY + cellY;

    // Calculate new center position to keep cursor over the same cell
    let newCenterX = Math.round(globalX - (cursorX - 0.5) * newGridSize);
    let newCenterY = Math.round(globalY - (cursorY - 0.5) * newGridSize);

    // Clamp center position to ensure grid stays within bounds
    newCenterX = Math.min(Math.max(Math.floor(newGridSize / 2), newCenterX), gridBoundary - Math.ceil(newGridSize / 2));
    newCenterY = Math.min(Math.max(Math.floor(newGridSize / 2), newCenterY), gridBoundary - Math.ceil(newGridSize / 2));

    return { newGridSize, newCenterX, newCenterY };
  }
};
