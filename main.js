console.log('#3. JavaScript homework example file')

// #1 
let userObj = {
  firstName: 'John',
  lastName: 'Smith', 
  age: 30
}
console.log(userObj)

// #2 
userObj.fullName = function() {
  return `${this.firstName} ${this.lastName}`
}
console.log(userObj.fullName()) 

// #3 
function defUpperStr(text) {
  return (text || 'DEFAULT TEXT').toUpperCase()
}
console.log(defUpperStr('My text')) 
console.log(defUpperStr()) 

// #4 
function evenFn(n) {
  let result = []
  for (let i = 1; i <= n; i++) {
    if (i % 2 === 0) {
      result.push(i)
    }
  }
  return result
}
console.log(evenFn(10))
console.log(evenFn(15))
console.log(evenFn(20))

// #5 
function weekFn(n) {
  switch (n) {
    case 1: return 'Понеділок'
    case 2: return 'Вівторок'
    case 3: return 'Середа'
    case 4: return 'Четвер'
    case 5: return 'П\'ятниця'
    case 6: return 'Субота'
    case 7: return 'Неділя'
    default: return null
  }
}
console.log(weekFn(1))
console.log(weekFn(3))  
console.log(weekFn(7))  
console.log(weekFn(9))   
console.log(weekFn(1.5)) 
console.log(weekFn('2'))

// #6 
function ageClassification(n) {
  return n < 0 || n > 122 ? null :
         n <= 24 ? 'Дитинство' :
         n <= 44 ? 'Молодість' :
         n <= 65 ? 'Зрілість' :
         n <= 75 ? 'Старість' :
         n <= 90 ? 'Довголіття' :
         'Рекорд'
}
console.log(ageClassification(24))   
console.log(ageClassification(44.01)) 
console.log(ageClassification(65.1))  
console.log(ageClassification(90.01))  

// #7 
function oddFn(n) {
  let result = []
  let i = 1
  while (i <= n) {
    result.push(i)
    i += 2
  }
  return result
}
console.log(oddFn(10))
console.log(oddFn(15)) 
console.log(oddFn(20)) 

// #8 
function mainFunc(a, b, callback) {
  return typeof callback === 'function' ? callback(a, b) : false
}

function cbRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function cbPow(num, pow) {
  return Math.pow(num, pow)
}

function cbAdd(a, b) {
  return a + b
}

console.log(mainFunc(2, 5, cbRandom))   
console.log(mainFunc(2, 5, cbPow))      
console.log(mainFunc(2, 5, cbAdd))    
console.log(mainFunc(2, 5, 'not a func')) 