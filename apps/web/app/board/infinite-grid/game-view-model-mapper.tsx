import { CELL_TYPE_CHARACTER, CELL_TYPE_CORE, GameGrid } from '@repo/core';

import { CharacterCell, CoreCell, EmptyCell } from '../cell-representations';
import { GridInformation } from './calculate-grid-information';

export interface CellViewModel {
  x: number;
  y: number;
  draw: () => React.ReactNode;
}

export class GameViewModelMapper {
  toViewModel = (grid: GameGrid, gridInformation: GridInformation): CellViewModel[] => {
    const { startX, endX, startY, endY } = gridInformation;
    const gridBoundary = grid.cells.length;

    const visibleCells: CellViewModel[] = [];
    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        // Only render cells within the boundary
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (x >= 0 && x < gridBoundary && y >= 0 && y < gridBoundary && !!grid.cells[y] && !!grid.cells[y]![x]) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const cell = grid.cells[y]![x]!;
          const key = `${x},${y}`;

          if (!cell.content) {
            visibleCells.push({
              x,
              y,
              draw: () => <EmptyCell cell={cell} key={key} />,
            });
            continue;
          }

          switch (cell.content.type) {
            case CELL_TYPE_CHARACTER: {
              visibleCells.push({
                x,
                y,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                draw: () => <CharacterCell cell={cell} key={key} character={cell.content!.character!} />,
              });
              break;
            }
            case CELL_TYPE_CORE: {
              visibleCells.push({
                x,
                y,
                draw: () => <CoreCell cell={cell} key={key} />,
              });
              break;
            }
          }
        }
      }
    }

    return visibleCells;
  };
}
