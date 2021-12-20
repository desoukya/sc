const main = require('./main');
const mockCountryApiStub = require('./country/country.api.stub.json');
const mockWeatherApiStub = require('./weather/weather.api.stub.json');

// Mocks weather service once for all tests in this file
jest.mock('./weather/weather.service', () => ({
  getWeather: jest.fn((location) => mockWeatherApiStub),
}));

// Mocks country service once for all tests in this file
jest.mock('./country/country.service', () => ({
  getCountryInfo: jest.fn(),
}));
// Import the mocked getCountryInfo function so we can perform
// separate assertions on it
const { getCountryInfo } = require('./country/country.service');

beforeEach(() => {
  // Resetting all mocks will remove both weather/country services
  // stubs. However, although this beforeEach() block, we are re-setting
  // the country mock each time, the weather mock is never re-set which
  // will ultimately break the tests.
  // jest.resetAllMocks();
  getCountryInfo.mockImplementation((location) => mockCountryApiStub);
});

afterEach(() => {
  process.argv = [];
});

describe('Test Main', () => {
  test('Test Expected Response', async () => {
    // mock the arguments provided
    process.argv.push('Istanbul', 'TR');
    const results = await main();
    expect(results).toEqual({ ...mockWeatherApiStub.data, ...mockCountryApiStub.data });
    expect(getCountryInfo).toHaveBeenCalled();
  });

  test('Test Wrong Arguments', async () => {
    // mock the arguments provided
    process.argv.push('Istanbul');
    await expect(main())
    .rejects
    .toThrow('Expected city & country code arguments');
  });
});
