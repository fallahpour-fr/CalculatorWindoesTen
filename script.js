'use strict'

const numberButton = Array.from(document.querySelectorAll('.row-button__number'));
const equalButton = document.querySelector('.equal');
const backspaceButton = document.querySelector('.row-button--backspace');
const divisionButton = document.querySelector('.row-button--division');
let arr = [];
let diviedArray = [];

numberButton.forEach(element => {
    element.addEventListener('click', showButtonClicked);
});
backspaceButton.addEventListener('click', deleteNumber);
divisionButton.addEventListener('click', diviedNumber);
equalButton.addEventListener('click', resultOfCalculations);

function showButtonClicked(e) {
    let number = e.target
    arr.push(number.innerText);
    let headerNumber = document.getElementById('input-value').value = arr.join('');
    console.log(arr)
}

function deleteNumber() {
    arr.pop();
    let headerNumber = document.getElementById('input-value').value = arr.join('');
    if (headerNumber == '') {
        document.getElementById('input-value').value = 0;
    }
}

function diviedNumber() {
    let currentNumber = arr.join('');
    let headerNumber = document.getElementById('input-value').value = 0;
    diviedArray.push(currentNumber);
    arr = [];
    console.log(diviedArray);
    divvoo()
}

function resultOfCalculations() {
    let currentNumber = arr.join('');
    let headerNumber = document.getElementById('input-value').value = 0;
    diviedArray.push(currentNumber);
    arr = [];
    console.log(diviedArray);
    divvoo()
}

function divvoo() {
    let total = diviedArray[0];
    for (let i = 1; i < diviedArray.length; i++) {
        total = total / diviedArray[i];
    }
    console.log(total);
}