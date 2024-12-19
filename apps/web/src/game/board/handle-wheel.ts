import { WheelEvent } from 'react';

import type { GridInformation } from '@/game/board/grid-information';
import { GAME_GRID_ELEMENT_ID } from '@/game/constants';

export const handleWheel = (
  wheelEvent: WheelEvent<HTMLDivElement>,
  gridSize: number,
  gridInformation: GridInformation,
  gridBoundary: number,
  minGridSize: number,
  maxGridSize: number,
): { newGridSize: number; startX: number; startY: number } | undefined => {
  if (wheelEvent.ctrlKey) {
    wheelEvent.preventDefault();

    // Calculate new grid size
    const zoomDelta = wheelEvent.deltaY > 0 ? 1 : -1;
    const newGridSize = Math.min(Math.max(gridSize + zoomDelta, minGridSize), maxGridSize);
    if (newGridSize === gridSize) return;

    const gridElement = document.getElementById(GAME_GRID_ELEMENT_ID);
    if (!gridElement) return;

    // Get cursor position relative to the grid (0 to 1)
    const rect = gridElement.getBoundingClientRect();
    const cursorX = (wheelEvent.clientX - rect.left) / rect.width;
    const cursorY = (wheelEvent.clientY - rect.top) / rect.height;

    // Get the actual cell coordinate under the cursor
    const currentX = gridInformation.startX + cursorX * (gridInformation.endX - gridInformation.startX);
    const currentY = gridInformation.startY + cursorY * (gridInformation.endY - gridInformation.startY);

    // Calculate new start coordinates to keep cursor over the same cell
    let newStartX = currentX - cursorX * newGridSize;
    let newStartY = currentY - cursorY * newGridSize;

    // Clamp to grid boundaries
    if (newStartX + newGridSize > gridBoundary) {
      newStartX = gridBoundary - newGridSize;
    }
    if (newStartY + newGridSize > gridBoundary) {
      newStartY = gridBoundary - newGridSize;
    }
    if (newStartX < 0) {
      newStartX = 0;
    }
    if (newStartY < 0) {
      newStartY = 0;
    }

    return {
      newGridSize,
      startX: Math.round(newStartX),
      startY: Math.round(newStartY),
    };
  }
};
