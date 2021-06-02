'use strict'

const numberButton = Array.from(document.querySelectorAll('.row-button__number'));
const operatorButton = Array.from(document.querySelectorAll('.row-button__operator'));
const backspaceButton = document.querySelector('.row-button__key--backspace');
const clearButton = document.querySelector('.row-button__key--clear');
const clearAllButton = document.querySelector('.row-button__key--clearAll');
const equalButton = document.querySelector('.row-button__equal');
const inputHeader = document.querySelector('.calculator__header__number-input');
const outputHeader = document.querySelector('.calculator__header__number-output');
const negetiveOrPositiveBtn = document.querySelector('.row-button--NegetiveOrPositive');
const oneDividedByNumberBtn = document.querySelector('.row-button--oneDividedByX');
const squareOfNumberBtn = document.querySelector('.row-button--squareOfNumber');
const radicalOfNumberBtn = document.querySelector('.row-button--radical');
// const memoryAndHistoryLink = document.querySelector('.memory-history__link');
const memoryLinkBtn = document.querySelector('.memoryLink');
const historyLinkBtn = document.querySelector('.historyLink');
const memoryHistoryResult = document.querySelector('.memory-history__result');
const recycleButton = document.querySelector('.memory-history__recycle__icon');
const recyclePart = document.querySelector('.memory-history__recycle');
let j = 0;
let resulteTagContainer = document.createElement('div');
resulteTagContainer.setAttribute('class', `resulteTagContainer${j}`);
let save = 0;
let k = 0;
let data = {
    opration: [],
    resulte: []
}
let dataForMemory = {
    opration: [],
    resulte: []
}
/* ..........................................................addEventListener........................................... */

numberButton.forEach(element => {
    element.addEventListener('click', addNumberToArray);
})

operatorButton.forEach(element => {
    element.addEventListener('click', addOperatorToArray)
})
backspaceButton.addEventListener('click', deleteNumber);
clearButton.addEventListener('click', clearResulteNumber);
clearAllButton.addEventListener('click', clearResulteAndOprationNumber);
equalButton.addEventListener('click', calculate);
negetiveOrPositiveBtn.addEventListener('click', negativeOrPositiveNumber);
oneDividedByNumberBtn.addEventListener('click', oneDividedByNumber);
squareOfNumberBtn.addEventListener('click', squareOfNumber);
radicalOfNumberBtn.addEventListener('click', radicalOfNumber);
historyLinkBtn.addEventListener('click', historylink);
memoryLinkBtn.addEventListener('click', memorylink);
recycleButton.addEventListener('click', clearHistoryPart)

/* ...........................................................function ependent to button .................................................................. */


function changeStringToNumberExprission(str) {
    return Function(`'use strict'; return (${str})`)()
}


function addNumberToArray(e) {
    let element = e.target;
    console.log(data.resulte);
    if (data.resulte.indexOf('=') > -1) {
        data.resulte = [];
        data.opration = [];
        data.resulte.push(element.innerText);
        data.opration.push(element.innerText);
        document.querySelector('.calculator__header__number-output').value = '';
        console.log('equal');
    } else if (element.innerText == '.' && data.resulte.includes('.') && data.opration.includes('.')) {
        data.resulte.push();
        data.opration.push();
    } else {
        data.resulte.push(element.innerText);
        data.opration.push(element.innerText);
        console.log('why')
    }


    console.log(data.resulte, data.opration);
    inputResult();
};


function addOperatorToArray(e) {
    let element = e.target;
    let id = element.id;
    data.resulte.push(id);
    data.opration.push(id);
    if (id == '*' || id == '/') {
        outputResultClickOnMultiplicationAndDivision();
        console.log('hi')
    }
    if (id == '+' || id == '-') {
        outputResultClickOnAdditionAndSubtraction();
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
        // data.resulte.pop();
        // document.querySelector('.calculator__header__number-output').value = data.resulte.join('');
        document.querySelector('.calculator__header__number-input').value = data.opration.join('');
        console.log('2')
    }
    console.log(data.resulte, data.opration);
}

function clearResulteNumber() {
    data.opration = [];
    document.querySelector('.calculator__header__number-input').value = 0;
    console.log(data.opration);
}

function clearResulteAndOprationNumber() {
    data.resulte = [];
    data.opration = [];
    document.querySelector('.calculator__header__number-output').value = data.resulte.join('');
    document.querySelector('.calculator__header__number-input').value = 0;
    console.log(data.opration);
}

function calculate() {
    console.log(data.resulte);
    k++;
    document.querySelector('.calculator__header__number-output').value = data.resulte.join('');
    dataForMemory.resulte.push(data.resulte.join(''));
    save = data.resulte.slice(0, -1).join('');
    document.querySelector('.calculator__header__number-input').value = changeStringToNumberExprission(save);
    dataForMemory.opration.push(changeStringToNumberExprission(save));
    data.opration = [];
    data.opration.push(changeStringToNumberExprission(save));
    console.log(save, changeStringToNumberExprission(save), data.opration, data.resulte.join(''));
    saveData();
    saveInHistory();
}
/* ..............................Negative number Or Positive number................................. */

function negativeOrPositiveNumber() {
    let saveResulte = data.opration.join('');
    saveResulte = (-saveResulte);
    operationOnNumbers(saveResulte);
}

/* ................................. one number divided by X ....................................... */
function oneDividedByNumber() {
    let saveResulte = data.opration.join('');
    saveResulte = (1 / saveResulte)
    operationOnNumbers(saveResulte);
}
/* ........................................ square of number ....................................... */
function squareOfNumber() {
    let saveResulte = data.opration.join('');
    saveResulte = (saveResulte ** 2)
    operationOnNumbers(saveResulte);
}
/* ........................................ radical of number ....................................... */
function radicalOfNumber() {
    let saveResulte = data.opration.join('');
    saveResulte = (Math.sqrt(saveResulte))
    operationOnNumbers(saveResulte);
}
/*.......................................................................function independent to button............................................................. */

function checkOutputResult() {
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

function operationOnNumbers(saveResulte) {

    console.log(data.resulte);
    if (data.resulte.includes('=')) {
        data.resulte = [];
        data.resulte.push(saveResulte);
        document.querySelector('.calculator__header__number-input').value = saveResulte;
        console.log(data.opration, data.resulte)
        data.opration = [];
    } else {
        data.resulte.splice(data.resulte.length - data.opration.length, data.opration.length)
        data.resulte.push(saveResulte);
        document.querySelector('.calculator__header__number-input').value = saveResulte;
        console.log(data.opration, data.resulte)
        data.opration = [];
    }

}

function inputResult() {
    document.querySelector('.calculator__header__number-input').value = data.opration.join('');
}

function outputResultClickOnMultiplicationAndDivision() {
    if (data.resulte.includes('=')) {
        checkOutputResult();
    } else {
        document.querySelector('.calculator__header__number-output').value = data.resulte.join('');
        data.opration = [];
    }

}

function outputResultClickOnAdditionAndSubtraction() {
    if (data.resulte.includes('=')) {
        checkOutputResult();
    } else {
        document.querySelector('.calculator__header__number-output').value = data.resulte.join('');
        let save0 = data.resulte.slice(0, -1).join('');
        document.querySelector('.calculator__header__number-input').value = changeStringToNumberExprission(save0);
        data.opration = [];
    }
}

/* ................................................Button Memory And History.................................................. */

function historylink() {
    memoryLinkBtn.classList.remove('memory-history__link--border');
    historyLinkBtn.classList.add('memory-history__link--border');
}

function memorylink() {
    historyLinkBtn.classList.remove('memory-history__link--border');
    memoryLinkBtn.classList.add('memory-history__link--border')
}

/* ....................*/

function saveInHistory() {
    recyclePart.classList.remove('hidden');
    memoryHistoryResult.appendChild(resulteTagContainer);
    let resulteTag = document.createElement('div');
    resulteTag.setAttribute('class', 'resulteTag');
    resulteTag.classList.add('resulteTag');
    resulteTagContainer.appendChild(resulteTag);
    let resulteTagOutput = document.createElement('div');
    resulteTagOutput.setAttribute('class', `resulteTagOutput${k}`);
    resulteTag.appendChild(resulteTagOutput);
    document.querySelector(`.resulteTagOutput${k}`).style.fontSize = "medium";
    document.querySelector(`.resulteTagOutput${k}`).innerText = dataForMemory.resulte[dataForMemory.resulte.length - 1];
    console.log(dataForMemory.resulte[dataForMemory.resulte.length - 1], dataForMemory.resulte);
    let resulteTagInput = document.createElement('div');
    resulteTagInput.setAttribute('class', `resulteTagInput${k}`);
    resulteTag.appendChild(resulteTagInput);
    console.log(dataForMemory.opration[dataForMemory.opration.length - 1], dataForMemory.opration)
    document.querySelector(`.resulteTagInput${k}`).style.fontSize = "xx-large";
    document.querySelector(`.resulteTagInput${k}`).innerText = dataForMemory.opration[dataForMemory.opration.length - 1];
    resulteTag.addEventListener('click', function () {
        console.log('hi');
    })

    // viewData();
}

function clearHistoryPart() {
    resulteTagContainer.style.display = 'none';
    j++;
    resulteTagContainer = document.createElement('div');
    resulteTagContainer.setAttribute('class', `resulteTagContainer${j}`);
}

//save data in storage
function saveData() {

    if (localStorage.getItem('dataResult') === null) {
        localStorage.setItem('dataResult', '[]');
    }
    let oldDataResult = JSON.parse(localStorage.getItem('dataResult'));
    oldDataResult.push(dataForMemory.resulte);
    localStorage.setItem('dataResult', JSON.stringify(oldDataResult));



    if (localStorage.getItem('dataOpration') === null) {
        localStorage.setItem("dataOpration", '[]');
    }
    let oldDataOpration = JSON.parse(localStorage.getItem('dataOpration'));
    oldDataOpration.push(changeStringToNumberExprission(save));
    localStorage.setItem('dataOpration', JSON.stringify(oldDataOpration));

}

function viewData(){

    if(localStorage.getItem('dataResult') != null){
        
    }
}