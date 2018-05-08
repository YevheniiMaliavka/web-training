function dynamicImport(module) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `${window.location.origin}/${module}.js`;
    script.onload = () => {
      script.remove();
      resolve(window[])
    };
    document.documentElement.appendChild(script);
  });
}

const nav = document.createElement("nav");
const sectionNames = ["home", "about", "weather"];
sectionNames.map(name => {
  const button = document.createElement("button");
  button.value = button.innerHTML = name;
  nav.appendChild(button);
});

document.getElementById("app").appendChild(nav);
