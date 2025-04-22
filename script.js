// Global variables
let firstNum = null;
let secondNum = null;
let operator = null;
let valueDisplay = null;

// Selectors
const display = document.querySelector(".display");
const keys = document.querySelector(".keys");

// Basic math calculations
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

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

console.log(operate("+", 2, 2));

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
