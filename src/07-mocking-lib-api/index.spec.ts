import axios from 'axios';
import { throttledGetDataFromApi } from './index';

// VARIANT 2 (with mock `throttle`)
// ---------------------------------

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  let mockAxiosInstance: jest.Mocked<typeof axios>;

  beforeEach(() => {
    mockAxiosInstance = axios as jest.Mocked<typeof axios>;
    mockAxiosInstance.create.mockReturnThis();
    mockAxiosInstance.get.mockResolvedValue({ data: 'mock data' });
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/test');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/test';
    await throttledGetDataFromApi(relativePath);
    expect(mockAxiosInstance.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const data = await throttledGetDataFromApi('/test');
    expect(data).toBe('mock data');
  });
});
