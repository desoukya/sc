const api = require('axios');

const WEATHER_API = 'https://goweather.herokuapp.com/weather';

async function getWeather(city) {
  return api.get(`${WEATHER_API}/${city}`)
    .then(({ data }) => data)
    .catch((e) => null);
}

module.exports = {
  getWeather
};