const _ = require("lodash");
const React = require("react");

const message = _.join(
  ["This", "is", "a", "big", "file", "because", "of", "lodash", "included"],
  " "
);

console.log(message);
