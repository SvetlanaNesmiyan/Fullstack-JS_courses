function originalFunction(num) {
  return num * num;
}

function modifyFunction(originalFunc, multiplier) {
  return function(num) {
    return originalFunc(num) * multiplier;
  };
}

const modifiedFunc = modifyFunction(originalFunction, 3)
console.log('Original function output for 4:', originalFunction(4))
console.log('Modified function output for 4:', modifiedFunc(4))

export { originalFunction, modifyFunction }