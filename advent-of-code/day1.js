const assert = require('assert');

const captchaCheck = digits =>
  digits
    .split('')
    .map(Number)
    .reduce((accumulator, current, index, arr) => {
      const next = index === arr.length - 1 ? arr[0] : arr[index + 1];
      return current === next ? accumulator + current : accumulator;
    }, 0);

//test cases should pass before control input check
assert.equal(captchaCheck('1122'), 3);
assert.equal(captchaCheck('1111'), 4);
assert.equal(captchaCheck('1234'), 0);
assert.equal(captchaCheck('91212129'), 9);

//control task
const controlInput = process.argv.slice(2)[0];
console.log(`Input: ${controlInput}`);
console.log(`Output: ${captchaCheck(controlInput)}`);
