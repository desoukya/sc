// Import Modules
const express = require('express');
const app = express();
const faker = require('faker');

// Parse request bodies in middleware before handlers
const bodyParser  = require('body-parser');
app.use(bodyParser.json());

// Allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Create HTTP Server and Listen for Requests
app.listen(3000, async (req, res) => {
  console.log(`[OK] = HTTP Web Server Running On Port ${3000}`);

  app.get('/users', async (req, res) => {
    return res.status(200).json({ name: faker.name.findName() });
  });

  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    return res.status(200).json(({
      '99': {"id":99,"name":"Dwayne Klocko","email":"Rene30@hotmail.com","phoneNumber":"1-876-420-9890","secondaryPhoneNumber": "(914) 249-3519"},
      '7': {"id":7,"name":"Ian Weimann DVM","email":"Euna_Bergstrom@hotmail.com","phoneNumber":"(297) 962-1879", "secondaryPhoneNumber": "788.323.7782"}
    }[id] || null));
  });

  app.post('/users', async (req, res) => {
    return res.status(201).json({
      message: 'Success'
    });
  });
});