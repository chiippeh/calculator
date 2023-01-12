const calculatorButton = document.querySelectorAll('.calc-btn');
const operatorButtons = document.querySelectorAll('.op-btn');
const equalsButton = document.querySelector('.equal-btn');
const displayDiv = document.querySelector('.num-display');
let displayValue = ''
let operatorRecentlyPressed = true;

function add (a, b) {
  return a + b;
}

function subtract (a, b) {
  return a - b;
}

function multiply (a, b) {
  return a * b;
}

function divide (a, b) {
  return a / b;
}

function operate (operator, num1, num2) {
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

function operatorButtonVisibility (visibility) {
  operatorButtons.forEach (btn => btn.disabled = visibility);
}

function decimalButtonVisibility (visibility) {
  document.querySelector('.decimal-btn').disabled = visibility;
}

function disableAllButtonsExceptClear (visibility) {
  const someButtons = [...document.querySelectorAll('.calc-btn')];
  someButtons.splice(0,1); //remove clear button from array
  someButtons.forEach (btn => btn.disabled = visibility);
  
  document.querySelector('.equal-btn').disabled = visibility; //disable equal button
}

function clearDisplay () {
  displayDiv.textContent = '|'
  displayValue = '';
}

function displayButtonClick (e) {
  displayDiv.style.fontSize='1.2em';
  disableAllButtonsExceptClear(false);
  console.log(this);
  if (this.classList[1] === 'clear-btn') {
    clearDisplay();
  } else {
    if (/\d/g.test(this.value)) { //if it's a digit
      operatorButtonVisibility(false);
      if (operatorRecentlyPressed) { //if operator button pressed recently then reenable decimal button
        decimalButtonVisibility(false);
      } else {
        decimalButtonVisibility(true);
      }
    } else { //if it's an operator
      operatorButtonVisibility(true);
      if (this.value == '.') { 
        operatorRecentlyPressed = false;
        console.log(`ORP = ${operatorRecentlyPressed}`);
      } else {
        operatorRecentlyPressed = true;
      }
    } 

    if (displayValue != 0) {
      displayValue += this.value;
    } else {
      displayValue = this.value;
    }
  
    if (displayDiv.textContent === '|') {
      displayDiv.textContent = this.value;
    } else {
      displayDiv.textContent += this.value;
    }
  }
    

  
 
}

function parsingInput () {
  console.log(`\n\n$ dv = ${displayValue}\n\n`);
  displayDiv.style.fontSize='1.2em';
  operatorButtonVisibility(false);
  decimalButtonVisibility(false);
  if (displayValue.length == 0) {
    clearDisplay();
    console.log(`empty input`);
    return;
  }

  const regexOperators = /\+|\-|\×|\÷/g
  const regexDigits = /\d|\./g

  let digits = displayValue.split(regexOperators);

  //If user inputs only one number and a operator, filter out the blank space from the array
  digits = digits.filter(el => {
    console.log(`el = ${el.length}`);
    if (el.length > 0) {
      return true; //keep element its length is > 0
    }
  });

  let operators = displayValue.replace(regexDigits, '').split('');

  console.log(`digits = ${digits}`);
  console.log(`operators = ${operators}`);
  console.log(`dv = ${displayValue}`);

  let result = 0

  if (displayValue.length > 0 && operators.length > 0) {
    if ((operators.length % 2 != 0 && digits.length % 2 == 0) || (operators.length % 2 == 0 && digits.length % 2 != 0)) {
      if ((operators.length > 0 && digits.length != 0) || (operators.length != 0 && digits.length > 0)) {
        console.log(`validddd`);
        for (let i = 0; i < operators.length; i++) {
          try {
            result = operate(operators[i], Number(digits[i]), Number(digits[i + 1]));
            digits[i+1] = result //Saves result in digit arr to be used for next operation
            if (!Number.isInteger(result)) {
              result = result.toFixed(2);
            }
            console.log(`result = ${result}`);
            displayDiv.textContent = result;
            displayValue = result;
          } catch (error) {
            displayDiv.style.fontSize='0.9em';
            displayDiv.textContent = error; //divide by zero error
            disableAllButtonsExceptClear(true);
          }
  
        }
      } else {
        console.log(`display clear 1`);
        clearDisplay();
      }
    } else { //incorrect input
      console.log(`display clear 2`);
      clearDisplay();
    }
  } else {
    console.log(`BAD INPUT`);
  }
}

calculatorButton.forEach(btn =>
  btn.addEventListener('click', displayButtonClick)
)
equalsButton.addEventListener('click', parsingInput)


//TODO
// Make negative math work
