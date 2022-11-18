const api = require('axios');

const COUNTRY_INFO = 'https://restcountries.com/v2/alpha';

async function getCountryInfo(countryCode) {
  return api.get(`${COUNTRY_INFO}?codes=${countryCode}`)
    .then(({ data }) => data[0])
    .catch((e) => null);
}

module.exports = {
  getCountryInfo,
};
