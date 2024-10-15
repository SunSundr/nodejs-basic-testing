import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 3, b: 4, action: Action.Subtract, expected: -1 },
  { a: 5, b: 6, action: Action.Multiply, expected: 30 },
  { a: 7, b: 8, action: Action.Divide, expected: 0.875 },
  { a: 9, b: 10, action: Action.Exponentiate, expected: 3486784401 },
  { a: 11, b: 12, action: 'invalid', expected: null },
  { a: '13', b: 14, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  testCases.forEach(({ a, b, action, expected }) => {
    test(`should ${action} ${a} and ${b}`, () => {
      const input = { a, b, action };
      const result = simpleCalculator(input);
      expect(result).toBe(expected);
    });
  });
});
