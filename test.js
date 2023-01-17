const numButtons = document.querySelectorAll('.number-btn');
const opButtons = document.querySelectorAll('.op-btn');
const equalButton = document.querySelector('.equals-btn');
const clearButton = document.querySelector('.clear-btn');
const backSpaceButton = document.querySelector('.backspace-btn');
const topScreen = document.querySelector('.top');
const bottomScreen = document.querySelector('.bottom');

// Event listeners
numButtons.forEach(btn => btn.addEventListener('click', () => parseNumber(btn.textContent)));
opButtons.forEach(btn =>btn.addEventListener('click', () => parseOperator(btn.textContent)));
equalButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', resetDisplay);
backSpaceButton.addEventListener('click', backSpaceDisplay);

let firstOperand = '';
let secondOperand = '';
let operator = '';
let equalsPressed = false;

function parseNumber(val) {
    if (bottomScreen.textContent == '0' && firstOperand == '') { // Default state
        resetBottomScreen();
        bottomScreen.textContent += val;
        firstOperand += val;
    } else if (topScreen.textContent == '\xA0') { // If operator hasn't been entered
        bottomScreen.textContent += val;
        firstOperand += val;
    } else if (/(\+|\-|\×|\÷)/g.test(topScreen.textContent) && !(equalsPressed)) { // If operator HAS been entered 
        resetBottomScreen();
        secondOperand += val;
        bottomScreen.textContent += secondOperand;
    } else if (bottomScreen.textContent == secondOperand) { // 
        bottomScreen.textContent += val;
        secondOperand += val;
    }
    console.log(`1st = ${firstOperand}, 2nd = ${secondOperand}, op = ${operator}`);
}

function parseOperator(val) {
    if (val == '.') { // If val is a decimal
        if (firstOperand != '') { // If one or more operands has been entered
            if (/(\+|\-|\×|\÷)/g.test(topScreen.textContent) && !(equalsPressed)) { // If operator HAS been entered 
                // 2nd operand
                if (!secondOperand.includes('.')){ // If operand doesn't have a decimal
                    secondOperand += val;
                    bottomScreen.textContent += '.';
                }
            } else {
                // 1st operand
                if (!firstOperand.includes('.')){ // If operand doesn't have a decimal
                    firstOperand += val;
                    bottomScreen.textContent += '.';
                }
            }
        }
    }
    else if (topScreen.textContent == '\xA0' && bottomScreen.textContent != '0') { //If NO operator has been entered
        topScreen.textContent += `${firstOperand} ${val}`
        operator = val;
    } else if (bottomScreen.textContent == firstOperand) { // If you user wants to change operator
        equalsPressed = false;
        operator = val;
        topScreen.textContent = `${firstOperand} ${val}`
    } else if (bottomScreen.textContent == secondOperand) { // If user presses operator after another operator before pressing equals
        firstOperand = evaluate()
        secondOperand = '';
        topScreen.textContent = `${firstOperand} ${val}`
        bottomScreen.textContent = `${firstOperand}`
    }
    console.log(`1st = ${firstOperand}, 2nd = ${secondOperand}, op = ${operator}`);
}

function evaluate(e) { //if equals button pressed
    if (e == undefined) { // if function NOT called by equals button
        try {
            return operate(operator, firstOperand, secondOperand);   
        } catch (divideZeroError) {
            alert(divideZeroError);
            resetDisplay();
        }
    } else { // if equals button pressed
        if (secondOperand != '') { // if second operand has been entered
            topScreen.textContent = `${firstOperand} ${operator} ${secondOperand} =`;
            try {
                firstOperand = operate(operator, firstOperand, secondOperand);  
                bottomScreen.textContent = `${firstOperand}`;
                secondOperand = ''
                operator = ''
                equalsPressed = true;
            } catch (divideZeroError) {
                alert(divideZeroError);
                resetDisplay();
            }
        }
    }
}

function backSpaceDisplay () {

    if (firstOperand != '') { // If one or more operands has been entered
        if (/(\+|\-|\×|\÷)/g.test(topScreen.textContent) && !(equalsPressed)) { // If operator HAS been entered 
            // 2nd operand
            bottomScreen.textContent = bottomScreen.textContent.slice(0,-1);
            secondOperand = String(Number(secondOperand/10));
        } else {
            // 1st operand
            bottomScreen.textContent = bottomScreen.textContent.slice(0,-1);
            firstOperand = String(Number(firstOperand/10));
        }
        
    }
    
}

function resetBottomScreen () {
    bottomScreen.textContent = '';
}

function resetDisplay () {
    topScreen.textContent = '\xA0';
    bottomScreen.textContent = '0';
    resetValues();
}

function resetValues () {
    firstOperand = '';
    secondOperand = '';
    operator = '';
    equalsPressed = false;
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
            let temp = divide(num1, num2);
            if (Number.isInteger(temp)) {
                return temp;
            } else {
                return temp.toFixed(2);
            }
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