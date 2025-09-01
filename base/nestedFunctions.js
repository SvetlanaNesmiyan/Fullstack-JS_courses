function outerFunction(arg1) {
  return function innerFunction(arg2) {
    return function deepInnerFunction(arg3) {
      return arg1 * arg2 * arg3;
    };
  };
}

const result = outerFunction(2)(3)(4)
console.log(result)

export { outerFunction }