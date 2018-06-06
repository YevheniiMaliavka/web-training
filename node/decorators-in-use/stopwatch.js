module.exports = (target, value, descriptor) => async (...args) => {
  const start = Date.now();
  const result = await target(args);
  const end = Date.now();
  console.log('Started: ', new Date(start).toUTCString());
  console.log('Ended: ', new Date(end).toUTCString());
  console.log('Total: ', end - start);
  return result;
};
