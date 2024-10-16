import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const input = [1, 2, 3, 4, 5];
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const expected = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: {
              value: 5,
              next: {
                value: null,
                next: null,
              },
            },
          },
        },
      },
    };
    const result = generateLinkedList(input);
    expect(result).toStrictEqual(expected);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const result = generateLinkedList(input);
    expect(result).toMatchSnapshot();
  });
});
