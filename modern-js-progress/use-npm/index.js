
var body = document.getElementsByTagName("body")[0];
var timeNode = document.createElement("p");
var textNode = document.createTextNode("Time: " + moment().format("MMMM Do, h:mm:ss"));
timeNode.appendChild(textNode);
body.appendChild(timeNode);
