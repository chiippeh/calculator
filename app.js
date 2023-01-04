const calculatorButton = document.querySelectorAll('.calc-btn');
const equalsButton = document.querySelector('.equal-btn');
const displayDiv = document.querySelector('.num-display');
let displayValue = "";

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
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);                
        case '/':
            if (num2 === 0) {
              throw "You can't divide by zero.."
            }
            return divide(num1, num2);
        default:
            break;
    }
}

function operatorButtonVisibility (visibility) {
      document.querySelector('.plus-btn').disabled = visibility;
      document.querySelector('.minus-btn').disabled = visibility;
      document.querySelector('.divide-btn').disabled = visibility;
      document.querySelector('.multiply-btn').disabled = visibility;
}

function displayButtonClick (e) {
  console.log(this);
  if (this.classList[1] === 'clear-btn') {
    displayDiv.textContent = '|';
    displayValue = 0;
  } else {
    if (/\d/g.test(this.value)) {
      operatorButtonVisibility(false);
    } else {
      operatorButtonVisibility(true);
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
  operatorButtonVisibility(false);
  const regexDigits = /\+|\-|\*|\//g;
  const regexOperators = /\d/g
  let digits = displayValue.split(regexDigits);
  let operators = displayValue.replace(regexOperators, '').split('');
  let result = 0;

  try {
    for (let i = 0; i < operators.length; i++) {
        numAns = operate(operators[i], Number(digits[i]), Number(digits[i+1]),);
        result = numAns; 
        digits[i+1] = result;
        console.log(`total = ${result}\n`);
    }

    if (operators.length > 0) {
      if (!Number.isInteger(result)) {
        result = result.toFixed(2);
      }
      displayDiv.textContent = result;
    } else {
      displayDiv.textContent = displayValue;
    }

    console.log(displayValue);
    console.log(digits);
    console.log(operators); 
  } catch (error) {
    displayDiv.textContent = error;
  }
}

calculatorButton.forEach(btn => btn.addEventListener('click', displayButtonClick));
equalsButton.addEventListener('click', parsingInput);