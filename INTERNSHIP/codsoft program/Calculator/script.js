const display = document.getElementById('display');
let currentOperand = '';
let previousOperand = '';
let operation = null;

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;
        const action = button.dataset.action;

        if (action === 'clear') {
            clear();
        } else if (action === 'calculate') {
            calculate();
        } else if (button.classList.contains('operator')) {
            chooseOperation(value);
        } else {
            appendNumber(value);
        }
    });
});

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand += number;
    updateDisplay();
}

function chooseOperation(selectedOperation) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculate();
    }
    operation = selectedOperation;
    previousOperand = currentOperand;
    currentOperand = '';
}

function calculate() {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentOperand = result;
    operation = null;
    previousOperand = '';
    updateDisplay();
}

function updateDisplay() {
    display.innerText = currentOperand;
}

function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    updateDisplay();
}
