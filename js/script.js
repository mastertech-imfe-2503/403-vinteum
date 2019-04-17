const startButton = document.querySelector('.first-page button');
const inputs = document.querySelectorAll('input');

startButton.onclick = function(){
  if(validateNames()){
    console.log("Input validated");
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