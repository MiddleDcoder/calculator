// Global variables
let firstOperand = null;
let secondOperand = null;
let operator = null;
let waitingSecondOperand = true;
let result = null;
let isAlreadyResult = false;

// Basic math calculations
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// Handle Operation
function operate(op, fNum, sNum) {
  switch (op) {
    case "+":
      return add(fNum, sNum);
    case "-":
      return subtract(fNum, sNum);
    case "x":
      return multiply(fNum, sNum);
    case "÷":
      return divide(fNum, sNum);
    default:
      return null;
  }
}

// All Clear = RESET
const allClear = document.querySelector(".all-clear");
allClear.addEventListener("click", () => {
  reset();
});

function reset() {
  display.value = "0";
  firstOperand = null;
  secondOperand = null;
  operator = null;
  waitingSecondOperand = true;
  result = null;
}

// Key buttons
const keys = document.querySelector(".keys");
keys.addEventListener("click", (e) => {
  const { target } = e; // Destructure

  if (!target.matches("button")) return;

  // first operand
  if (target.classList.contains("num") && waitingSecondOperand) {
    firstOperand === null || firstOperand === "0" || isAlreadyResult // reset if pressed number in result
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

    // check first if needed to be rounded
    if (hasMoreThanTwoDecimals(result)) {
      result = Number(result.toFixed(2));
      populateDisplay(result);
    } else {
      populateDisplay(result);
    }

    // next set of expression with the result as firstOperand
    firstOperand = result.toString();
    secondOperand = null;
    operator = null;
    result = null;
    waitingSecondOperand = true;
    isAlreadyResult = true;
    return;
  }

  // stops the other operators to trigger when already complete expression
  if (target.classList.contains("operator") && secondOperand != null) return;
});

// Checker if has More Than TwoDecimals
function hasMoreThanTwoDecimals(num) {
  return num % 1 !== 0 && num.toString().split(".")[1]?.length > 2;
}

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
  if (isAlreadyResult) {
    display.value = updateDisplay;
    console.log(updateDisplay);
    isAlreadyResult = false;
    return;
  }
  // for secondOperand zero first value
  else if (
    display.value.slice(-1) === "0" &&
    !waitingSecondOperand &&
    secondOperand.length == 1
  ) {
    let firstOperandOperator = display.value.slice(0, -1);
    let lastOperand = display.value.slice(-1);
    let replaceZero = lastOperand.replace(/0/, updateDisplay);
    display.value = firstOperandOperator + replaceZero;
    console.log(updateDisplay);
    return;
  }
  // for result
  else if (result !== null) {
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
    isAlreadyResult = false;
  } else if (!waitingSecondOperand && secondOperand != null) {
    secondOperand.length == 1
      ? (secondOperand = null)
      : (secondOperand = secondOperand.slice(0, -1));
  } else if (operator != null && secondOperand == null) operator = null;
});

// Decimal button
const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", (e) => {
  const decimalValue = e.target.value;

  if (waitingSecondOperand) {
    // Handling firstOperand when waiting for second operand
    if (firstOperand == null || firstOperand === "0") {
      firstOperand = "0" + decimalValue;
    } else if (!firstOperand.includes(decimalValue)) {
      firstOperand += decimalValue;
      populateDisplay(decimalValue);
      return;
    } else {
      return; // prevent multiple decimals
    }
    populateDisplay(firstOperand);
    return;
  }

  // Handling secondOperand when inputting second number
  if (secondOperand == null || secondOperand === "0") {
    secondOperand = "0" + decimalValue;
  } else if (!secondOperand.includes(decimalValue)) {
    secondOperand += decimalValue;
    populateDisplay(decimalValue);
    return;
  } else {
    return; // prevent multiple decimals
  }
  populateDisplay(secondOperand);
});

// +/- button functionality
const sign = document.querySelector(".sign");
sign.addEventListener("click", () => {
  // check wether firstOperand or secondOperand
  if (waitingSecondOperand) {
    firstOperand = addSign("first");
  } else {
    secondOperand = addSign("second");
  }
});

// function to handle the input sign
function addSign(operandType) {
  let operand = operandType === "first" ? firstOperand : secondOperand;
  operand = (parseFloat(operand) * -1).toString();
  return operand;
}

// Percentage button
const percentage = document.querySelector(".percentage");
percentage.addEventListener("click", () => {
  if (waitingSecondOperand) {
    firstOperand = addPercentage("first");
  } else {
    secondOperand = addPercentage("second");
  }
});

function addPercentage(operandType) {
  let operand = operandType === "first" ? firstOperand : secondOperand;
  if (operandType === "first") {
    operand = (parseFloat(operand) / 100).toString();
  } else {
    operand = ((parseFloat(operand) / 100) * firstOperand).toString();
  }
  return operand;
}
