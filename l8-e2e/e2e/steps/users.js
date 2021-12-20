const { Given, When, Then, AfterAll, After } = require('cucumber');
const assert = require('assert').strict
const axios = require('axios');

/******** SCENARIO #1 ********/
Given('A user {}', function (request) {
  this.context['request'] = JSON.parse(request);
});

When('I send POST request to {}', async function (path) {
  this.context['response'] = await axios.post(`${process.env.SERVICE_URL}${path}`, this.context['request']);
});

Then('I get response code {int}', async function (code) {
  assert.equal(this.context['response'].status, code);
});

/******** SCENARIO #2 ********/
Given('A userId {int} exist', async function (id) {
  this.context['id'] = id;
});

When('I send GET request to {}', async function (path) {
  const response = await axios.get(`${process.env.SERVICE_URL}${path}/${this.context['id']}`);
  this.context['response'] = response;
})

Then(/^I receive (.*)$/, async function (expectedResponse) {
  assert.deepEqual(this.context['response'].data, JSON.parse(expectedResponse));
})
