import { CELL_TYPE_CHARACTER, CELL_TYPE_CORE, Character, GameGrid } from '@repo/core';

import type { GridInformation } from '@/game/board/grid-information';

import { CharacterCell, CoreCell, EmptyCell } from '../cell-representations';

export interface CellViewModel {
  x: number;
  y: number;
  draw: () => React.ReactNode;
}

export class GameViewModelMapper {
  toViewModel = (grid: GameGrid, gridInformation: GridInformation, team: Character[]): CellViewModel[] => {
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
              const cellViewModel: CellViewModel = { x, y, draw: () => undefined };
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              if (cell.content!.characterIndex === undefined || team[cell.content!.characterIndex] === undefined) {
                cellViewModel.draw = () => <EmptyCell cell={cell} key={key} />;
              } else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                cellViewModel.draw = () => <CharacterCell cell={cell} key={key} character={team[cell.content!.characterIndex!]!} />;
              }

              visibleCells.push(cellViewModel);
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
