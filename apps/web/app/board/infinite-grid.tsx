'use client';

import { useCallback, useEffect, useState } from 'react';

const GRID_SIZE = 10; // Number of cells visible in each direction
const CELL_SIZE = 50; // Size of each cell in pixels

export const InfiniteGameGrid: React.FC = () => {
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const getCellContent = useCallback((x, y) => {
    // This function would return the content for a cell at coordinates (x, y)
    // For now, we'll just return the coordinates as a string
    return `(${x},${y})`;
  }, []);

  const handleMouseDown = e => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = useCallback(
    e => {
      if (!isDragging) return;

      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;

      if (Math.abs(dx) > CELL_SIZE || Math.abs(dy) > CELL_SIZE) {
        setCenter(prev => ({
          x: prev.x - Math.round(dx / CELL_SIZE),
          y: prev.y - Math.round(dy / CELL_SIZE),
        }));
        setDragStart({ x: e.clientX, y: e.clientY });
      }
    },
    [isDragging, dragStart],
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove]);

  const renderGrid = () => {
    const cells = [];
    for (let y = center.y - GRID_SIZE; y <= center.y + GRID_SIZE; y++) {
      for (let x = center.x - GRID_SIZE; x <= center.x + GRID_SIZE; x++) {
        cells.push(
          <div
            key={`${x},${y}`}
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              border: '1px solid #ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
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
    <div
      onMouseDown={handleMouseDown}
      style={{
        width: CELL_SIZE * (GRID_SIZE * 2 + 1),
        height: CELL_SIZE * (GRID_SIZE * 2 + 1),
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <Grid.Container
        gap={0}
        style={{
          width: CELL_SIZE * (GRID_SIZE * 2 + 1),
          height: CELL_SIZE * (GRID_SIZE * 2 + 1),
        }}
      >
        {renderGrid()}
      </Grid.Container>
    </div>
  );
};
