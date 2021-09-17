// Global variables
let calc = {
    operand1: null,
    operand2: null,
    operatorTarget: null,
    total: null
}

// Button Nodes
const clear = document.querySelector('#clear');
const plusMinus = document.querySelector('#plusMinus');
const percent = document.querySelector('#percent');
const backspace = document.querySelector('#backspace');
const nums = document.querySelectorAll('[name="number"]');
const decimal = document.querySelector('[value="."]');
const equals = document.querySelector('#equals');
const operators = document.querySelectorAll('.basicOper');

// const powerNode = document.querySelector('#power');
// const factorialNode = document.querySelector('#factorial');

// Display Nodes
const mainDisp = document.querySelector('.mainDisp p');
const miniDisp = document.querySelector('.LHS_Disp');

// Add event listeners for buttons
plusMinus.addEventListener('click', () => {
    mainDisp.textContent *= -1;
});
nums.forEach(num => {
    num.addEventListener('click', numberHandler);
});
decimal.addEventListener('click', (e) => {
    if (!mainDisp.textContent.includes('.')) {
        if (mainDisp.textContent === '') {
            mainDisp.textContent += '0';
        }
        numberHandler(e);
    }
});
equals.addEventListener('click', equalHandler);
operators.forEach(oper => {
    oper.addEventListener('click', operationHandler)
});


// Event handler functions
function numberHandler(event) {
    if (mainDisp.textContent == '') {
        mainDisp.textContent = event.target.value;
    } else {
        mainDisp.textContent += event.target.value;
    }
}
function equalHandler(event) {
    if(calc.operand1 && mainDisp.textContent && calc.operatorTarget) {
        storeMainDispValIn('operand2');
        calc.total = operate(window[calc.operatorTarget.value], calc.operand1, calc.operand2);
        updateMiniDisp();
        updateMainDisp(calc.total);
    }
}
function operationHandler(event) {    
    if (mainDisp.textContent || miniDisp.textContent) { // ignore click if no operand input yet
        if (!calc.operand1) {
            storeMainDispValIn('operand1');
        } else if (!calc.operand2) {
            storeMainDispValIn('operand2');
            calc.total = operate(window[calc.operatorTarget.value], calc.operand1, calc.operand2);
            calc.operand1 = calc.total;
            calc.operand2 = null;
        } else {
            return;
        }
        calc.operatorTarget = event.target;
        updateMiniDisp();
        updateMainDisp(null);
        
    }
}

// helper functions
function storeMainDispValIn(key) {
    calc[key] = Number(mainDisp.textContent);
}
function updateMiniDisp() {
    miniDisp.textContent = calc.operand1 + ' ' + calc.operatorTarget.textContent + ' '; 
    miniDisp.textContent += calc.operand2 ? calc.operand2 + ' = ': '';
}
function updateMainDisp(str) {
    mainDisp.textContent = str;
}


// Operator functions
function add(a, b) {
    return  a + b;
};
function subtract(a, b) {
    return a - b;
};
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}
function power(a, b) {
	return a ** b;
};
function factorial(num) {
	let total = 1;
  while (num > 0) {
    total *= num;
    num--;
  }
  return total;

};
function operate(operator, a, b) {
    return operator(a, b);
}

// Startup sequence
mainDisp.textContent = null;
miniDisp.textContent = null;