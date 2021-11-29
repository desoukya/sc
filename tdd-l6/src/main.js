
const mainService = require('./main.service');
const countryService = require('./country/country.service');
const weatherService = require('./weather/weather.service');

const main = async () => {
  // Get command line arguments
  const args = process.argv.slice(2);
  // Validate expected arguments were passed
  if (!args.length || (args && args.length !== 2)) {
    throw new Error('Expected city & country code arguments');
  }
  
  // Combine inputs into location object
  const location = {
    city: args[0],
    countryCode: args[1],
  };

  // Get data from APIs
  const weather = await weatherService.getWeather(location);
  const info = await countryService.getCountryInfo(location);

  // Return responses
  return { ...weather.data, ...info.data };
};

// main().catch((error) => console.log(error.message));

module.exports = main;
