import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = getRandomNumber(0, 1000);
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(getRandomNumber(0, 100));
    expect(() => account.withdraw(getRandomNumber(101, 200))).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(getRandomNumber(0, 1000));
    const account2 = getBankAccount(0);
    expect(() =>
      account1.transfer(getRandomNumber(1001, 2000), account2),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);
    expect(() => account.transfer(getRandomNumber(0, 100), account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const initialBalance = getRandomNumber(0, 1000);
    const depositValue = getRandomNumber(0, 500);
    const account = getBankAccount(initialBalance);
    account.deposit(depositValue);
    expect(account.getBalance()).toBe(initialBalance + depositValue);
  });

  test('should withdraw money', () => {
    const initialBalance = getRandomNumber(0, 1000);
    const withdrawValue = getRandomNumber(0, initialBalance);
    const account = getBankAccount(initialBalance);
    account.withdraw(withdrawValue);
    expect(account.getBalance()).toBe(initialBalance - withdrawValue);
  });

  test('should transfer money', () => {
    const initialBalance1 = getRandomNumber(0, 1000);
    const initialBalance2 = getRandomNumber(0, 1000);
    const transferValue = getRandomNumber(0, initialBalance1);
    const account1 = getBankAccount(initialBalance1);
    const account2 = getBankAccount(initialBalance2);
    account1.transfer(transferValue, account2);
    expect(account1.getBalance()).toBe(initialBalance1 - transferValue);
    expect(account2.getBalance()).toBe(initialBalance2 + transferValue);
  });

  // WITHOUT MOCK:
  // ------------------------------------------------------------------------------------------
  /*   
  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    const startTime = Date.now();
    let balance: null | number = null;
    while (Date.now() - startTime < 3000) {
      balance = await account.fetchBalance();
      if (balance !== null) break;
    }
    if (balance !== null) expect(typeof balance).toBe('number');
  }); 
  */

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    const randomNumber = getRandomNumber(0, 100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(randomNumber);
    const balance = await account.fetchBalance();
    expect(balance).toBe(randomNumber);
    expect(typeof balance).toBe('number');
  });

  // WITHOUT MOCK:
  // ------------------------------------------------------------------------------------------
  /*
  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = getRandomNumber(101, 200);
    const account = getBankAccount(initialBalance);
    const startTime = Date.now();
    let errors;
    while (Date.now() - startTime < 3000) {
      try {
        await account.synchronizeBalance();
        errors = false;
        break;
      } catch {
        errors = true;
      }
    }
    if (!errors) expect(account.getBalance()).not.toBe(initialBalance);
  }); 
  */

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = getRandomNumber(101, 200);
    const newBalance = getRandomNumber(0, 100);
    const account = getBankAccount(initialBalance);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(newBalance);
    await account.synchronizeBalance();
    expect(account.fetchBalance).toHaveBeenCalled();
    expect(account.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
