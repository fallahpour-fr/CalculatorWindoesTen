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
let k, m, n;
let data = {
    opration: [],
    resulte: []
}
let dataForMemory;
let saveDataLocalstorage = localStorage.getItem('SaveData');
if (saveDataLocalstorage) {
    dataForMemory = JSON.parse(saveDataLocalstorage);
    m = dataForMemory.resulte.length;
    n = dataForMemory.opration.length;
    saveInHistoryRelode();
} else {
    dataForMemory = {
        opration: [],
        resulte: []
    }
    k = 0;
    m = 0;
    n = 0;
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
    localStorage.setItem('SaveData', JSON.stringify(dataForMemory));
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
    resulteTagOutput.setAttribute('class', `resulteTagOutput${m}`);
    resulteTag.appendChild(resulteTagOutput);
    document.querySelector(`.resulteTagOutput${m}`).style.fontSize = "medium";
    document.querySelector(`.resulteTagOutput${m}`).innerText = dataForMemory.resulte[m];
    console.log(dataForMemory.resulte[m], dataForMemory.resulte);
    let resulteTagInput = document.createElement('div');
    resulteTagInput.setAttribute('class', `resulteTagInput${n}`);
    resulteTag.appendChild(resulteTagInput);
    console.log(dataForMemory.opration[n], dataForMemory.opration)
    document.querySelector(`.resulteTagInput${n}`).style.fontSize = "xx-large";
    document.querySelector(`.resulteTagInput${n}`).innerText = dataForMemory.opration[n];
    resulteTag.addEventListener('click', function () {
        console.log('hi');
    })
    n++;
    m++;
}

function clearHistoryPart() {
    resulteTagContainer.style.display = 'none';
    j++;
    resulteTagContainer = document.createElement('div');
    resulteTagContainer.setAttribute('class', `resulteTagContainer${j}`);
}

//save data in storage
function saveInHistoryRelode() {
    recyclePart.classList.remove('hidden');
    memoryHistoryResult.appendChild(resulteTagContainer);
   
    for (let i = 0; i < m; i++) {
        let resulteTag = document.createElement('div');
        resulteTag.setAttribute('class', 'resulteTag');
        resulteTag.classList.add('resulteTag');
        resulteTagContainer.appendChild(resulteTag);
        let resulteTagOutput = document.createElement('div');
        resulteTagOutput.setAttribute('class', `resulteTagOutput${i}`);
        resulteTag.appendChild(resulteTagOutput);
        document.querySelector(`.resulteTagOutput${i}`).style.fontSize = "medium";
        document.querySelector(`.resulteTagOutput${i}`).innerText = dataForMemory.resulte[i];
        console.log(dataForMemory.resulte[i], dataForMemory.resulte);
        let resulteTagInput = document.createElement('div');
        resulteTagInput.setAttribute('class', `resulteTagInput${i}`);
        resulteTag.appendChild(resulteTagInput);
        console.log(dataForMemory.opration[i], dataForMemory.opration)
        document.querySelector(`.resulteTagInput${i}`).style.fontSize = "xx-large";
        document.querySelector(`.resulteTagInput${i}`).innerText = dataForMemory.opration[i],i;
    }
 
}