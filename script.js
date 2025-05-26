// Calculator State
let state = {
  firstOperand: null,
  secondOperand: null,
  operator: null,
  waitingSecondOperand: true,
  isResult: false,
  isPercentageFirstOperand: false,
};

const display = document.querySelector(".display");
const keys = document.querySelector(".keys");
const allClear = document.querySelector(".all-clear");
const back = document.querySelector(".back");
const decimal = document.querySelector(".decimal");
const sign = document.querySelector(".sign");
const percentage = document.querySelector(".percentage");

// Math operations
const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  x: (a, b) => a * b,
  "÷": (a, b) => a / b,
};

function operate(op, a, b) {
  return operations[op] ? operations[op](a, b) : null;
}

function resetCalculator() {
  state = {
    firstOperand: null,
    secondOperand: null,
    operator: null,
    waitingSecondOperand: true,
    isResult: false,
    isPercentageFirstOperand: false,
  };
  updateDisplay("0");
}

function updateDisplay(value) {
  display.value = value;
}

function appendToDisplay(value) {
  if (display.value === "0" || state.isResult) {
    updateDisplay(value);
    state.isResult = false;
  } else {
    updateDisplay(display.value + value);
  }
}

function handleNumber(num) {
  if (state.waitingSecondOperand) {
    state.firstOperand =
      num === "0" && state.firstOperand === "0"
        ? num
        : state.firstOperand && !state.isResult
        ? state.firstOperand + num
        : num;
    appendToDisplay(num);
  } else {
    state.secondOperand =
      num === "0" && state.secondOperand === "0"
        ? num
        : (state.secondOperand = state.secondOperand
            ? state.secondOperand + num
            : num);
    appendToDisplay(num);
  }
}

function handleOperator(op) {
  const operators = ["+", "-", "x", "÷"];
  const lastChar = display.value.slice(-1);

  // If last char is an operator, replace it
  if (operators.includes(lastChar)) {
    updateDisplay(display.value.slice(0, -1) + op);
    state.operator = op;
    state.isResult = false;
    return;
  }

  // Prevent adding operator if already set and waiting for second operand
  if (state.operator && !state.waitingSecondOperand && state.secondOperand)
    return;

  if (!state.firstOperand) state.firstOperand = "0";
  state.operator = op;
  state.waitingSecondOperand = false;
  state.isResult = false;
  appendToDisplay(op);
}

function handleEqual() {
  if (!state.firstOperand || !state.secondOperand || !state.operator) return;
  let result = operate(
    state.operator,
    parseFloat(state.firstOperand),
    parseFloat(state.secondOperand)
  );
  if (hasMoreThanTwoDecimals(result)) result = Number(result.toFixed(2));
  updateDisplay(result);
  state.firstOperand = result.toString();
  state.secondOperand = null;
  state.operator = null;
  state.waitingSecondOperand = true;
  state.isResult = true;
}

function handleDecimal() {
  const decimalChar = ".";
  if (state.waitingSecondOperand) {
    if (!state.firstOperand || state.firstOperand === "0") {
      state.firstOperand = "0.";
      appendToDisplay("0.");
    } else if (!state.firstOperand.includes(decimalChar)) {
      state.firstOperand += decimalChar;
      appendToDisplay(decimalChar);
    }
  } else {
    if (!state.secondOperand || state.secondOperand === "0") {
      state.secondOperand = "0.";
      appendToDisplay("0.");
    } else if (!state.secondOperand.includes(decimalChar)) {
      state.secondOperand += decimalChar;
      appendToDisplay(decimalChar);
    }
  }
}

function handleSign() {
  if (state.waitingSecondOperand) {
    if (!state.firstOperand || state.firstOperand === "0") return;
    state.firstOperand = toggleSign(state.firstOperand);
    updateDisplay(state.firstOperand);
  } else {
    if (!state.secondOperand || state.secondOperand === "0") return;
    state.secondOperand = toggleSign(state.secondOperand);
    updateDisplay(state.firstOperand + state.operator + state.secondOperand);
  }
}

function toggleSign(operand) {
  return (parseFloat(operand) * -1).toString();
}

function handlePercentage() {
  if (state.waitingSecondOperand) {
    state.firstOperand = toPercentage(state.firstOperand);
    state.isPercentageFirstOperand = true;
    appendToDisplay("%");
  } else {
    state.secondOperand = toPercentage(
      state.secondOperand,
      state.firstOperand,
      state.isPercentageFirstOperand
    );
    appendToDisplay("%");
  }
}

function toPercentage(operand, base = null, isFirst = true) {
  if (!operand) return "0";
  if (isFirst) return (parseFloat(operand) / 100).toString();
  return ((parseFloat(operand) / 100) * parseFloat(base)).toString();
}

function handleBackspace() {
  if (display.value.length === 1) {
    updateDisplay("0");
  } else {
    updateDisplay(display.value.slice(0, -1));
  }
  if (state.waitingSecondOperand && state.firstOperand) {
    state.firstOperand =
      state.firstOperand.length === 1 ? null : state.firstOperand.slice(0, -1);
    state.isResult = false;
  } else if (!state.waitingSecondOperand && state.secondOperand) {
    state.secondOperand =
      state.secondOperand.length === 1
        ? null
        : state.secondOperand.slice(0, -1);
  } else if (state.operator && !state.secondOperand) {
    state.operator = null;
  }
}

function hasMoreThanTwoDecimals(num) {
  return num % 1 !== 0 && num.toString().split(".")[1]?.length > 2;
}

// Event Listeners
allClear.addEventListener("click", resetCalculator);

back.addEventListener("click", handleBackspace);

decimal.addEventListener("click", handleDecimal);

sign.addEventListener("click", handleSign);

percentage.addEventListener("click", handlePercentage);

keys.addEventListener("click", (e) => {
  const { target } = e;
  if (!target.matches("button")) return;
  if (target.classList.contains("num")) {
    handleNumber(target.value);
  } else if (target.classList.contains("operator")) {
    handleOperator(target.value);
  } else if (target.classList.contains("equal")) {
    handleEqual();
  }
});

// Initialize display
resetCalculator();
