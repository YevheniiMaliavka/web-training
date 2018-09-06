/*
Some background:
Once was reading some habrahabr thread about javascript and
in comments some guy said that there was an error in following:
this value of an anonymous function expression is dependent on
anynomous function expression definition/construction
and not on how the function is called, which I thought was actually WRONG.

Because - in usual function definitions, this value depends on how a function
is called syntatically (all that stuff with intermediate values of Reference Type)
and not on where the function is declared. This can be proved in following example.
*/

function bar() {
  const thisBar = this;
  return function foo() {
    console.log(thisBar === this);
  };
}

const fooFromBar = bar();
fooFromBar(); // true, however actuall I have expected false.

/*
And now I understand why it is true:
when calling bar(), this is set to the global object and thisBa === global object
Let's try to prove that I still was right saying that this value depends on where the function
is called, and not where it's constructed
*/

const zoo = {
  x: 10,
  zooFunc: function() {
    console.log(this.x);
  }
};

zoo.zooFunc(); // 10

const proveIt = zoo.zooFunc;
proveIt(); // undefined

const x = 20;

console.log(this.x);

proveIt(); // undefined...WTF? I thought it would be 20. Really?


// I am confused. Maybe should post this question somewhere...

// THIS IS AN EXAMPLE FROM MDN
// https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/this
///////////////////////////// START

////////////////////////////// END
// WAAAAAAAAAT
// and it logs undefined as well. 
// My world is destroyed, I should leave now... :()

// Ein Objekt kann als erstes Argument beim Aufruf von call oder apply benutzt werden
// welches an den Aufruf gebunden wird.
// Ein Objekt kann als erstes Argument beim Aufruf von call oder apply benutzt werden
// welches an den Aufruf gebunden wird.
var obj = {a: 'Custom'};

// Dieses Objekt wird auf dem globalen Objekt definiert
var a = 'Global';

function whatsThis() {
  console.log(this.a); // Der Wert von this hängt davon ab, wie die Funktion aufgerufen wird.
}

whatsThis();          // 'Global'
whatsThis.call(obj);  // 'Custom'
whatsThis.apply(obj); // 'Custom'