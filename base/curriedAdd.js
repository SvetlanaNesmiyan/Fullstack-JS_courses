function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

const addFirst = curriedAdd(1)
const addSecond = addFirst(2)
const result = addSecond(3) 
console.log('Result:', result)

export { curriedAdd }