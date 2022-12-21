'use strict';

////////// Selecting elements
// stages
const menu = document.querySelector('.menu');
const numGame = document.querySelector('.numbersGame');

// Buttons
const startBtn = document.querySelector('#startButton');

// numGame
const numGameStartBtn = document.querySelector('.numGameStartBtn');
const numToRead = document.querySelector('.numberToRead');
const playerInput = document.querySelector('.playerInput');
const pointsText = document.querySelector('#pointsText');
const pointsNum = document.querySelector('#pointsNum');
const titleEl = document.querySelector('#title');
const announcerEl = document.querySelector('#announcerText');

////////// Menu start //////////
startBtn.addEventListener('click', () => {
  menu.classList.add('hidden');
  numGameEntered();
});
numGame.classList.add('hidden');

////////// NumGame //////////
let points = 0; // player scored points. if points > 0 ==> game over
let hearts = 3; // FIXME:has to be highger by 1, becasue of didPlayerClicked() behavior;
let currentNum = 0; // number to remember AT THIS VERY MOMENT
let level = 1;
let gameIsOn = 0;
let playerClicked = 0;

// What to do when game is lost?
const gameLostEvent = function () {
  numGameShowHide();
  numGameStartBtn.classList.add('hidden');

  titleEl.innerHTML = `Game <span class="hgfont">Lost</span>`;
  announcerEl.innerHTML = `Well... You tried!`;
  pointsText.innerHTML = `<span id="pointsNum" class="hgfont">0</span> Points Scored`;
};

const randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

///// display and enterremebered number
const displayNum = function () {
  // Every x sec generate and display a random number for y sec
  const delay = setInterval(() => {
    //
    /* If game is over or hasn't started yet, stop the interval*/
    if (gameIsOn < 0) {
      clearInterval(delay);
      return;
    } else {
      // turn game off, stop counting player clicks, sum up points
      pointsSystem();
      didPlayerClicked();
    }
    currentNum = randomNumber(1 * level, 9 * level);
    numToRead.textContent = currentNum;
    const timeOut = setTimeout(() => {
      numToRead.textContent = ' ';
    }, 200 /* y - Time of displaying randomized number*/);
    // Waiting for player click. if he didn't, act as if he hasn't seen a number
  }, 2000 /* x - how often the number should be generated */);
};

const didPlayerClicked = function () {
  // FIXME:
  if (playerClicked <= 0) {
    --hearts;
    console.log('💥');
  } else {
    console.log('Player Clicked');
  }
  playerClicked = 0;
};

const isNumCorrect = function (input) {
  if (input === currentNum) {
    points += input;
  } else {
    --hearts;
  }
  pointsSystem();
};

const pointsSystem = function () {
  pointsNum.textContent = points;
  if (hearts <= 0) {
    gameIsOn = -1;
    gameLostEvent();
  }
};

// Start game mechanics
const startTheGame = function () {
  if (gameIsOn === -1) return;
  gameIsOn = 1;
  console.log('event c');
  displayNum();
};

document.body.onkeydown = () => {
  if (!numGame.classList.contains('hidden')) playerInput.focus();
};
playerInput.onkeydown = function (e) {
  // Check if pressed number is in fact a number TODO:
  //
  // Submit by pressing enter and clear input field
  if (!e.keyCode === 13) return;
  if (e.keyCode === 13) {
    playerClicked = 1;
    // console.log('Player clicked:', playerClicked);
    const input = Number(playerInput.value);
    isNumCorrect(input);
    playerInput.value = '';
  }
};

// setInterval(() => {
//   numToRead.textContent = randomNumber(1 * 100, 9 * 100);
// }, 100);

const numGameEntered = () => {
  numGame.classList.remove('hidden');
  numToRead.classList.add('hidden');
  playerInput.classList.add('hidden');
  pointsText.classList.add('hidden');
};

const numGameShowHide = function () {
  numToRead.classList.toggle('hidden');
  playerInput.classList.toggle('hidden');
  pointsText.classList.toggle('hidden');
  numGameStartBtn.classList.toggle('hidden');
  announcerEl.classList.toggle('hidden');
  titleEl.classList.toggle('hidden');
};

const numGameStateElements = state => {
  // If game hasn't started yety
  if (!state) {
    numToRead.classList.add('hidden');
    playerInput.classList.add('hidden');
    pointsText.classList.add('hidden');
  } else {
    numToRead.classList.remove('hidden');
    playerInput.classList.remove('hidden');
    pointsText.classList.remove('hidden');
  }
  announcerEl.classList.toggle('hidden');
  titleEl.classList.toggle('hidden');
};

numGameStartBtn.addEventListener('click', () => {
  numGameShowHide();
  startTheGame();
});

// TEST
const numGameTest = () => {
  menu.classList.add('hidden');
};
// /TEST

// Make input max length as long as guessing numbers
// Add as much points for every number remebered correctly as there were numbers to guess
