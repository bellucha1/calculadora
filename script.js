const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = '';
let previousInput = '';
let waitingForSecondOperand = false;

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.textContent;
        const op = e.target.dataset.op;

        if (op === 'C' || e.target.classList.contains('clear')) {
            currentInput = '';
            operator = '';
            previousInput = '';
            waitingForSecondOperand = false;
            display.textContent = '0';
            return;
        }

        if (op) {
            switch (op) {
                case 'sqrt':
                    if (currentInput !== '') {
                        let result = Math.sqrt(parseFloat(currentInput));
                        display.textContent = result;
                        currentInput = String(result);
                    }
                    return;
                case '=':
                    if (previousInput === '' || currentInput === '') {
                        return;
                    }
                    calculate();
                    waitingForSecondOperand = true;
                    return;
            }

            if (currentInput === '' && previousInput !== '') {
                operator = op;
                return;
            }

            if (waitingForSecondOperand) {
                operator = op;
                return;
            }

            if (previousInput !== '') {
                calculate();
            }

            operator = op;
            previousInput = currentInput;
            currentInput = '';
            waitingForSecondOperand = true;
            return;
        }

        if (value === '.') {
            if (!currentInput.includes('.')) {
                currentInput += value;
            }
        } else {
            currentInput += value;
        }
        
        display.textContent = currentInput;
    });
});

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) {
        return;
    }

    switch (operator) {
        case '+': result = prev + curr; break;
        case '-': result = prev - curr; break;
        case '*': result = prev * curr; break;
        case '/': result = prev / curr; break;
        case '^': result = Math.pow(prev, curr); break;
        default: return;
    }
    display.textContent = result;
    currentInput = String(result);
    previousInput = '';
}
