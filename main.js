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
plusMinus.addEventListener('click', plusMinusHandler);
percent.addEventListener('click', percentHandler);
backspace.addEventListener('click', backspaceHandler);
nums.forEach(num => {
    num.addEventListener('click', numberHandler);
});
decimal.addEventListener('click', decimalHandler);
equals.addEventListener('click', equalHandler);
operators.forEach(oper => {
    oper.addEventListener('click', operationHandler)
});
factorialNode.addEventListener('click', factorialHandler);

//Event listener for keyPress
window.addEventListener('keydown', e => {
    if (document.querySelector(`[value='${e.key}']`) && isValidNum(e.key)) {
        return numberHandler(e, e.key);
    }
    if (e.key === '.') {
        return decimalHandler(e);
    }
    if (e.key === '=') {
        return equalHandler(e);
    }
    if (e.key === '+') {
        return operationHandler(e, document.querySelector('[value="add"]'));
    }
    if (e.key === '-') {
        return operationHandler(e, document.querySelector('[value="subtract"]'));
    }
    if (e.key === '*') {
        return operationHandler(e, document.querySelector('[value="multiply"]'));
    }
    if (e.key === '/') {
        return operationHandler(e, document.querySelector('[value="divide"]'));
    }
    if (e.key === '^') {
        return operationHandler(e, document.querySelector('[value="power"]'));
    }
    if (e.key === '!') {
        return factorialHandler(e, document.querySelector('[value="factorial"]'));
    }
    if (e.key === 'Enter') {
        return equalHandler(e);
    }
    if (e.key === 'Escape') {
        return clearHandler(e);
    }
    if (e.key === 'Backspace') {
        return backspaceHandler(e);
    }
    if (e.key === '–') {
        return plusMinusHandler(e);
    }
    if (e.key === '%') {
        return percentHandler(e);
    }
})

// Event handler functions
function clearHandler(event) {
    if (isValidNum(mainDisp.textContent) || calc.clearMainDisp) {
        if (isValidNum(calc.operand2) || calc.clearMiniDisp) {
            clearMiniDisp();
        }
        calc.total = null;
        updateMainDisp(null);
    } else {
        clearMiniDisp();
    }
}
function plusMinusHandler(event) {
    if (isValidNum(mainDisp.textContent)) {
        let numOnDisp = mainDisp.textContent.match(/-?\d+[.]?\d*/);
        numOnDisp *= -1;
        // numOnDisp = numOnDisp < 0 ? '(' + numOnDisp + ')' : numOnDisp;
        updateMainDisp(numOnDisp);
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
    if ((calc.clearMiniDisp && calc.clearMainDisp) || !isValidNum(mainDisp.textContent)) {
        clearHandler(event);
    } else {
        updateMainDisp(mainDisp.textContent.slice(0, -1));
    }
}
function numberHandler(event, val) {
    const num = val ? val : event.target.value;
    if (calc.clearMainDisp || mainDisp.textContent === '' || mainDisp.textContent === '0') {
        updateMainDisp(num);
        calc.clearMainDisp = false;
        if (calc.clearMiniDisp) {
            clearMiniDisp();
            calc.clearMiniDisp = false;
        }
    } else {
        updateMainDisp(mainDisp.textContent + num)
    }
}
function decimalHandler(event) {
    if (!mainDisp.textContent.includes('.') || calc.clearMainDisp) {
        if (mainDisp.textContent === '' || mainDisp.textContent === '0' || calc.clearMainDisp) {
            updateMainDisp('0.');
            calc.clearMainDisp = false;
            if (calc.clearMiniDisp) {
                clearMiniDisp();
                calc.clearMiniDisp = false;
            }
        } else {
            numberHandler(event, '.');
        }
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
function operationHandler(event, val) {    // Transition to state 3  
    if (isValidNum(mainDisp.textContent) || (mainDisp.textContent === '' && isValidNum(miniDisp.textContent))) { // reject transition from state 1 and invalid mainDisp
        if (isNull([calc.operand1, calc.operand2, calc.operatorTarget, calc.total])) { // accept transition from state 2, 5, and 6
            storeMainDispValIn('operand1');
        } else if (isValidNum(mainDisp.textContent)) { // Handle transition from state 4
            storeMainDispValIn('operand2');
            calc.operand1 = operate(window[calc.operatorTarget.value], calc.operand1, calc.operand2);
        }
        calc.operand2 = null;
        calc.total = null;
        calc.operatorTarget = val ? val : event.target.value ? event.target : event.target.parentNode;
        // calc.operatorTarget = event.target.value ? event.target : event.target.parentNode;
        calc.clearMainDisp = false;
        calc.clearMiniDisp = false;
        updateMiniDisp();
        updateMainDisp(null);
    }
}
function factorialHandler(event, val) {
    if (isValidNum(mainDisp.textContent) || (mainDisp.textContent === '' && isValidNum(miniDisp.textContent))) { //reject transition from state 1 and invalid mainDisp 
        if (isNull([calc.operand1, calc.operand2, calc.operatorTarget, calc.total])) { // accept transition from state 2, 5, and 6
            storeMainDispValIn('operand1');
            calc.total = calc.operand1 >= 0 || !Number.isInteger(calc.operand1) ? factorial(Math.abs(calc.operand1)) : -1 * factorial(Math.abs(calc.operand1));
            calc.operatorTarget = val ? val : event.target;
            calc.operand2 = null;
        } else if(isValidNum(mainDisp.textContent)) { //handle transition from state 4
            storeMainDispValIn('operand2');
            calc.operand2 = calc.operand2 >= 0 || !Number.isInteger(calc.operand2) ? factorial(Math.abs(calc.operand2)) : -1 * factorial(Math.abs(calc.operand2));
            calc.total = operate(window[calc.operatorTarget.value], calc.operand1, calc.operand2);     
        } else { //handle transition from state 3
            calc.total = calc.operand1 >= 0  || !Number.isInteger(calc.operand1) ? factorial(Math.abs(calc.operand1)) : -1 * factorial(Math.abs(calc.operand1));
            calc.operatorTarget = val ? val : event.target;
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
    calc.operand1 = null;
    calc.operatorTarget = null;
    calc.operand2 = null;
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
    return b === 0 ? 'division by zero unallowed' : a / b;
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
    calc.clearMainDisp = true;
    calc.clearMiniDisp = true;
    return 'non-integer factorial unsupported';
};
function operate(operator, a, b) {
    const result = operator(a, b);
    if (isValidNum(result)) {
        return Math.round(operator(a, b) * 100) / 100;    
    }
    return result;
}

// Startup sequence
mainDisp.textContent = null;
miniDisp.textContent = null;