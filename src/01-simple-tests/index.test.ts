import { simpleCalculator, Action } from './index';

// VARIANT 1 (simple)
// ---------------------------------

// It's a pity that this type cannot be imported from the 'index.ts' file.
type RawCalculatorInput = {
  a: unknown;
  b: unknown;
  action: unknown;
};

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input: RawCalculatorInput = {
      a: 1,
      b: 2,
      action: Action.Add,
    };
    const result = simpleCalculator(input);
    expect(result).toBe(3);
  });

  test('should subtract two numbers', () => {
    const input: RawCalculatorInput = {
      a: 9,
      b: 5,
      action: Action.Subtract,
    };
    const result = simpleCalculator(input);
    expect(result).toBe(4);
  });

  test('should multiply two numbers', () => {
    const input: RawCalculatorInput = {
      a: 2,
      b: 2,
      action: Action.Multiply,
    };
    const result = simpleCalculator(input);
    expect(result).toBe(4);
  });

  test('should divide two numbers', () => {
    const input: RawCalculatorInput = {
      a: 9,
      b: 3,
      action: Action.Divide,
    };
    const result = simpleCalculator(input);
    expect(result).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    const input: RawCalculatorInput = {
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    };
    const result = simpleCalculator(input);
    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const input: RawCalculatorInput = {
      a: 1,
      b: 3,
      action: 'invalid',
    };
    const result = simpleCalculator(input);
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const input: RawCalculatorInput = {
      a: 'invalid',
      b: 1,
      action: Action.Add,
    };
    const result = simpleCalculator(input);
    expect(result).toBeNull();
  });
});
