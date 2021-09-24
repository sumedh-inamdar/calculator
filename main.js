/* Created by Sumedh Inamdar
See calcStates.numbers for state transition table
*/

// Global variables
let calc = {
    operand1: null,
    operand2: null,
    operatorTarget: null,
    total: null,
    clearMainDisp: true,
    clearMiniDisp: true
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
const factorialNode = document.querySelector('[value="factorial"]');

// Display Nodes
const mainDisp = document.querySelector('.mainDisp p');
const miniDisp = document.querySelector('.LHS_Disp p');

// Add event listeners for buttons
clear.addEventListener('click', clearHandler);
plusMinus.addEventListener('click', () => {
    if (mainDisp.textContent) {
        let numOnDisp = mainDisp.textContent.match(/-?\d+[.]?\d*/);
        numOnDisp *= -1;
        numOnDisp = numOnDisp < 0 ? '(' + numOnDisp + ')' : numOnDisp;
        updateMainDisp(numOnDisp);
    }
    
});
percent.addEventListener('click', percentHandler);
backspace.addEventListener('click', backspaceHandler);
nums.forEach(num => {
    num.addEventListener('click', numberHandler);
});
decimal.addEventListener('click', (e) => {
    if (!mainDisp.textContent.includes('.')) {
        if (mainDisp.textContent === '' || mainDisp.textContent === '0') {
            mainDisp.textContent = '0.';
            return;
        }
        numberHandler(e);
    }
});
equals.addEventListener('click', equalHandler);
operators.forEach(oper => {
    oper.addEventListener('click', operationHandler)
});
factorialNode.addEventListener('click', factorialHandler);

// Event handler functions
function clearHandler(event) {
    if (isValidNum(mainDisp.textContent)) {
        if (isValidNum(calc.operand2)) {
            clearMiniDisp();
        }
        calc.total = null;
        updateMainDisp(null);
    } else {
        clearMiniDisp();
    }
}
function percentHandler(event) {
    if (isValidNum(calc.operand1) && calc.operatorTarget && isValidNum(mainDisp.textContent) && !isValidNum(calc.operand2) && calc.operatorTarget.value !== 'power') {
        storeMainDispValIn('operand2');
        const operation = calc.operatorTarget.value;
        if (operation === 'add' || operation === 'subtract') {
            calc.total = operate(window[calc.operatorTarget.value], calc.operand1, (calc.operand1*calc.operand2)/100);
        } else {
            calc.total = operate(window[calc.operatorTarget.value], calc.operand1, calc.operand2/100);
        }
        calc.operand2 += '%';
        updateMiniDisp();
        updateMainDisp(calc.total);
        resetCalc();
    }
}
function backspaceHandler(event) {
    if (calc.clearMiniDisp && calc.clearMainDisp) {
        clearHandler(event);
    } else {
        updateMainDisp(mainDisp.textContent.slice(0, -1));
    }
}
function numberHandler(event) {
    // if (mainDisp.textContent === '' || mainDisp.textContent === '0') 
    if (calc.clearMainDisp || mainDisp.textContent === '' || mainDisp.textContent === '0') {
        updateMainDisp(event.target.value);
        calc.clearMainDisp = false;
        if (calc.clearMiniDisp) {
            clearMiniDisp();
            calc.clearMiniDisp = false;
        }
    } else {
        updateMainDisp(mainDisp.textContent + event.target.value)
    }
}
function equalHandler(event) {
    if(isValidNum(calc.operand1) && isValidNum(mainDisp.textContent) && calc.operatorTarget && !isValidNum(calc.operand2) && !isValidNum(calc.total)) {
        storeMainDispValIn('operand2');
        calc.total = operate(window[calc.operatorTarget.value], calc.operand1, calc.operand2);
        updateMiniDisp();
        updateMainDisp(calc.total);
        resetCalc();

    }
}
function operationHandler(event) {    // Transition to state 3
    if (isValidNum(mainDisp.textContent) || isValidNum(miniDisp.textContent)) { // reject transition from state 1
        if (isNull([calc.operand1, calc.operand2, calc.operatorTarget, calc.total])) { // accept transition from state 2, 5, and 6
            storeMainDispValIn('operand1');
        } else if (isValidNum(mainDisp.textContent)) { // Handle transition from state 4
            storeMainDispValIn('operand2');
            calc.operand1 = operate(window[calc.operatorTarget.value], calc.operand1, calc.operand2);
        }
        calc.operand2 = null;
        calc.total = null;
        calc.operatorTarget = event.target.value ? event.target : event.target.parentNode;
        calc.clearMainDisp = true;
        calc.clearMiniDisp = false;
        updateMiniDisp();
        updateMainDisp(null);
    }
}
function factorialHandler(event) {
    if (isValidNum(mainDisp.textContent) || isValidNum(miniDisp.textContent)) { //reject transition from state 1 and mainDisp 
        if (isNull([calc.operand1, calc.operand2, calc.operatorTarget, calc.total])) { // accept transition from state 2, 5, and 6
            storeMainDispValIn('operand1');
            calc.total = calc.operand1 > 0 ? factorial(Math.abs(calc.operand1)) : -1 * factorial(Math.abs(calc.operand1));
            calc.operatorTarget = event.target;
            calc.operand2 = null;
        } else if(isValidNum(mainDisp.textContent)) { //handle transition from state 4
            storeMainDispValIn('operand2');
            calc.operand2 = calc.operand2 > 0 ? factorial(Math.abs(calc.operand2)) : -1 * factorial(Math.abs(calc.operand2));
            calc.total = operate(window[calc.operatorTarget.value], calc.operand1, calc.operand2);     
        } else { //handle transition from state 3
            calc.total = calc.operand1 > 0 ? factorial(Math.abs(calc.operand1)) : -1 * factorial(Math.abs(calc.operand1));
            calc.operatorTarget = event.target;
        }
        updateMiniDisp();
        updateMainDisp(calc.total);
        resetCalc();
    }

}


// helper functions
function resetCalc() {
    calc.operand1 = null;
    calc.operand2 = null;
    calc.operatorTarget = null;
    calc.total = null;
    calc.clearMainDisp = true;
    calc.clearMiniDisp = true;
}
function isValidNum(input) {
    const regex = /-?\d+[.]?\d*/;
    return regex.test(input);
}
function isNull(arr) {
    return arr.every(val => !val); 
}
function storeMainDispValIn(key) {
    calc[key] = Number(mainDisp.textContent.match(/-?\d+[.]?\d*/));
}
function updateMiniDisp() {

    if (calc.operand1 !== null) {
        miniDisp.textContent = calc.operand1 < 0 ? '(' + calc.operand1 + ')' : calc.operand1;     
    } else {
        miniDisp.textContent = '';
    }

    if (calc.operatorTarget) { 
        if (calc.operatorTarget.value === 'power') {
            const sup = document.createElement('sup');
            sup.textContent = calc.operand2 ? calc.operand2 + ' = ' : '^';
            miniDisp.appendChild(sup);
            return;
        } else if (calc.operatorTarget.value === 'factorial') {
            miniDisp.textContent += '! = ';

        } else {
            miniDisp.textContent += ' ' + calc.operatorTarget.textContent + ' ';        
        }
    }

    if (calc.operand2 !== null) {
        miniDisp.textContent += calc.operand2 < 0 ? '(' + calc.operand2 + ') = ' : calc.operand2 + ' = ';
    } else {
        miniDisp.textContent += '';
    }
}
function clearMiniDisp() {
    for (let key in calc) calc[key] = null;
    updateMiniDisp();
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
    if (Number.isInteger(num)) {
        let total = 1;
        while (num > 0) {
          total *= num;
          num--;
        }
        return total;
    }
    return Number.NaN;
};
function operate(operator, a, b) {
    return Math.round(operator(a, b) * 100) / 100;
}

// Startup sequence
mainDisp.textContent = null;
miniDisp.textContent = null;