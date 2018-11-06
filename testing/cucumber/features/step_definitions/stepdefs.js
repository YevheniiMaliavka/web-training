const assert = require('assert');
const { Given, When, Then } = require('cucumber');

// this is a very simple function created using BDD
const shallIGoHome = hours => (hours < 8 || hours > 16 ? 'yes' : 'no');

// step definitions -> glue to Gherkin feature definitions
Given('right now is {int} oclock', hours => (this.hours = hours));

When(
  'I ask if I am allowed to go home',
  () => (this.answer = shallIGoHome(this.hours))
);

Then('I should be told {string}', expectedAnswer =>
  assert.equal(this.answer, expectedAnswer)
);
