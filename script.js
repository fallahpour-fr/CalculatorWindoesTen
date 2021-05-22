'use strict'

const numberButton = Array.from(document.querySelectorAll('.row-button__number'));
const oprationButton = Array.from(document.querySelectorAll('.row-button__opration'));
const backspaceButton = document.querySelector('.row-button__key--backspace');
const clearButton = document.querySelector('.row-button__key--clear');
const equalButton = document.querySelector('.row-button__equal');
let save=0;
let data = {
    opration: [],
    resulte: []
}

function parse(str) {
    return Function(`'use strict'; return (${str})`)()
  }

numberButton.forEach(element => {
    element.addEventListener('click', function(){
        data.resulte.push(element.innerText);
        console.log(data.resulte);
    });
})

oprationButton.forEach(element => {
    element.addEventListener('click',function(){
        let id=element.id;
        data.resulte.push(id);
    })
})

backspaceButton.addEventListener('click',function(){
    data.resulte.pop();
    console.log(data.resulte);
})

clearButton.addEventListener('click' ,function(){
    data.resulte=[];
    console.log(data.resulte);
})

equalButton.addEventListener('click' , function(){
    save = data.resulte.join('');
    console.log(parse(save));
})

  
 