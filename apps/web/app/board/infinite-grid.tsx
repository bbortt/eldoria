'use client';

import { useCallback, useEffect, useState, WheelEvent } from 'react';

import styles from './infinite-grid.module.css';

const GAME_GRID = 'game-grid';

const MIN_GRID_SIZE = 2;
const MAX_GRID_SIZE = 12;

export const InfiniteGameGrid: React.FC = () => {
  const [center, setCenter] = useState({ x: 5, y: 5 });
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
    setGridInformation({
      startX: center.x - Math.floor(gridSize / 2),
      endX: center.x + Math.ceil(gridSize / 2),
      startY: center.y - Math.floor(gridSize / 2),
      endY: center.y + Math.ceil(gridSize / 2),
    });
  }, [center, gridSize]);

  const getCellContent = useCallback((x: number, y: number): string => {
    return `(${x},${y})`;
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
        const newCenterX = Math.round(globalX - (cursorX - 0.5) * newGridSize);
        const newCenterY = Math.round(globalY - (cursorY - 0.5) * newGridSize);

        setCenter({ x: newCenterX, y: newCenterY });
      }
    }
  };

  const renderGrid = () => {
    const cells = [];
    const { startX, endX, startY, endY } = gridInformation;

    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        cells.push(
          <div
            key={`${x},${y}`}
            style={{
              border: '1px solid',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {getCellContent(x, y)}
          </div>,
        );
      }
    }
    return cells;
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
