// Global variables
let firstOperand = null;
let secondOperand = null;
let operator = null;
let waitingSecondOperand = true;

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

// console.log(operate("+", 2, 2));

// Key buttons
const keys = document.querySelector(".keys");
keys.addEventListener("click", (e) => {
  const { target } = e; // Destructure

  // first operand
  if (firstOperand === null) {
    firstOperand = target.value;
    populateDisplay(firstOperand);
    console.log(firstOperand);
  }

  // operator selection
  if (target.classList.contains("operator")) {
    operator = target.value;
    populateDisplay(operator);
    console.log(operator);
    waitingSecondOperand = false;
    return;
  }

  // second operand
  if (secondOperand === null && !waitingSecondOperand) {
    secondOperand = target.value;
    populateDisplay(secondOperand);
    console.log(secondOperand);
  }
});

// Updates the Display
const display = document.querySelector(".display");
function populateDisplay(updateDisplay) {
  if (display.value === "0") {
    display.value = updateDisplay;
  } else {
    display.value += updateDisplay;
  }
}
