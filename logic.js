function add(a,b) {
    return a + b;
}

function minus(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    if (b===0) {
        return 'NaN'
    } 

    return a / b;
}

function power(a,b) {
    return Math.pow(a,b);
}

function operate(a,b, operate) {
}

function getNumber(e, numbers) {
    const name = e.target.classList[1];
    const number = name.substring(5);
    numbers.push(number);
    console.log(numbers)

}

function getOperation(e, numbers) {
    const name = e.target.classList[1];
    const operation = name.substring(5);
    console.log(numbers);
}

function displayMain(num) {
    const mainScreen = document.querySelector(".current-number");
    mainScreen.textContent = num;
}

function logic() {
    const buttonsA = document.querySelectorAll(".btn");
    const buttonsB = document.querySelectorAll(".btn-b");
    const buttonsC = document.querySelectorAll(".btn-c");
    const numbers = [];

    buttonsA.forEach((elem) => {
        elem.addEventListener('click', (e) => {getNumber(e, numbers)});

    });
    buttonsB.forEach((elem) => {
        elem.addEventListener('click', (e) => {getOperation(e, numbers)});
    });


}

window.onload = logic();