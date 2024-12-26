'use client';

import type { GameGrid } from '@repo/core';
import { useEffect, useMemo, useState, WheelEvent } from 'react';

import { GridInformation } from '@/game/board/grid-information';
import { handleWheel } from '@/game/board/handle-wheel';
import { GAME_GRID_ELEMENT_ID } from '@/game/constants';

import { GameViewModelMapper } from './game-view-model-mapper';
import styles from './index.module.css';
import { preventDefaultZoom } from './prevent-default-zoom';

const MIN_GRID_SIZE = 4;
const MAX_GRID_SIZE = 12;

export interface InfiniteGameGridProps {
  grid: GameGrid;
  gameViewModelMapper: GameViewModelMapper;
}

export const InfiniteGameGrid: React.FC<InfiniteGameGridProps> = ({ grid, gameViewModelMapper }) => {
  const gridBoundary = grid.cells.length;

  // We track the start position (top-left corner)
  const [gridSize, setGridSize] = useState(MIN_GRID_SIZE);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  // Calculate grid information based on start position and size
  const [gridInformation, setGridInformation] = useState({
    startX: startPosition.x,
    endX: gridSize,
    startY: startPosition.y,
    endY: gridSize,
  } as GridInformation);

  const [isDragging] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    document.getElementById(GAME_GRID_ELEMENT_ID)?.addEventListener('wheel', preventDefaultZoom as any, { passive: false });
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      document.getElementById(GAME_GRID_ELEMENT_ID)?.removeEventListener('wheel', preventDefaultZoom as any);
    };
  }, []);

  // Update grid information whenever start position or size changes
  useEffect(
    () =>
      setGridInformation({
        startX: startPosition.x,
        endX: startPosition.x + gridSize,
        startY: startPosition.y,
        endY: startPosition.y + gridSize,
      }),
    [startPosition, gridSize],
  );

  const cellViewModels = useMemo(() => gameViewModelMapper.toViewModel(gridInformation), [gameViewModelMapper, gridInformation]);

  const handleGridWheel = (wheelEvent: WheelEvent<HTMLDivElement>): void => {
    const zoomInfo = handleWheel(wheelEvent, gridSize, gridInformation, gridBoundary, MIN_GRID_SIZE, MAX_GRID_SIZE);
    if (zoomInfo) {
      setGridSize(zoomInfo.newGridSize);
      setStartPosition({ x: zoomInfo.startX, y: zoomInfo.startY });
    }
  };

  // Initial position should be centered in the grid
  useEffect(() => {
    const initialGridSize = MAX_GRID_SIZE;
    const initialX = Math.floor((gridBoundary - initialGridSize) / 2);
    const initialY = Math.floor((gridBoundary - initialGridSize) / 2);
    setStartPosition({ x: initialX, y: initialY });
    setGridSize(initialGridSize);
  }, [gridBoundary]);

  return (
    <div className={styles.gameGridContainer}>
      <div
        id={GAME_GRID_ELEMENT_ID}
        className={`${styles.gameGrid} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onWheel={handleGridWheel}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {cellViewModels.map(vm => vm.draw())}
      </div>
    </div>
  );
};

export default InfiniteGameGrid;
