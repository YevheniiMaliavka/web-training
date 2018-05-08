const _ = require('lodash');

console.log("Simple index.js");

function loadExternalScript(filename, test, callback) {
  const script = document.createElement("script");
  script.src = "http://localhost:8080/dist/" + filename;
  document.getElementsByTagName("body")[0].appendChild(script);
}

document.getElementById("unique-button").onclick = () => {
  loadExternalScript("huge.bundle.js");
};
