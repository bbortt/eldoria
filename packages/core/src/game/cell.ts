export type CellContentType = 'cell:character' | 'cell:core';

export const CELL_TYPE_CHARACTER: CellContentType = 'cell:character';
export const CELL_TYPE_CORE: CellContentType = 'cell:core';

export interface CellContent {
  type: CellContentType;
  characterIndex?: number;
}

export interface Cell {
  x: number;
  y: number;
  content?: CellContent;
}
