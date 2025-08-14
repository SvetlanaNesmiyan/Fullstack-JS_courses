console.log('JS #1. Домашнє завдання. Основи JavaScript: Працюємо зі змінними, типами даних');

const myNum = 10;
const myStr = 'some string';
const myBool = true;
const myArr = [1, 2, 3, 4, 5];
const myObj = {
  first: 'First Name',
  last: 'Last Name'
};


const decimal2 = myNum.toFixed(2);  


const myBigInt = 123n + 1n; 

console.log("\nРезультати:");
console.log("myNum:", myNum);
console.log("myStr:", myStr);
console.log("myBool:", myBool);
console.log("myArr:", myArr);
console.log("myObj:", myObj);
console.log("decimal2:", decimal2, "(тип:", typeof decimal2 + ")");
console.log("myBigInt:", myBigInt.toString(), "(тип:", typeof myBigInt + ")");