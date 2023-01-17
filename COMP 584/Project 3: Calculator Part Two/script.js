// an object to help us keep track of values.
const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

// Function to modify displayValue when any of the digits is clicked
function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    // Overwrite `displayValue` if the current value is '0' otherwise append to it
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
}



/*
Function to append a decimal point to whatever is displayed on
the screen except if it already contains a decimal point
*/
function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    return;
  }
  // If the `displayValue` property does not contain a decimal point
  if (!calculator.displayValue.includes(dot)) {
    // Append the decimal point
    calculator.displayValue += dot;
  }
}

// Function to handle operators
function handleOperator(nextOperator) {
  // Destructure the properties on the calculator object
  const { firstOperand, displayValue, operator } = calculator;
  // `parseFloat` converts the string contents of `displayValue`
  // to a floating-point number
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  // verify that `firstOperand` is null and that the `inputValue`
  // is not a `NaN` value
  if (firstOperand == null && !isNaN(inputValue)) {
    // Update the firstOperand property
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

/*
Function to handle occurs when the user has entered the second operand
and an operator key is clicked. 
*/
function calculate(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

// Function to remove the last character from the string
// by clicking on the back arrow
function back() {
  var value = calculator.displayValue;
  if ( value.length > 1) {
    calculator.displayValue = value.slice(0, value.length - 1);
  } else {
    calculator.displayValue = "0";
  }
  
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

// Function reset the calculator to its initial state by pressing a key.
function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

// function to update the screen with the contents of displayValue
function updateDisplay() {
  // select the element with class of `cal-screen`
  const display = document.querySelector(".cal-screen");
  // update the value of the element with the contents of `displayValue`
  display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector(".calculator-buttons");
keys.addEventListener("click", (event) => {
  // Access the clicked element

  const { target } = event; // is equivalent to const target = event.target;
  const { value } = target;

  // Check if the clicked element is a button.
  // If not, exit from the function
  if (!target.matches("button")) {
    return;
  }

  switch (value) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      handleOperator(value);
      break;
    case ".":
      inputDecimal(value);
      break;
    case "arrow":
      back();
      break;
    case "all-clear":
      resetCalculator();
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }

  updateDisplay();
});
