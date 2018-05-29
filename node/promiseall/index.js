/*
    Target is to implement Promise.all() function
*/

const sleep = (value, duration) =>
  new Promise(resolve => setTimeout(() => resolve(value)), duration);

const testCaseA = [1, 2, 3, 4];
const testCaseB = [sleep(5, 500), sleep(6, 100), sleep(7, 0), sleep(8, 1000)];
const testCaseC = [
  9,
  sleep(10, 1000),
  new Promise(() => {
    throw new Error("Promise Error");
  })
];

