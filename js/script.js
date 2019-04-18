const startButton = document.querySelector('.first-page button');
const inputs = document.querySelectorAll('input');
const firstPage = document.querySelector('.first-page');
const secondPage = document.querySelector('.second-page');

const valueMap = {
  "ACE": 1,
  "QUEEN": 10,
  "JACK": 10,
  "KING": 10
}

let deckID;

let players = [
  {
    name: '',
    score: document.querySelector(".player0 .score"),
    cards: [],
    hand: document.querySelector(".player0 .cards"),
  },
  {
    name: '',
    score: document.querySelector(".player1 .score"),
    cards: [],
    hand: document.querySelector(".player1 .cards")
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
  document.querySelector('button[name="0"]').onclick = function(event){
    drawCards(parseInt(event.target.name), 1);
  };
  document.querySelector('button[name="stop0"]').onclick = changePlayer;
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

  document.querySelector('.player0 .name').innerHTML = players[0].name;
  document.querySelector('.player1 .name').innerHTML = players[1].name;
}

function getDeck(){
  fetch("http://deckofcardsapi.com/api/deck/new/shuffle/")
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    deckID = json.deck_id;
    drawCards(0, 2);
    drawCards(1, 2);
  })
}

function drawCards(index, cards){
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=${cards}`)
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    players[index].cards = json.cards;
    console.log(json.cards);
    updateScreen(index);
    updateScore(index);
  })
}

function updateScreen(index){
    for(card of players[index].cards){
      let cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardImage.classList.add('card');
      players[index].hand.appendChild(cardImage);
    }
  }

function updateScore(index){
    for(card of players[index].cards){
      let currentValue = parseInt(players[index].score.innerHTML); players[index].score.innerHTML = currentValue + (valueMap[card.value] || parseInt(card.value));
    }
    console.log(index);
    console.log(parseInt(players[index].score.innerHTML));
    if(index === 0 && parseInt(players[index].score.innerHTML) >= 21){
      changePlayer();
    }
}

function changePlayer(){
  document.querySelector('button[name="0"]').onclick = null;
  document.querySelector('button[name="stop0"]').onclick = null;

  document.querySelector('button[name="1"]').onclick = function(event){
    drawCards(parseInt(event.target.name), 1);
  };
}