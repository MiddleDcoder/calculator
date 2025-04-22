// Global variables
let firstNum = null;
let secondNum = null;
let operator = null;

// start by creating functions for all the basic math
const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const multiply = function (a, b) {
  return a * b;
};

const divide = function (a, b) {
  return a / b;
};

// console.log(add(2, 2));
// console.log(subtract(2, 2));
// console.log(multiply(2, 2));
// console.log(divide(2, 2));

// Handle Operation
function operate(op, fNum, sNum) {
  if (op == "+") {
    return add(fNum, sNum);
  } else if (op == "-") {
    return subtract(fNum, sNum);
  } else if (op == "*") {
    return multiply(fNum, sNum);
  } else if (op == "/") {
    return divide(fNum, sNum);
  }
}
