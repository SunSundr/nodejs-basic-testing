import { random } from 'lodash';
import { simpleCalculator, Action } from './index';

// VARIANT 2 (with random)
// ---------------------------------

// It's a pity that this type cannot be imported from the 'index.ts' file.
type RawCalculatorInput = {
  a: unknown;
  b: unknown;
  action: unknown;
};

const getRandomNumber = (min: number, max: number): number => {
  return random(min, max, false);
};

const getRandomInvalid = (): unknown => {
  const invalidValues = [
    'string',
    null,
    undefined,
    true,
    false,
    [],
    {},
    () => NaN,
    Symbol('sym'),
    // NaN,
  ];
  return invalidValues[Math.floor(Math.random() * invalidValues.length)];
};

const getRandomInput = (
  action: unknown,
  invalidArg = false,
): RawCalculatorInput => {
  return {
    a: invalidArg ? getRandomInvalid() : getRandomNumber(-100, 100),
    b: invalidArg ? getRandomInvalid() : getRandomNumber(-100, 100),
    action: action,
  };
};

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = getRandomInput(Action.Add);
    const result = simpleCalculator(input);
    expect(result).toBe(Number(input.a) + Number(input.b));
  });

  test('should subtract two numbers', () => {
    const input = getRandomInput(Action.Subtract);
    const result = simpleCalculator(input);
    expect(result).toBe(Number(input.a) - Number(input.b));
  });

  test('should multiply two numbers', () => {
    const input = getRandomInput(Action.Multiply);
    const result = simpleCalculator(input);
    expect(result).toBe(Number(input.a) * Number(input.b));
  });

  test('should divide two numbers', () => {
    const input = getRandomInput(Action.Divide);
    const result = simpleCalculator(input);
    expect(result).toBe(Number(input.a) / Number(input.b));
  });

  test('should exponentiate two numbers', () => {
    const input = getRandomInput(Action.Exponentiate);
    const result = simpleCalculator(input);
    expect(result).toBe(Number(input.a) ** Number(input.b));
  });

  test('should return null for invalid action', () => {
    const input = getRandomInput(getRandomInvalid());
    const result = simpleCalculator(input);
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const input = getRandomInput(Action.Add, true);
    const result = simpleCalculator(input);
    expect(result).toBeNull();
  });
});
