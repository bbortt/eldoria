import { BotAction, MakeMove, makeMove } from './make-move';

describe('makeMove', () => {
  it('should create a MakeMove action with type only', () => {
    const result = makeMove('testMove');

    const expected: MakeMove = {
      type: 'MAKE_MOVE',
      payload: {
        type: 'testMove',
        args: undefined,
        playerID: undefined,
        credentials: undefined,
      },
    };

    expect(result).toEqual(expected);
  });

  it('should create a MakeMove action with type and args', () => {
    // @ts-expect-error TS2345: Argument of type { test: string; } is not assignable to parameter of type never
    const result = makeMove('testMove', { test: 'value' });

    const expected: MakeMove = {
      type: 'MAKE_MOVE',
      payload: {
        type: 'testMove',
        args: { test: 'value' },
        playerID: undefined,
        credentials: undefined,
      },
    };

    expect(result).toEqual(expected);
  });

  it('should create a MakeMove action with type, args, and playerID', () => {
    // @ts-expect-error TS2345: Argument of type { test: string; } is not assignable to parameter of type never
    const result = makeMove('testMove', { test: 'value' }, 'player1');

    const expected: MakeMove = {
      type: 'MAKE_MOVE',
      payload: {
        type: 'testMove',
        args: { test: 'value' },
        playerID: 'player1',
        credentials: undefined,
      },
    };

    expect(result).toEqual(expected);
  });

  it('should create a MakeMove action with all parameters', () => {
    // @ts-expect-error TS2345: Argument of type { test: string; } is not assignable to parameter of type never
    const result = makeMove('testMove', { test: 'value' }, 'player1', 'cred123');

    const expected: MakeMove = {
      type: 'MAKE_MOVE',
      payload: {
        type: 'testMove',
        args: { test: 'value' },
        playerID: 'player1',
        credentials: 'cred123',
      },
    };

    expect(result).toEqual(expected);
  });

  it('should handle null playerID', () => {
    // @ts-expect-error TS2345: Argument of type { test: string; } is not assignable to parameter of type never
    const result = makeMove('testMove', { test: 'value' }, null);

    const expected: MakeMove = {
      type: 'MAKE_MOVE',
      payload: {
        type: 'testMove',
        args: { test: 'value' },
        playerID: null,
        credentials: undefined,
      },
    };

    expect(result).toEqual(expected);
  });

  it('should conform to BotAction type', () => {
    const result = makeMove('testMove');
    const botAction: BotAction = result; // This should compile without type errors

    expect(botAction.type).toBe('MAKE_MOVE');
    expect(botAction.payload.type).toBe('testMove');
  });

  it('should maintain correct types for all properties', () => {
    // @ts-expect-error TS2345: Argument of type { test: string; } is not assignable to parameter of type never
    const result = makeMove('testMove', { test: 'value' }, 'player1', 'cred123');

    expect(typeof result.type).toBe('string');
    expect(typeof result.payload.type).toBe('string');
    expect(typeof result.payload.credentials).toBe('string');
    expect(typeof result.payload.playerID).toBe('string');
  });
});
