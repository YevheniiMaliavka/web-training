const ensurePromises = arr => arr.map(item => Promise.resolve(item));

const promiseall = arr =>
  new Promise((resolve, reject) => {
    const results = [];
    const promises = ensurePromises(arr);
    (function awaitNext(index) {
      (promises[index] &&
        promises[index]
          .then(result => {
            results.push(result);
            return awaitNext(index + 1);
          })
          .catch(reject)) ||
        resolve(results);
    })(0);
  });

module.exports = {
  promiseall: promiseall
};
