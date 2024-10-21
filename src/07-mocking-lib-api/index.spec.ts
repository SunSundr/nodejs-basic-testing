import axios from 'axios';
import { throttledGetDataFromApi, THROTTLE_TIME } from './index';

// VARIANT 2 (with `useFakeTimers`)
// ---------------------------------

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  let mockAxiosInstance: jest.Mocked<typeof axios>;

  beforeEach(() => {
    mockAxiosInstance = axios as jest.Mocked<typeof axios>;
    mockAxiosInstance.create.mockReturnThis();
    mockAxiosInstance.get.mockResolvedValue({ data: 'mock data' });
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/test');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/test';
    jest.advanceTimersByTime(THROTTLE_TIME);
    await throttledGetDataFromApi(relativePath);
    expect(mockAxiosInstance.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    jest.advanceTimersByTime(THROTTLE_TIME);
    const data = await throttledGetDataFromApi('/test');
    expect(data).toBe('mock data');
  });

  // THROTTLE TEST:
  // ---------------------------------------------------------------------------
  /*   
    throttle options -> {
      leading: true,  // call immediately
      trailing: false // Do not call after throttling ends
    }); 
  */
  /*   
    test('should throttle function calls', async () => {
    const relativePath = '/test';
    await throttledGetDataFromApi(relativePath);
    expect(mockAxiosInstance.get).toHaveBeenCalledWith(relativePath);
    await throttledGetDataFromApi(relativePath);
    expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(THROTTLE_TIME);
    await throttledGetDataFromApi(relativePath);
    expect(mockAxiosInstance.get).toHaveBeenCalledTimes(2 + 1); // + 1 call after throttling ends
  }); 
  */
});
