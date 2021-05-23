'use strict'

const numberButton = Array.from(document.querySelectorAll('.row-button__number'));
const oprationButton = Array.from(document.querySelectorAll('.row-button__opration'));
const backspaceButton = document.querySelector('.row-button__key--backspace');
const clearButton = document.querySelector('.row-button__key--clear');
const clearAllButton = document.querySelector('.row-button__key--clearAll')
const equalButton = document.querySelector('.row-button__equal');
const inputHeader = document.querySelector('.calculator__header__number-input');
const outputHeader = document.querySelector('.calculator__header__number-output')
let save = 0;
let data = {
    opration: [],
    resulte: []
}

/* ..........................................................addEvent........................................... */

numberButton.forEach(element => {
    element.addEventListener('click', addNumberToArray);
})

oprationButton.forEach(element => {
    element.addEventListener('click', addOperationToArray)
})
backspaceButton.addEventListener('click', deleteNumber)
clearButton.addEventListener('click', clearResulteNumber)
clearAllButton.addEventListener('click', clearResulteAndOprationNumber)
equalButton.addEventListener('click', calculate)


/* ...........................................................function......................................................... */

function changeStringToNumericalExpression(str) {
    return Function(`'use strict'; return (${str})`)()
}


function addNumberToArray() {
    data.resulte.push(element.innerText);
    data.opration.push(element.innerText);
    console.log(data.resulte);
    inputResult();
};


function addOperationToArray() {
    let id = element.id;
    data.resulte.push(id);
    data.opration.push(id);
    if (id == '*' || id == '/') {
        outputResult();
        console.log('hi')
    }
    if (id == '+' || id == '-') {
        outputResult2();
        console.log('ho')
    }
}

function deleteNumber() {
    // data.resulte.pop();
    // data.opration.pop()
    console.log(data.resulte, data.opration);
    if (data.resulte.includes('=')) {
        document.querySelector('.calculator__header__number-output').value = '';

    }
}

function clearResulteNumber() {
    data.resulte = [];
    console.log(data.resulte);
}

function clearResulteAndOprationNumber() {
    data.resulte = [];
    data.opration = [];
    console.log(data.opration);
}

function calculate() {
    save = data.resulte.slice(0, -1).join('');
    let outputHeader = document.querySelector('.calculator__header__number-output').value = data.resulte.join('');
    let inputHeader = document.querySelector('.calculator__header__number-input').value = changeStringToNumberExprission(save);
    console.log(save, changeStringToNumberExprission(save));
}

function inputResult() {
    let inputHeader = document.querySelector('.calculator__header__number-input').value = data.opration.join('');
}

function outputResult() {
    let outputHeader = document.querySelector('.calculator__header__number-output').value = data.resulte.join('');
    data.opration = [];
}

function outputResult2() {
    let outputHeader = document.querySelector('.calculator__header__number-output').value = data.resulte.join('');
    let save0 = data.resulte.slice(0, -1).join('');
    let inputHeader = document.querySelector('.calculator__header__number-input').value = changeStringToNumberExprission(save0);
    data.opration = [];
}