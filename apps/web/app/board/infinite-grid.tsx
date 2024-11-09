'use client';

import { useCallback, useEffect, useState, WheelEvent } from 'react';

import type { Cell, GameGrid } from '@repo/core';

import styles from './infinite-grid.module.css';

const GAME_GRID = 'game-grid';

const MIN_GRID_SIZE = 2;
const MAX_GRID_SIZE = 12;

export interface InfiniteGameGridProps {
  grid: GameGrid;
}

export const InfiniteGameGrid: React.FC<InfiniteGameGridProps> = ({ grid }) => {
  const gridBoundary = grid.cells.length;

  const [center, setCenter] = useState({ x: 32, y: 32 }); // Start centered in the 64x64 grid
  const [gridSize, setGridSize] = useState(10);
  const [gridInformation, setGridInformation] = useState({ startX: 0, endX: 10, startY: 0, endY: 10 });
  const [isDragging] = useState(false);

  const preventDefaultZoom = (wheelEvent: WheelEvent<HTMLDivElement>): void => {
    wheelEvent.preventDefault();
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    document.getElementById(GAME_GRID)?.addEventListener('wheel', preventDefaultZoom as any, { passive: false });
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      document.getElementById(GAME_GRID)?.removeEventListener('wheel', preventDefaultZoom as any);
    };
  }, [preventDefaultZoom]);

  useEffect(() => {
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

    setGridInformation({ startX, endX, startY, endY });
  }, [center, gridSize]);

  const getCellContent = useCallback((cell: Cell): string => {
    return `(${cell.x},${cell.y})`;
  }, []);

  const handleWheel = (wheelEvent: WheelEvent<HTMLDivElement>): void => {
    if (wheelEvent.ctrlKey) {
      wheelEvent.preventDefault();

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

      // Update grid size
      const zoomDelta = wheelEvent.deltaY > 0 ? 1 : -1;
      const newGridSize = Math.min(Math.max(gridSize + zoomDelta, MIN_GRID_SIZE), MAX_GRID_SIZE);

      if (newGridSize !== gridSize) {
        setGridSize(newGridSize);

        // Calculate new center position to keep cursor over the same cell
        let newCenterX = Math.round(globalX - (cursorX - 0.5) * newGridSize);
        let newCenterY = Math.round(globalY - (cursorY - 0.5) * newGridSize);

        // Clamp center position to ensure grid stays within bounds
        newCenterX = Math.min(Math.max(Math.floor(newGridSize / 2), newCenterX), gridBoundary - Math.ceil(newGridSize / 2));
        newCenterY = Math.min(Math.max(Math.floor(newGridSize / 2), newCenterY), gridBoundary - Math.ceil(newGridSize / 2));

        setCenter({ x: newCenterX, y: newCenterY });
      }
    }
  };

  const renderGrid = () => {
    const { startX, endX, startY, endY } = gridInformation;

    const visibleCells = [];
    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        // Only render cells within the boundary
        if (x >= 0 && x < gridBoundary && y >= 0 && y < gridBoundary) {
          const cell = grid.cells[x]![y]!;
          visibleCells.push(
            <div
              key={`${cell.x},${cell.y}`}
              style={{
                border: '1px solid',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {getCellContent(cell)}
            </div>,
          );
        }
      }
    }

    return visibleCells;
  };

  return (
    <div className={styles.gameGridContainer}>
      <div
        id={GAME_GRID}
        className={`${styles.gameGrid} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onWheel={handleWheel}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {renderGrid()}
      </div>
    </div>
  );
};
