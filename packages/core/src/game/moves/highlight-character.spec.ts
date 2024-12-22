import highlightCharacter from './highlight-character';

describe('highlightCharacter', () => {
  it('sets the selected character index', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockGameState: any = {
      G: {
        selectedCharacterIndex: -1,
      },
    };
    const characterIndex = 2;

    // @ts-expect-error - type is not callable
    highlightCharacter(mockGameState, characterIndex);

    expect(mockGameState.G.selectedCharacterIndex).toBe(characterIndex);
  });
});
