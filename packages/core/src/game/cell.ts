export type CellContentType = 'cell:core' | 'ASDF';
export const CELL_TYPE_CORE: CellContentType = 'cell:core';

export interface CellContent {
  type: CellContentType;
}

export interface Cell {
  x: number;
  y: number;
  content: CellContent | undefined;
}
