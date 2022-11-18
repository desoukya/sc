
// Import Modules
const express = require('express');
const countryService = require('./country/country.service');
const weatherService = require('./weather/weather.service');

const app = express();

// Parse request bodies in middleware before handlers
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Allow CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Create HTTP Server and Listen for Requests
app.listen(3000, async (req, res) => {
  console.log('HTTP Web Server Running On Port 3000');

  app.get('/weather', async (req, res) => {
    const { city } = req.query;

    // Validate expected arguments were passed
    if (!city) {
      return res.status(400).send('Expected city argument');
    }

    const weather = await weatherService.getWeather(city);
    if (weather) {
      return res.status(200).json(weather);
    }
    return res.status(400).send('Could not process request');
  });

  app.get('/info', async (req, res) => {
    const { country: countryCode } = req.query;

    // Validate expected arguments were passed
    if (!countryCode) {
      return res.status(400).send('Expected country code arguments');
    }
    if (countryCode.length !== 2) {
      return res.status(400).send('Country must be an ISO alpha-2 code');
    }

    const info = await countryService.getCountryInfo(countryCode);
    if (info) {
      return res.status(200).json(info);
    }
    return res.status(400).send('Could not process request');
  });
});
