'use strict'

const numberButton = Array.from(document.querySelectorAll('.row-button__number'));
const oprationButton = Array.from(document.querySelectorAll('.row-button__opration'));
const backspaceButton = document.querySelector('.row-button__key--backspace');
const clearButton = document.querySelector('.row-button__key--clear');
const clearAllButton = document.querySelector('.row-button__key--clearAll')
const equalButton = document.querySelector('.row-button__equal');
const inputHeader = document.querySelector('.calculator__header__number-input');
let save = 0;
let data = {
    opration: [],
    resulte: []
}

function parse(str) {
    return Function(`'use strict'; return (${str})`)()
}

numberButton.forEach(element => {
    element.addEventListener('click', function () {
        data.resulte.push(element.innerText);
        data.opration.push(element.innerText);
        console.log(data.resulte);
        inputResult();
    });
})

oprationButton.forEach(element => {
    element.addEventListener('click', function () {
        let id = element.id;
        data.resulte.push(id);
        data.opration.push(id);
        if(id == '*' || id == '/'){
            outputResult();
            console.log('hi')
        }
        if(id == '+' || id == '-'){
            outputResult2();
            console.log('ho')
        }
    })
})

backspaceButton.addEventListener('click', function () {
    data.resulte.pop();
    console.log(data.resulte);
})

clearButton.addEventListener('click', function () {
    data.resulte = [];
    console.log(data.resulte);
})

clearAllButton.addEventListener('click' , function(){
    data.resulte=[];
    data.opration=[];
    console.log(data.opration);
})

equalButton.addEventListener('click', function () {
    save = data.resulte.slice(0,-1).join('');
    let outputHeader = document.querySelector('.calculator__header__number-output').value = data.resulte.join('');
    let inputHeader = document.querySelector('.calculator__header__number-input').value = parse(save);
    console.log(save, parse(save));
})

function inputResult() {
    let inputHeader = document.querySelector('.calculator__header__number-input').value = data.opration.join('');
}

function outputResult() {
    let outputHeader = document.querySelector('.calculator__header__number-output').value = data.resulte.join('');
    data.opration=[];
}

function outputResult2(){
    let outputHeader = document.querySelector('.calculator__header__number-output').value = data.resulte.join('');    
    let save0 = data.resulte;
    // console.log(save0.join(''));
    let save2 = save0.slice(0,-1);
    console.log(save2 ,save0);
    let save3 = save2.join('');
    console.log(save3);
    console.log(parse(save3));
    let inputHeader = document.querySelector('.calculator__header__number-input').value = parse(save3);
    data.opration=[];
}