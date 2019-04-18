const startButton = document.querySelector('.first-page button');
const inputs = document.querySelectorAll('input');
const firstPage = document.querySelector('.first-page');
const secondPage = document.querySelector('.second-page');

let deckID;

let players = [
  {
    name: '',
    score: 0,
    cards: []
  },
  {
    name: '',
    score: 0,
    cards: []
  }
];

startButton.onclick = function(){
  if(validateNames()){
    firstPage.classList.toggle('invisible');
    secondPage.classList.toggle('invisible');
    startGame();
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

function startGame(){
  sortNames();
  getDeck();
  // pegar duas cartas para cada um
  // somar os pontos de cada um e colocar na tela
}

function sortNames(){
  let random = Math.random();
  if(random > 0.5){
    players[0].name = inputs[0].value;
    players[1].name = inputs[1].value;
  }
  else{
    players[1].name = inputs[0].value;
    players[0].name = inputs[1].value;
  }

  document.querySelector('.player1 .name').innerHTML = players[0].name;
  document.querySelector('.player2 .name').innerHTML = players[1].name;
}

function getDeck(){
  fetch("http://deckofcardsapi.com/api/deck/new/shuffle/")
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    deckID = json.deck_id;
    console.log(deckID);
  })
}