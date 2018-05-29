/*
    Target is to implement Promise.all() function
*/

const assert = require('assert');
const { promiseall } = require('./promiseall');

const sleep = (value, duration) =>
  new Promise(resolve => setTimeout(() => resolve(value)), duration);

const testCaseA = [1, 2, 3, 4];
const testCaseB = [sleep(5, 500), sleep(6, 100), sleep(7, 0), sleep(8, 1000)];
const testCaseC = [
  9,
  sleep(10, 1000),
  new Promise(resolve => {
    throw new Error('Baz!');
  })
];

const promiseTests = testCase => {
  let resultA = null;
  let resultB = null;
  Promise.all(testCase)
    .then(result => {
      resultA = result;
      return promiseall(testCase);
    })
    .then(result => {
      resultB = result;
      assert(resultA);
      assert(resultB);
      assert.deepEqual(resultA, resultB);
      console.log('Test case passed! ', resultA, resultB);
    })
    .catch(err => {
      console.log('An error has occured: ', err.message);
      console.log(
        'That means error has been catched by promiseall and execution stopped!'
      );
    });
};

promiseTests(testCaseA);
promiseTests(testCaseB);
promiseTests(testCaseC);
