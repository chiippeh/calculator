const numButtons = document.querySelectorAll('.number-btn');
const opButtons = document.querySelectorAll('.op-btn');
const equalButton = document.querySelector('.equals-btn');
const topScreen = document.querySelector('.top');
const bottomScreen = document.querySelector('.bottom');

// Event listeners
numButtons.forEach(btn => btn.addEventListener('click', () => parseNumber(btn.textContent)))
opButtons.forEach(btn =>btn.addEventListener('click', () => parseOperator(btn.textContent)))
equalButton.addEventListener('click', evaluate);

let firstOperand = '';
let secondOperand = '';
let operator = '';
let operatorEntered = false;

function parseNumber(val) {
    if (bottomScreen.textContent === '0' || operatorEntered) { // Default start state
        resetBottomScreen()
    }
    bottomScreen.textContent += val;
}

function parseOperator(val) {
    if (bottomScreen.textContent !== '0' && !operatorEntered) { // If no operator has been entered
        operator = val;
        operatorEntered = true;
        evaluate
    } else { // Second operand has been entered 
    }
    console.log(`Operand = ${operator}`);
}

function evaluate(e) { //if equals button pressed
}

function displayContent() {
    // if (operator == '' && secondOperand == '') { //display 1st number on bottom screen
    //     bottomScreen.textContent = `${firstOperand}`;
    // }

    // if (operator != '' && secondOperand == '') { //display intermediate expression
    //     topScreen.textContent = `${firstOperand} ${operator}`;
    // }

    // if (operator != '' && secondOperand != '') { ///display 2nd number on bottom screen
    //     bottomScreen.textContent = `${secondOperand}`;
    // }




}

function resetBottomScreen() {
    // topScreen.textContent = '\xA0'; //non-breaking space
    bottomScreen.textContent = '';
}
  
function resetValues() {
    firstOperand = '';
    secondOperand = '';
    operator = '';
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