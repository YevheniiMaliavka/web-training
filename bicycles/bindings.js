function Cat() {
  this.a = 2;
}

console.log(new Cat().a); // expect 2

function VeryCustomCat() {
  this.a = 3;
  return {
    a: 4
  };
}

console.log(new VeryCustomCat().a); // expect 4

// new or explicit bindings precedence

function foo(value) {
  this.a = value;
}

const obj1 = {};

const bar = foo.bind(obj1);

/*

similar to:

const bar = function(...args){
    return foo.call(obj1, ...args);
}

*/

bar(2);

console.log(obj1.a); // expect 2

var baz = new bar(3);
console.log(obj1.a); // expect 2

console.log(baz.a); // expect 3

const ø = {};

foo.call(ø, 10);

console.log(ø);
