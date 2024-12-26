import type { Character } from '../../stats';
import { CELL_TYPE_CHARACTER } from '../cell';
import { initGameGrid } from '../game-grid';
import type { GameState } from '../game-state';
import { isMoveValid } from '../validation';
import placeCharacter from './place-character';

jest.mock('../validation', () => ({
  isMoveValid: jest.fn(),
}));

describe('placeCharacter', () => {
  const endTurn = jest.fn();

  let mockGameState: GameState;
  let mockCharacter: Character;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let boardGameIoContext: any;

  beforeEach(() => {
    jest.resetAllMocks();

    mockCharacter = {
      name: 'TestCharacter',
      race: 'Human',
    } as unknown as Character;

    mockGameState = {
      grid: initGameGrid(),
      team: [mockCharacter],
    } as unknown as GameState;

    boardGameIoContext = { G: mockGameState, events: { endTurn } };
  });

  it('places character when move is valid', () => {
    const x = 5;
    const y = 5;
    (isMoveValid as jest.Mock).mockReturnValue(true);

    // @ts-expect-error - type is not callable
    placeCharacter(boardGameIoContext, mockCharacter, x, y);

    expect(mockGameState.grid.cells[y]![x]!.content).toEqual({
      type: CELL_TYPE_CHARACTER,
      characterIndex: 0,
    });
    expect(isMoveValid).toHaveBeenCalledWith(mockGameState.grid, mockCharacter, x, y);
    expect(endTurn).toHaveBeenCalled();
  });

  it('does not place character when move is invalid', () => {
    const x = 5;
    const y = 5;
    (isMoveValid as jest.Mock).mockReturnValue(false);
    const originalCell = { ...mockGameState.grid.cells[y]![x]! };

    // @ts-expect-error - type is not callable
    placeCharacter(boardGameIoContext, mockCharacter, x, y);

    expect(mockGameState.grid.cells[y]![x]!).toEqual(originalCell);
    expect(isMoveValid).toHaveBeenCalledWith(mockGameState.grid, mockCharacter, x, y);
    expect(endTurn).not.toHaveBeenCalled();
  });

  it('finds correct character index in team array', () => {
    const x = 5;
    const y = 5;
    const secondCharacter = {
      name: 'SecondCharacter',
      race: 'Elf',
    } as unknown as Character;
    mockGameState.team.push(secondCharacter);
    (isMoveValid as jest.Mock).mockReturnValue(true);

    // @ts-expect-error - type is not callable
    placeCharacter(boardGameIoContext, secondCharacter, x, y);

    expect(mockGameState.grid.cells[y]![x]!.content).toEqual({
      type: CELL_TYPE_CHARACTER,
      characterIndex: 1,
    });
    expect(endTurn).toHaveBeenCalled();
  });

  it('handles character not found in team', () => {
    const x = 0;
    const y = 0;
    const unknownCharacter = {
      name: 'UnknownCharacter',
      race: 'Unknown',
    } as unknown as Character;
    (isMoveValid as jest.Mock).mockReturnValue(true);

    // @ts-expect-error - type is not callable
    placeCharacter(boardGameIoContext, unknownCharacter, x, y);

    expect(mockGameState.grid.cells[y]![x]!.content).toBeUndefined();
    expect(endTurn).not.toHaveBeenCalled();
  });

  it('handles edge of grid placement', () => {
    const x = 11;
    const y = 11;
    (isMoveValid as jest.Mock).mockReturnValue(true);

    // @ts-expect-error - type is not callable
    placeCharacter(boardGameIoContext, mockCharacter, x, y);

    expect(mockGameState.grid.cells[y]![x]!.content).toEqual({
      type: CELL_TYPE_CHARACTER,
      characterIndex: 0,
    });
    expect(endTurn).toHaveBeenCalled();
  });
});
