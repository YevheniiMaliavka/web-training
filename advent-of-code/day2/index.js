const { readFileSync } = require('fs');

const assert = require('assert');

const solver = (fileName) => readFileSync(fileName, { encoding: 'utf-8' })
.split('\n')
.map(rowString => rowString.split(/\s+/))
.map(arr => arr.map(Number))
.reduce((accumulator, arr) => {
  arr.sort((a, b) => a - b);
  return accumulator += arr[arr.length - 1] - arr[0];
}, 0);

const testCase = solver('testcase.txt');

assert(testCase === 18);

const control = solver('control.txt');
console.log(control);
