const api = require('axios');

const WEATHER_API = 'https://goweather.herokuapp.com/weather/';

function getWeather(location) {
  return api.get(`${WEATHER_API}${location.city}`);
}

module.exports = {
  getWeather
};