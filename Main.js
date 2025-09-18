console.log('#5. JavaScript homework');

/*
 * #1
 */
const counter = (function() {
  let count = 0;
  return function(n) {
    if (n !== undefined) {
      count = n;
    }
    return count++;
  };
})();

console.log(counter()); 
console.log(counter());
console.log(counter(100)); 
console.log(counter()); 
console.log(counter());
console.log(counter(500)); 
console.log(counter()); 
console.log(counter());
console.log(counter(0));
console.log(counter());
console.log(counter());

/*
 * #2
 */
const counterFactory = (function() {
  let count = 0;
  return {
    value: function(n) {
      if (n !== undefined) {
        count = n;
      }
      return count;
    },
    increment: function() {
      count++;
    },
    decrement: function() {
      count--;
    }
  };
})();

console.log(counterFactory.value()); 
counterFactory.increment();
counterFactory.increment();
counterFactory.increment();
console.log(counterFactory.value());
counterFactory.decrement();
counterFactory.decrement();
console.log(counterFactory.value()); 
console.log(counterFactory.value(100)); 
counterFactory.decrement();
console.log(counterFactory.value());
console.log(counterFactory.value(200)); 
counterFactory.increment();
console.log(counterFactory.value()); 

/*
 * #3
 */
const myPrint = (a, b, res) => `${a}^${b}=${res}`;

const myPow = (a, b, callback) => {
  const calculate = (a, b) => {
    if (b === 0) return 1;
    if (b < 0) return 1 / calculate(a, -b);
    return a * calculate(a, b - 1);
  };
  const res = calculate(a, b);
  return callback(a, b, res);
};

console.log(myPow(3, 4, myPrint));
console.log(myPow(2, 3, myPrint)); 
console.log(myPow(2, 0, myPrint)); 
console.log(myPow(2, -2, myPrint)); 

/*
 * #4
 */
const list = [12, 23, 100, 34, 56, 9, 233];
const myMax = (arr) => Math.max.apply(null, arr);

console.log(myMax(list));

/*
 * #5
 */
const myMul = (a, b) => a * b;

const myDouble = myMul.bind(null, 2);
const myTriple = myMul.bind(null, 3);

console.log(myDouble(3));
console.log(myDouble(4));
console.log(myDouble(5)); 

console.log(myTriple(3));
console.log(myTriple(4)); 
console.log(myTriple(5)); 

export { counter, counterFactory, myPow, myMax, myMul, myDouble, myTriple };