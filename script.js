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
    firstOperand === null || firstOperand === "0"
      ? (firstOperand = target.value)
      : (firstOperand += target.value);
    populateDisplay(target.value);
    console.log(firstOperand);
    return;
  }

  // operator selection
  if (target.classList.contains("operator") && secondOperand == null) {
    if (operator === target.value) return;
    if (operator !== target.value || operator === null) operator = target.value;
    if (firstOperand === null) firstOperand = "0";
    populateDisplay(operator);
    console.log(operator);
    waitingSecondOperand = false;
    return;
  }

  // second operand
  if (target.classList.contains("num") && !waitingSecondOperand) {
    secondOperand === null || secondOperand === "0"
      ? (secondOperand = target.value)
      : (secondOperand += target.value);
    populateDisplay(target.value);
    console.log(secondOperand);
    return;
  }

  // equal selected
  if (target.classList.contains("equal")) {
    if (firstOperand == null || secondOperand == null || operator == null)
      return;

    result = operate(
      operator,
      parseFloat(firstOperand),
      parseFloat(secondOperand)
    );
    populateDisplay(result);
    // next set of expression with the result as firstOperand
    firstOperand = result;
    secondOperand = null;
    operator = null;
    result = null;
    waitingSecondOperand = true;
    return;
  }

  // stops the other operators to trigger when already complete expression
  if (target.classList.contains("operator") && secondOperand != null) return;
});

// Updates the Display
const display = document.querySelector(".display");
let pattern = /[+\-÷x]/g;
function populateDisplay(updateDisplay) {
  // for zero value firstOperand and not operator
  if (display.value === "0" && updateDisplay != operator) {
    display.value = updateDisplay;
    console.log(updateDisplay);
    return;
  }
  // for secondOperand zero first value
  else if (
    display.value.slice(-1) === "0" &&
    !waitingSecondOperand &&
    result != updateDisplay
  ) {
    let firstOperandOperator = display.value.slice(0, -1);
    let lastOperand = display.value.slice(-1);
    let replaceZero = lastOperand.replace(/0/, updateDisplay);
    display.value = firstOperandOperator + replaceZero;
    console.log(updateDisplay);
    return;
  }
  // for result
  else if (result !== undefined && result != null) {
    display.value = updateDisplay;
    console.log(result);
    return;
  }
  // for replacing operator
  else if (pattern.test(display.value) && secondOperand == null) {
    let str = display.value;
    let replacedStr = str.replace(pattern, updateDisplay);
    display.value = replacedStr;
    console.log(updateDisplay);
    return;
  }
  // for operands and operator
  else {
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

// Decimal button
const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", (e) => {
  const { target } = e;

  if (firstOperand.includes(target.value)) return;

  if (firstOperand == null || firstOperand === "0") {
    firstOperand = "0" + target.value;
    populateDisplay(firstOperand);
    return;
  }

  if (firstOperand != null || firstOperand != "0") {
    firstOperand += target.value;
    populateDisplay(target.value);
    console.log(firstOperand);
    return;
  }
});

// +/- button functionality
const sign = document.querySelector(".sign");
sign.addEventListener("click", () => {});

// Percentage button
const percentage = document.querySelector(".percentage");
percentage.addEventListener("click", () => {});
