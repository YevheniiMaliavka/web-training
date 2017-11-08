import request from "./api-mock";

const form = document.querySelector("#e2e-form");
const loadButton = document.querySelector("#e2e-submit");
const imageContainer = document.querySelector("#cool-image-container");

function showCoolImage() {
  const image = document.createElement("img");
  image.src = "assets/cool-image.jpg";
  image.id = "e2e-cool-image";
  image.width = 300;
  image.height = 300;
  imageContainer.appendChild(image);
}

form.addEventListener("submit", function(e) {
  // ... do something with a form
  request("mock-url", function() {
    showCoolImage();
  });
  e.preventDefault();
});
