
const mainService = require('./main.service');
const countryService = require('./country/country.service');
const weatherService = require('./weather/weather.service');

const main = async () => {
  const args = process.argv.slice(2); // [CountryCode, City]
  // TODO
  return null;
};

// main().catch((error) => console.log(error.message));

module.exports = main;
