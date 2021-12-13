const { Given, When, Then, AfterAll, After } = require('cucumber');
const assert = require('assert').strict
const axios = require('axios');

Given('A user {}', function (request) {
  this.context['request'] = JSON.parse(request);
});

Given('A userId {int} exist', async function (id) {
  this.context['id'] = id;
})

When('I send POST request to {}', async function (path) {
  const r = await axios.post(`${process.env.SERVICE_URL}${path}`, this.context['request']);
  this.context['response'] = await axios.post(`${process.env.SERVICE_URL}${path}`, this.context['request']);
})

When('I send GET request to {}', async function (path) {
  const response = await axios.get(`${process.env.SERVICE_URL}${path}/${this.context['id']}`);
  this.context['response'] = response;
})

Then('I get response code {int}', async function (code) {
  assert.equal(this.context['response'].status, code);
});

Then(/^I receive (.*)$/, async function (expectedResponse) {
  assert.deepEqual(this.context['response'].data, JSON.parse(expectedResponse));
})
