jest.mock("axios");
const axios = require('axios');
const weatherService = require('./weather.service');
const mockWeatherApiStub = require('./weather.api.stub.json');

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

describe('Test Weather API', () => {
  test('Test Weather', async () => {
    axios.get.mockResolvedValueOnce(mockWeatherApiStub);
    const location = { city: 'Istanbul', weatherCode: 'TR' };
    const results = await weatherService.getWeather(location);
    expect(results).toEqual(mockWeatherApiStub);
  });
});
