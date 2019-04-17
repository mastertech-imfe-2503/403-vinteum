const startButton = document.querySelector('.first-page button');
const inputs = document.querySelectorAll('input');
const firstPage = document.querySelector('.first-page');
const secondPage = document.querySelector('.second-page');

startButton.onclick = function(){
  if(validateNames()){
    firstPage.classList.toggle('invisible');
    secondPage.classList.toggle('invisible');
  }
}

function validateNames(){
  let result = true;
  for(input of inputs){
    if(!input.value){
      input.placeholder = `Digite o nome do ${input.name}`;
      result = false;
    }
  }

  return result;
}