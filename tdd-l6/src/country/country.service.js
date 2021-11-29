const api = require('axios');

const COUNTRY_INFO = 'https://restcountries.com/v2/alpha?codes=';

function getCountryInfo(location) {
  return api.get(`${COUNTRY_INFO}${location.countryCode}`);
}

module.exports = {
  getCountryInfo,
};
