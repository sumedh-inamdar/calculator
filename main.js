// Button Nodes
const clear = document.querySelector('#clear');
const plusMinus = document.querySelector('#plusMinus');
const percent = document.querySelector('#percent');
const backspace = document.querySelector('#backspace');
const nums = document.querySelectorAll('[name="number"]');
const decimal = document.querySelector('[value="."]');
const equals = document.querySelector('#equals');
const plusNode = document.querySelector('#plus');
const minusNode = document.querySelector('#minus');
const multiplyNode = document.querySelector('#multiply');
const divideNode = document.querySelector('#divide');
const powerNode = document.querySelector('#power');
const factorialNode = document.querySelector('#factorial');

// Display Nodes
const mainDisp = document.querySelector('.mainDisp p');

// Add event listeners for buttons
nums.forEach(num => {
    num.addEventListener('click', dispHandler);
});

decimal.addEventListener('click', (e) => {
    if (!mainDisp.textContent.includes('.')) {
        dispHandler(e);
    }
})

// Event handler functions
function dispHandler(event) {
    if (mainDisp.textContent == '0' && event.target.value !== '.') {
        mainDisp.textContent = event.target.value;
    } else {
        mainDisp.textContent += event.target.value;
    }
    
}

// Operator functions
const add = function(a, b) {
    return a + b;
};
const subtract = function(a, b) {
    return a - b;
};
const multiply = function(a, b) {
    return a * b;
}
const divide = function(a, b) {
    return a / b;
}
const power = function(a, b) {
	return a ** b;
};
const factorial = function(num) {
	let total = 1;
  while (num > 0) {
    total *= num;
    num--;
  }
  return total;

};
const operate = function(operator, a, b) {
    return operator(a, b);
}

// Startup sequence
mainDisp.textContent = '0';