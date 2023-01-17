// const calculatorButton = document.querySelectorAll('.calc-btn');
// const operatorButtons = document.querySelectorAll('.op-btn');
// const equalsButton = document.querySelector('.equal-btn');
// const displayDiv = document.querySelector('.num-display');
// let displayValue = ''
// let operatorRecentlyPressed = true;
// let userEntryMode = true;

// function add (a, b) {
//   return a + b;
// }

// function subtract (a, b) {
//   return a - b;
// }

// function multiply (a, b) {
//   return a * b;
// }

// function divide (a, b) {
//   return a / b;
// }

// function operate (operator, num1, num2) {
//   switch (operator) {
//     case '+':
//       return add(num1, num2);
//     case '-':
//       return subtract(num1, num2);
//     case '×':
//       return multiply(num1, num2);
//     case '÷':
//       if (num2 === 0) {
//         throw "You can't divide by zero..";
//       }
//       return divide(num1, num2);
//     default:
//       break;
//   }
// }

// function operatorButtonVisibility (visibility) {
//   operatorButtons.forEach (btn => btn.disabled = visibility);
// }

// function equalSignButtonVisibility (visibility) {
//   document.querySelector('.equal-btn').disabled = visibility;
// }

// function backspaceButtonVisibility (visibility) {
//   document.querySelector('.backspace-btn').disabled = visibility;
// }

// function decimalButtonVisibility (visibility) {
//   document.querySelector('.decimal-btn').disabled = visibility;
// }

// function disableAllButtonsExceptClear (visibility) {
//   const someButtons = [...document.querySelectorAll('.calc-btn')];
//   someButtons.splice(0,1); //remove clear button from array
//   someButtons.forEach (btn => btn.disabled = visibility);

//   equalSignButtonVisibility(visibility);
// }

// function clearDisplay () {
//   displayDiv.textContent = '|'
//   displayValue = '';
// }

// function displayButtonClick (e) {
//   displayDiv.style.fontSize='1.2em';
//   disableAllButtonsExceptClear(false);
//   console.log(this);
//   if (this.classList[1] === 'clear-btn') {
//     clearDisplay();
//   } else {
//     if (/\d/g.test(this.value)) { //if it's a digit
//       userEntryMode = true;
//       operatorButtonVisibility(false);
//       backspaceButtonVisibility(false);
//       if (operatorRecentlyPressed) { //if operator button pressed recently then reenable decimal button
//         decimalButtonVisibility(false);
//       } else {
//         decimalButtonVisibility(true);
//       }
//     } else if (this.value == '←') { //if backspace button
//       if (userEntryMode && displayDiv.textContent !== '|') {
//         if (displayValue.length == 1) {
//           displayDiv.textContent = '|';
//         } else {
//           displayValue = displayValue.slice(0,-1);
//           displayDiv.textContent = displayValue;
//           if (/\+|\-|\×|\÷/g.test(displayValue.slice(-1, displayValue.length))) { //if the last thing in the display value is an operator then disable equals
//             equalSignButtonVisibility(true);
//           }
//         }
//       }
//       return;
//     } else { //if it's an operator NOT backspace
//       userEntryMode = true;
//       operatorButtonVisibility(true);
//       backspaceButtonVisibility(false);
//       equalSignButtonVisibility(true);

//       if (this.value == '.') {
//         operatorRecentlyPressed = false;
//         console.log(`ORP = ${operatorRecentlyPressed}`);
//       } else {
//         operatorRecentlyPressed = true;
//       }
//     }

//     if (displayValue != 0) {
//        displayValue += this.value;
//     } else {
//       displayValue = this.value;
//     }

//     if (displayDiv.textContent === '|') {
//       displayDiv.textContent = this.value;
//     } else {
//       displayDiv.textContent += this.value;
//     }
//   }
// }

// function parsingInput () {
//   userEntryMode = false;
//   backspaceButtonVisibility(true);
//   console.log(`\n\n$ dv = ${displayValue}\n\n`);
//   displayDiv.style.fontSize='1.2em';
//   operatorButtonVisibility(false);
//   decimalButtonVisibility(false);
//   if (displayValue.length == 0) {
//     clearDisplay();
//     console.log(`empty input`);
//     return;
//   }

//   const regexOperators = /\+|\-|\×|\÷/g
//   const regexDigits = /\d|\./g

//   let digits = displayValue.split(regexOperators);

//   //If user inputs only one number and a operator, filter out the blank space from the array
//   digits = digits.filter(el => {
//     console.log(`el = ${el.length}`);
//     if (el.length > 0) {
//       return true; //keep element its length is > 0
//     }
//   });

//   let operators = displayValue.replace(regexDigits, '').split('');

//   console.log(`digits = ${digits}`);
//   console.log(`operators = ${operators}`);
//   console.log(`dv = ${displayValue}`);

//   let result = 0

//   if (displayValue.length > 0 && operators.length > 0) {
//     if ((operators.length % 2 != 0 && digits.length % 2 == 0) || (operators.length % 2 == 0 && digits.length % 2 != 0)) {
//       if ((operators.length > 0 && digits.length != 0) || (operators.length != 0 && digits.length > 0)) {
//         console.log(`validddd`);
//         for (let i = 0; i < operators.length; i++) {
//           try {
//             result = operate(operators[i], Number(digits[i]), Number(digits[i + 1]));
//             digits[i+1] = result //Saves result in digit arr to be used for next operation
//             if (!Number.isInteger(result)) {
//               result = result.toFixed(2);
//             }
//             console.log(`result = ${result}`);
//             displayDiv.textContent = result;
//             displayValue = result;
//           } catch (error) {
//             displayDiv.style.fontSize='0.9em';
//             displayDiv.textContent = error; //divide by zero error
//             disableAllButtonsExceptClear(true);
//           }

//         }
//       } else {
//         console.log(`display clear 1`);
//         clearDisplay();
//       }
//     } else { //incorrect input
//       console.log(`display clear 2`);
//       clearDisplay();
//     }
//   } else {
//     console.log(`BAD INPUT`);
//   }
// }

// calculatorButton.forEach(btn =>
//   btn.addEventListener('click', displayButtonClick)
// )
// equalsButton.addEventListener('click', parsingInput)

const numButtons = document.querySelectorAll('.number-btn');
const opButtons = document.querySelectorAll('.op-btn');
const equalButton = document.querySelector('.equals-btn');
const topScreen = document.querySelector('.top');
const bottomScreen = document.querySelector('.bottom');

// Event listeners
numButtons.forEach(btn =>
  btn.addEventListener('click', () => parseNumber(btn.textContent))
)
opButtons.forEach(btn =>
  btn.addEventListener('click', () => parseOperator(btn.textContent))
)
equalButton.addEventListener('click', evaluate);

let firstOperand = '';
let secondOperand = '';
let operator = '';
let firstOperandEntered = false;
let operatorEntered = false;
let secondOperandEntered = false;
let equalsButtonPressed = false;

function parseNumber(val) {
  if (!operatorEntered) {
    firstOperand += val;
    firstOperandEntered = true;
    displayContent(firstOperand);
  } else {
    secondOperand += val;
    displayContent();
    secondOperandEntered = true;
  }
  console.log(`1st = ${firstOperand}`);
  console.log(`2nd = ${secondOperand}`);
}

function parseOperator(val) {
  if (operator == '' && firstOperandEntered == true) {
    operatorEntered = true;
    operator = val;
    displayContent();
  }

  if (secondOperandEntered) {
    evaluate();
  }
  console.log(`Operand = ${operator}`);
}

function evaluate(e) {
  try {
    firstOperand = operate(operator, firstOperand, secondOperand);
    equalsButtonPressed = true;
    displayContent();
    operator = '';
    secondOperand = '';
    firstOperandEntered = true;
    secondOperandEntered = false;
    operatorEntered = false;
    console.log(`Answer = ${firstOperand}`);
  } catch (error) {
    topScreen.textContent = error;
    bottomScreen.textContent = '|';
    resetValues();
  }
}

function displayContent() {
  if (equalsButtonPressed) {
    topScreen.textContent = `${topScreen.textContent} ${secondOperand} =`
    bottomScreen.textContent = `${firstOperand}`
    equalsButtonPressed = false;
  } else if (secondOperandEntered) { // scenario where an operator is entered instead of pressing equals
    topScreen.textContent = `${firstOperand} ${operator}`
    bottomScreen.textContent = `${firstOperand}`

  } else {
    if (!operatorEntered) { //if no operator is present
      bottomScreen.textContent = `${firstOperand}`;
    } else if (secondOperand == '') { //if the operator is present but NO 2nd operand
      topScreen.textContent = `${firstOperand} ${operator}`;
    } else { // display 2nd operand
      bottomScreen.textContent = `${secondOperand}`;
    }
  }
}

function operate(operator, num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  switch (operator) {
    case '+':
      return add(num1, num2);
    case '-':
      return subtract(num1, num2);
    case '×':
      return multiply(num1, num2);
    case '÷':
      if (num2 === 0) {
        throw "You can't divide by zero..";
      }
      return divide(num1, num2);
    default:
      break;
  }
}

function resetScreen() {
  topScreen.textContent = '\xA0'; //non-breaking space
  bottomScreen.textContent = '|';
}

function resetValues() {
  firstOperand = '';
  secondOperand = '';
  operator = '';
  firstOperandEntered = false;
  secondOperandEntered = false;
  operatorEntered = false;
  equalsButtonPressed = false;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}
