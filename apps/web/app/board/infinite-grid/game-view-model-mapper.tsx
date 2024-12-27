import { CELL_TYPE_CHARACTER, CELL_TYPE_CORE, Character, GameGrid } from '@repo/core';

import type { GridInformation } from '@/game/board/grid-information';

import { CharacterCell, CoreCell, EmptyCell } from '../cell-representations';

export interface CellViewModel {
  x: number;
  y: number;
  draw: () => React.ReactNode;
}

export class GameViewModelMapper {
  constructor(
    private grid: GameGrid,
    private team: Character[],
    private highlightCharacter: (characterIndex: number | undefined) => void,
  ) {}

  toViewModel = (gridInformation: GridInformation): CellViewModel[] => {
    const { startX, endX, startY, endY } = gridInformation;
    const gridBoundary = this.grid.cells.length;

    const visibleCells: CellViewModel[] = [];
    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        // Only render cells within the boundary
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (x >= 0 && x < gridBoundary && y >= 0 && y < gridBoundary && !!this.grid.cells[y] && !!this.grid.cells[y]![x]) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const cell = this.grid.cells[y]![x]!;
          const key = `${x},${y}`;

          if (!cell.content) {
            visibleCells.push({
              x,
              y,
              draw: () => <EmptyCell cell={cell} unselectCharacter={() => this.highlightCharacter(undefined)} key={key} />,
            });
            continue;
          }

          switch (cell.content.type) {
            case CELL_TYPE_CHARACTER: {
              const cellViewModel: CellViewModel = { x, y, draw: () => undefined };
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              if (cell.content!.characterIndex === undefined || this.team[cell.content!.characterIndex] === undefined) {
                cellViewModel.draw = () => <EmptyCell cell={cell} unselectCharacter={() => this.highlightCharacter(undefined)} key={key} />;
              } else {
                cellViewModel.draw = () => {
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  const characterIndex = cell.content!.characterIndex!;

                  return (
                    <CharacterCell
                      cell={cell}
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      character={this.team[characterIndex]!}
                      highlightCharacter={() => this.highlightCharacter(characterIndex)}
                      key={key}
                    />
                  );
                };
              }

              visibleCells.push(cellViewModel);
              break;
            }
            case CELL_TYPE_CORE: {
              visibleCells.push({
                x,
                y,
                draw: () => <CoreCell cell={cell} unselectCharacter={() => this.highlightCharacter(undefined)} key={key} />,
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

export default GameViewModelMapper;
