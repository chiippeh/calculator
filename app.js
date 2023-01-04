const calculatorButton = document.querySelectorAll('.calc-btn');
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
            return divide(num1, num2);
        default:
            break;
    }
}

function displayButtonClick (e) {
  displayValue += this.value;
  if (displayDiv.textContent === "|") {
    displayDiv.textContent = this.value;
  } else {
    displayDiv.textContent += this.value;
  }
  console.log(displayValue);
}

calculatorButton.forEach(btn => btn.addEventListener('click', displayButtonClick));