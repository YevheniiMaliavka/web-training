function thirdPartyFunction(callback) {
  //doSomething
  callback();
}

function printThisProperty(property) {
  console.log(this[property]);
}

const obj = {
  a: 1,
  printThisProperty
};

obj.printThisProperty('a'); // expect 1

thirdPartyFunction(obj.printThisProperty); // expect undefined

// use hard binding

function bind(func, obj) {
  return function(...args) {
    func.apply(obj,args);
  };
}

const binded = bind(printThisProperty, obj);
binded('a'); // expect 1;