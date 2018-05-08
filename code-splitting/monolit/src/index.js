console.log("Simple index.js");

function loadExternalScript(filename, test, callback) {
  const script = document.createElement("script");
  script.src = "http://localhost:8080/dist/" + filename;
  document.getElementsByTagName("body")[0].appendChild(script);
  // This would not work for the case of a webpack bundling
  // because of its own execution context in own scope
  //   if (typeof callback === "undefined") {
  //     callback = test;
  //   }
  //   let tryLimit = 20;
  //   const interval = setInterval(function() {
  //     if (!tryLimit--) {
  //       return clearInterval(interval);
  //     }
  //     try {
  //       test();
  //     } catch (e) {
  //       console.log("loading test has failed!");
  //       return;
  //     }
  //     console.log("loading test has passed!");
  //     clearInterval(interval);
  //     callback();
  //   }, 100);
}

document.getElementById("unique-button").onclick = () => {
  loadExternalScript("huge.bundle.js");
};
