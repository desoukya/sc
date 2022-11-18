const request = require('supertest');
const main = require('./main');
const mockCountryApiStub = require('./country/country.api.stub.json');
const mockWeatherApiStub = require('./weather/weather.api.stub.json');

const BASE_URL = 'http://localhost:3000'

// Mocks the weather service for all tests in this file
jest.mock('./weather/weather.service', () => ({
  getWeather: jest.fn((location) => mockWeatherApiStub.data),
}));

// Mocks the country service for all tests in this file
jest.mock('./country/country.service', () => ({
  getCountryInfo: jest.fn(),
}));

// Import the mocked methods so we can call them and assert the mock response is returned
const { getCountryInfo } = require('./country/country.service');
const { getWeather } = require('./weather/weather.service');

beforeEach(() => {
  getCountryInfo.mockImplementation((location) => mockCountryApiStub.data[0]);
});

describe('Main', () => {
  // Weather Endpoint
  test('Expected Weather Response', async () => {
    const response = await request(BASE_URL).get('/weather?city=istanbul')
    expect(response.body).toEqual(mockWeatherApiStub.data);
    expect(getWeather).toHaveBeenCalled();
  });
  test('Incorrect Weather Arguments', async () => {
    const response = await request(BASE_URL).get('/weather?state=istanbul')
    expect(response.error.text).toContain("Expected city argument");
  });
  test('No Weather Response', async () => {
    getWeather.mockImplementationOnce((location) => null);
    const response = await request(BASE_URL).get('/weather?city=Cairo')
    expect(response.error.text).toContain("Could not process request");
  });  

  // Country Info Endpoint
  test('Expected Country Info Response', async () => {
    const response = await request(BASE_URL).get('/info?country=TR')
    expect(response.body).toEqual(mockCountryApiStub.data[0]);
    expect(getCountryInfo).toHaveBeenCalled();
  });
  test('Incorrect Country Arguments', async () => {
    const response = await request(BASE_URL).get('/info?code=EG')
    expect(response.error.text).toContain("Expected country code arguments");
  });  
  test('Incorrect Country Code Length', async () => {
    const response = await request(BASE_URL).get('/info?country=ZZZ')
    expect(response.error.text).toContain("Country must be an ISO alpha-2 code");
  });
  test('No Country Info Response', async () => {
    getCountryInfo.mockImplementation((location) => null);
    const response = await request(BASE_URL).get('/info?country=EG')
    expect(response.error.text).toContain("Could not process request");
  });
  
});
