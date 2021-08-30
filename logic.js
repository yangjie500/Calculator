const numBtn = document.querySelectorAll('.btn');
const opBtn = document.querySelectorAll('.btn-b');
const clearBtn = document.querySelectorAll('.btn-c');
const equalBtn = document.querySelector('.btn-d')
const mainDisplay = document.querySelector('.current-number');
const subDisplay = document.querySelector('.memory');

function rounding(number) {
    number = parseFloat((Math.round(number + "e+2")  + "e-2"))
    
    if (number.toString().length > 8) {
        return number.toExponential(2)
    }
    console.log(number)
    return number
}

function calculate(e, numberFirst, numberSecond, operator) {

    numberFirst = parseFloat(numberFirst);
    numberSecond = parseFloat(numberSecond);

    switch (operator) {
        case "+" :
            return ["", rounding(numberFirst + numberSecond).toString()];
        case "-" :
            return ["", rounding(numberFirst - numberSecond).toString()];
        case "×" :
            return ["", rounding(numberFirst * numberSecond).toString()];
        case "÷" :
            return ["", rounding(numberFirst / numberSecond).toString()];
        case "^" :
            return ["", rounding(Math.pow(numberFirst, numberSecond)).toString()];
    }
    
}

function displayNum(e, number1, number2, operator) {
    if (e.target.textContent === "=") {
        mainDisplay.textContent = number1;
        subDisplay.textContent = number2;
        return
    }
    mainDisplay.textContent = number1;
    if (operator !== "") {
        subDisplay.textContent = `${number2} ${operator}`;
        return
    }
    subDisplay.textContent = number2;
}

function clear(e, number1, number2, operator) {
    if (e.target.textContent === 'AC') {
        number1 = "";
        number2 = "";
        operator = "";
        return [number1, number2, operator];
    } else {
       return [number1.substring(0, mainDisplay.textContent.length - 1), number2, operator];
    }
}

function appendNum(e, number) {
    if (number.includes('.') && e.target.textContent === '.') return number;
    number = number + e.target.textContent;
    return number;
    
}

function getOperator(e, number1, number2, prevOperator) {
    const op = e.target.textContent;

    if (number1 === "" && number2 !== "") return [number1, number2, op];

    if (number1 === "") return [number1, number2, ""]

    if (number2 !== "" && number1 !== "") {
        console.log(number1)
        console.log(number2)    
        console.log(prevOperator);
        [number1, number2] = calculate(e, number2, number1, prevOperator);
        return [number1, number2, op];
    }

    return ["", number1, op]
}

function logic() {
    let currentOperand = ""; 
    let prevOperand = "";
    let operator = "";

    numBtn.forEach((elem) => {
        elem.addEventListener('click', (e) => {
            currentOperand = appendNum(e, currentOperand);
            displayNum(e, currentOperand, prevOperand, operator);
        })
    });

    clearBtn.forEach((elem) => {
        elem.addEventListener('click', (e) => {
            [currentOperand, prevOperand, operator] = clear(e, currentOperand, prevOperand, operator);
            displayNum(e, currentOperand, prevOperand, operator);
        })
    })

    opBtn.forEach((elem) => {
        elem.addEventListener('click', (e) => {
            [currentOperand, prevOperand, operator] = getOperator(e, currentOperand, prevOperand, operator);
            displayNum(e, currentOperand, prevOperand, operator);
        })
    })

    equalBtn.addEventListener('click', (e) => {
        [currentOperand, prevOperand] = calculate(e, prevOperand, currentOperand, operator)
        displayNum(e, prevOperand, currentOperand, "")
    })
}


window.onload = logic();