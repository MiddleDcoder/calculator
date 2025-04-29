// Global variables
let firstOperand = null;
let secondOperand = null;
let operator = null;
let waitingSecondOperand = true;
let result;

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
  } else if (op == "x") {
    return multiply(fNum, sNum);
  } else if (op == "÷") {
    return divide(fNum, sNum);
  }
}

// console.log(operate("+", 2, 2));

// All Clear = RESET
const allClear = document.querySelector(".all-clear");
allClear.addEventListener("click", () => {
  display.value = "0";
  firstOperand = null;
  secondOperand = null;
  operator = null;
  result = null;
  waitingSecondOperand = true;
});

// Key buttons
const keys = document.querySelector(".keys");
keys.addEventListener("click", (e) => {
  const { target } = e; // Destructure

  if (!target.matches("button")) return;

  // first operand
  if (target.classList.contains("num") && waitingSecondOperand) {
    firstOperand === null
      ? (firstOperand = target.value)
      : (firstOperand += target.value);
    populateDisplay(target.value);
    console.log(firstOperand);
  }

  // operator selection
  if (target.classList.contains("operator") && secondOperand == null) {
    if (operator === target.value) return;
    if (operator !== target.value || operator === null) operator = target.value;
    populateDisplay(operator);
    console.log(operator);
    waitingSecondOperand = false;
  }

  // second operand
  if (target.classList.contains("num") && !waitingSecondOperand) {
    secondOperand === null
      ? (secondOperand = target.value)
      : (secondOperand += target.value);
    populateDisplay(target.value);
    console.log(secondOperand);
  }

  // equal selected
  if (target.classList.contains("equal")) {
    result = operate(
      operator,
      parseFloat(firstOperand),
      parseFloat(secondOperand)
    );
    populateDisplay(result);
  }

  // stops the other operators to trigger when already complete expression
  if (target.classList.contains("operator") && secondOperand != null) return;
});

// Updates the Display
const display = document.querySelector(".display");
let pattern = /[+\-÷x]/g;
function populateDisplay(updateDisplay) {
  if (display.value === "0") {
    display.value = updateDisplay;
  } else if (result !== undefined && result != null) {
    display.value = updateDisplay;
    console.log(result);
  } else if (pattern.test(display.value) && secondOperand == null) {
    let str = display.value;
    let replacedStr = str.replace(pattern, updateDisplay);
    display.value = replacedStr;
    console.log(updateDisplay);
  } else {
    display.value += updateDisplay;
    console.log(updateDisplay);
  }
}

// Back button
const back = document.querySelector(".back");
back.addEventListener("click", () => {
  // for string display
  display.value.length == 1
    ? (display.value = "0")
    : (display.value = display.value.slice(0, -1));

  // for operands and operator variable
  if (waitingSecondOperand && firstOperand != null) {
    firstOperand.length == 1
      ? (firstOperand = null)
      : (firstOperand = firstOperand.slice(0, -1));
  } else if (!waitingSecondOperand && secondOperand != null) {
    secondOperand.length == 1
      ? (secondOperand = null)
      : (secondOperand = secondOperand.slice(0, -1));
  } else if (operator != null && secondOperand == null) operator = null;
});
