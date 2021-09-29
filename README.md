# calculator

<a href="https://sumedh-inamdar.github.io/calculator/">link to page</a>

## Features:
- Basic function operators (add, subtract, multiply, divide)
- Exponents
- Factorials (integers only)
- Negation of inputted number (+/-)
- Percent calculation
    - Operand + basic operator + % (e.g. 15 + 20% = 18)
- Mini and main display
    - Mini display shows any operands and operators currently stored in memory
    - Main display shows current user input and calculation total (post equals or percent)
- Full keyboard support (hover over button for keystroke mapping)
- Clear (or press Esc)
    - First click clears user input shown in main display
    - Second click clears any values stored in memory
    - Single click will always clear mini and main display after a completed calculation
- Backspace (or press delete)
    - Removes previous digit input by user (as shown in main display)
    - Values stored in memory (as shown in mini display) will get cleared if triggered after main display is clear
    - Single click will always clear mini and main display after a completed calculation
- Division by zero error handling
- Non-integer factorial error handling




## To do list:

Bugs to fix

- [x] Factorial->Equals
- [x] Factorial->clear(1 click)->Factorial
- [x] 0->Operator or operation that equals 0->operator
- [x] Num->Operator->Num->Percent->Operator
- [x] Handling of invalid display (NaN, Inf) -> Update storeMainDispValIn to check for invalid display and alert user accordingly
- [x] Division by zero -> Update division function to check for zero input and alert user accordingly
- [x] calculation that results in zero->decimal->number
- [x] operator with no num

JS

- [x] Create functions for math operators
- [x] Create function "operate" that takes 2 numbers and operator and calls operator above
- [x] Create function to populate display when number button is clicked and update display variable
- [x] Store display number and operation once operator is triggered
- [x] Call operate once second number
- [x] Clear button: 1st click for clearing mainDisp, 2nd click for clearing LHS_Disp
- [x] Add factorial function
- [x] Add keyboard support
- [ ] Add gamma function to support factorial of non-integer values

HTML / CSS

- [x] Create buttons for each digit, operator, and equals key
- [x] Create display
- [x] Create button for clear
- [x] Create button for backspace
- [x] Add styling (after above complete)
- [x] Mobile friendly
- [x] Fix top margin issue when reducing viewport
- [x] Add description to button when hovered over
- [x] Add footer
