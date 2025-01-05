# Basic testing

This repository contains examples of various test scenarios implemented using Jest.

The project was completed as part of the [RS School](https://rs.school/) [NodeJS 2024 Q3 course (Basic testing)](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/basic-testing/assignment.md).
© [AlreadyBored](https://github.com/AlreadyBored)

---

## Project Setup

1. **Clone the repository:**
```bash
git clone https://github.com/SunSundr/nodejs-basic-testing
```
2. **Navigate to the project directory:**
```bash
cd nodejs-basic-testing
```
3. **Install the dependencies:**
```bash
npm ci
```
---

## 1. Simple Tests

Unit tests for a `simpleCalculator` function that performs basic mathematical operations: addition, subtraction, division, multiplication, and exponentiation. Two variations are provided:

*   **VARIANT 1 (simple):** Tests using predefined values.
*   **VARIANT 2 (with random):** Each test run generates unique random values for greater coverage and robustness.

## 2. Table Tests

Tests for the `simpleCalculator` function, performing the same basic mathematical operations as in #1, but using a table-driven approach (data-driven testing) with the Jest API. This method facilitates concise and easily maintainable tests with varying inputs and expected outputs.

## 3. Error Handling & Async

Examples of testing functions that operate asynchronously and functions that throw or reject errors. Demonstrates how to test asynchronous behavior and error cases using Jest's API for promises and async/await.

## 4. Testing Class

An example of testing a class representing a bank account. The class implements various methods, some of which call other methods, some may result in errors, and some operations are asynchronous and use their own JS API.  This section shows how to test methods with internal dependencies, error conditions, and asynchronous operations in a class context.

## 5. Partial Mocking

Illustrates how to use Jest's API for partially mocking the contents of a module.  This is useful for isolating specific parts of a module and controlling their behavior during testing, without mocking the entire module.

## 6. Mocking Node.js API

Demonstrates how to test code that uses common Node.js APIs such as the `fs` module, `setTimeout`, and `setInterval`. The tests mock these APIs to ensure they do not interact with the real file system or rely on real time, making the tests fast and predictable.

## 7. Mocking Library API

Examples of testing a function that uses library APIs (specifically, `axios` and `lodash`). Two variations are provided:

*   **VARIANT 1 (with mock `throttle`):** Uses Jest mocks to control the behavior of the `throttle` function from lodash during the test.
*   **VARIANT 2 (with `useFakeTimers`):** Leverages Jest's `useFakeTimers` to manipulate the timer behavior, which is used internally by throttle API, allowing fine-grained control over time-sensitive asynchronous code.

## 8. Snapshot Testing

An example of using snapshot testing with Jest to capture and compare the output of a component or function. This is contrasted with traditional comparative testing, highlighting the strengths and use cases of snapshot testing for regression detection.

---

## Technical Details
 - For ease of testing, use pre-implemented npm-scripts in `package.json`.
 - Some tests are presented in two versions:
`*.test files` - original solution
`*.spec files` - alternative solution
