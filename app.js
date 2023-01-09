const calculatorButton = document.querySelectorAll('.calc-btn')
const equalsButton = document.querySelector('.equal-btn')
const displayDiv = document.querySelector('.num-display')
let displayValue = ''

function add (a, b) {
  return a + b
}

function subtract (a, b) {
  return a - b
}

function multiply (a, b) {
  return a * b
}

function divide (a, b) {
  return a / b
}

function operate (operator, num1, num2) {
  switch (operator) {
    case '+':
      return add(num1, num2)
    case '-':
      return subtract(num1, num2)
    case '×':
      return multiply(num1, num2)
    case '÷':
      if (num2 === 0) {
        throw "You can't divide by zero.."
      }
      return divide(num1, num2)
    default:
      break
  }
}

function operatorButtonVisibility (visibility) {
  document.querySelector('.plus-btn').disabled = visibility
  document.querySelector('.minus-btn').disabled = visibility
  document.querySelector('.divide-btn').disabled = visibility
  document.querySelector('.multiply-btn').disabled = visibility
}

function clearDisplay () {
  displayDiv.textContent = '|'
  displayValue = '';
}

function displayButtonClick (e) {
  displayDiv.style.fontSize='1.2em';
  console.log(this)
  if (this.classList[1] === 'clear-btn') {
    clearDisplay();
  } else {
    if (/\d/g.test(this.value)) {
      operatorButtonVisibility(false)
    } else {
      operatorButtonVisibility(true)
    }
    if (displayValue != 0) {
      displayValue += this.value
    } else {
      displayValue = this.value
    }

    if (displayDiv.textContent === '|') {
      displayDiv.textContent = this.value
    } else {
      displayDiv.textContent += this.value
    }
  }
}

function parsingInput () {
  displayDiv.style.fontSize='1.2em';
  operatorButtonVisibility(false);

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

            if (!Number.isInteger(result)) {
              result = result.toFixed(2);
            }
            console.log(`result = ${result}`);
            displayDiv.textContent = result;
            displayValue = result;
          } catch (error) {
            displayDiv.style.fontSize='0.9em';
            displayDiv.textContent = error;
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
