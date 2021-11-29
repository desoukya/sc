jest.mock("axios");
const axios = require('axios');
const countryService = require('./country.service');
const mockCountryApiStub = require('./country.api.stub.json');

jest.mock("axios");

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

describe('Test Country API', () => {
  test('Test Country', async () => {
    axios.get.mockResolvedValueOnce(mockCountryApiStub);
    const location = { city: 'Istanbul', countryCode: 'TR' };
    const results = await countryService.getCountryInfo(location);
    expect(results).toEqual(mockCountryApiStub);
  });
});
