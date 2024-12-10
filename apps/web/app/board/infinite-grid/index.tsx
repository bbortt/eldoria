'use client';

import type { GameGrid } from '@repo/core';
import { useEffect, useMemo, useState, WheelEvent } from 'react';

import { calculateGridInformation, GridInformation } from './calculate-grid-information';
import { handleWheel } from './handle-wheel';
import styles from './index.module.css';
import { preventDefaultZoom } from './prevent-default-zoom';
import { renderGrid } from './render-grid';

export const GAME_GRID = 'game-grid';

const MIN_GRID_SIZE = 4;
const MAX_GRID_SIZE = 12;

export interface InfiniteGameGridProps {
  grid: GameGrid;
}

export const InfiniteGameGrid: React.FC<InfiniteGameGridProps> = ({ grid }) => {
  const gridBoundary = grid.cells.length;

  const initialCenter = useMemo(() => Math.floor(gridBoundary / 2), [gridBoundary]);
  const [center, setCenter] = useState({ x: initialCenter, y: initialCenter });

  const [gridSize, setGridSize] = useState(10);
  const [gridInformation, setGridInformation] = useState({ startX: 0, endX: 10, startY: 0, endY: 10 } as GridInformation);
  const [isDragging] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    document.getElementById(GAME_GRID)?.addEventListener('wheel', preventDefaultZoom as any, { passive: false });
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      document.getElementById(GAME_GRID)?.removeEventListener('wheel', preventDefaultZoom as any);
    };
  }, []);

  useEffect(() => setGridInformation(calculateGridInformation(center, gridSize, gridBoundary)), [center, gridSize, gridBoundary]);

  const adjustCenter = (wheelEvent: WheelEvent<HTMLDivElement>): void => {
    const centerInformation = handleWheel(wheelEvent, gridSize, gridInformation, gridBoundary, MIN_GRID_SIZE, MAX_GRID_SIZE);
    if (centerInformation) {
      setGridSize(centerInformation.newGridSize);
      setCenter({ x: centerInformation.newCenterX, y: centerInformation.newCenterY });
    }
  };

  return (
    <div className={styles.gameGridContainer}>
      <div
        id={GAME_GRID}
        className={`${styles.gameGrid} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onWheel={adjustCenter}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {renderGrid(gridInformation, grid)}
      </div>
    </div>
  );
};

export default InfiniteGameGrid;
