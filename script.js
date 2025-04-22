// Global variables
let firstNum = null;
let secondNum = null;
let operator = null;
let valueDisplay = null;

// Selectors
const display = document.querySelector(".display");
const keys = document.querySelector(".keys");

// Basic math calculations
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

// Keys
keys.addEventListener("click", (e) => {
  const { target } = e; // Destructure
  valueDisplay = target.value;
  console.log(valueDisplay);
  populateDisplay();
});

// Updates the Display
function populateDisplay() {
  display.value = valueDisplay;
}
