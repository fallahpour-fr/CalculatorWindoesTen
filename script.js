'use strict'

const numberButton = Array.from(document.querySelectorAll('.row-button__number'));
const operatorButton = Array.from(document.querySelectorAll('.row-button__operator'));
const backspaceButton = document.querySelector('.row-button__key--backspace');
const clearButton = document.querySelector('.row-button__key--clear');
const clearAllButton = document.querySelector('.row-button__key--clearAll');
const equalButton = document.querySelector('.row-button__equal');
const inputHeader = document.querySelector('.calculator__header__number-input');
const outputHeader = document.querySelector('.calculator__header__number-output');
let save = 0;
let data = {
    opration: [],
    resulte: []
}

function nnn() {
    let save0 = changeStringToNumberExprission(data.resulte.slice(0, -2).join(''));
    let save1 = data.resulte.pop();
    document.querySelector('.calculator__header__number-input').value = save0;
    data.opration = [];
    data.resulte = [];
    data.opration.push(save0);
    data.resulte.push(save0, save1);
    console.log()
    document.querySelector('.calculator__header__number-output').value = data.resulte.join('');
    data.opration = [];
}
/* ..........................................................addEvent........................................... */

numberButton.forEach(element => {
    element.addEventListener('click', addNumberToArray);
})

operatorButton.forEach(element => {
    element.addEventListener('click', addOperatorToArray)
})
backspaceButton.addEventListener('click', deleteNumber)
clearButton.addEventListener('click', clearResulteNumber)
clearAllButton.addEventListener('click', clearResulteAndOprationNumber)
equalButton.addEventListener('click', calculate)


/* ...........................................................function......................................................... */

function changeStringToNumberExprission(str) {
    return Function(`'use strict'; return (${str})`)()
}


function addNumberToArray(e) {
    let element = e.target;
    console.log(data.resulte);
    if (element.innerText == '.' && data.resulte.includes('.') && data.opration.includes('.')) {
        data.resulte.push();
        data.opration.push();
    } else {
        data.resulte.push(element.innerText);
        data.opration.push(element.innerText);
    }
    console.log(data.resulte);
    inputResult();
};


function addOperatorToArray(e) {
    let element = e.target;
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
    console.log(data.resulte, data.opration);
    if (data.resulte.includes('=')) {
        document.querySelector('.calculator__header__number-output').value = '';
        let sum = changeStringToNumberExprission(data.resulte.slice(0, -1).join(''));
        data.resulte = [];
        data.opration = [];
        data.resulte.push(sum);
        data.opration.push(sum);
    } else {
        data.opration.pop();
        data.resulte.pop();
        document.querySelector('.calculator__header__number-output').value = data.resulte.join('');
        document.querySelector('.calculator__header__number-input').value = data.opration.join('');
    }
    console.log(data.resulte, data.opration);
}

function clearResulteNumber() {
    data.opration = [];
    document.querySelector('.calculator__header__number-input').value = data.opration.join('');
    console.log(data.opration);
}

function clearResulteAndOprationNumber() {
    data.resulte = [];
    data.opration = [0];
    document.querySelector('.calculator__header__number-output').value = data.resulte.join('');
    document.querySelector('.calculator__header__number-input').value = data.opration.join('');
    console.log(data.opration);
}

function calculate() {
    console.log(data.resulte);
    document.querySelector('.calculator__header__number-output').value = data.resulte.join('');
    save = data.resulte.slice(0, -1).join('');
    document.querySelector('.calculator__header__number-input').value = changeStringToNumberExprission(save);
    console.log(save, changeStringToNumberExprission(save));
}

/*..............................function independent to button...................................... */

function inputResult() {
    document.querySelector('.calculator__header__number-input').value = data.opration.join('');
}

function outputResult() {
    if (data.resulte.includes('=')) {
        nnn();
    } else {
        document.querySelector('.calculator__header__number-output').value = data.resulte.join('');
        data.opration = [];
    }

}

function outputResult2() {
    if (data.resulte.includes('=')) {
        nnn();
    } else {
        document.querySelector('.calculator__header__number-output').value = data.resulte.join('');
        let save0 = data.resulte.slice(0, -1).join('');
        document.querySelector('.calculator__header__number-input').value = changeStringToNumberExprission(save0);
        data.opration = [];
    }
}