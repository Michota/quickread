"use strict";

////////// Selecting elements
// stages
const menu = document.querySelector(".menu");
const numGame = document.querySelector(".numbersGame");

// Buttons
const startBtn = document.querySelector("#startButton");

// numGame
const numGameStartBtn = document.querySelector(".numGameStartBtn");
const numToRead = document.querySelector(".numberToRead");
const playerInput = document.querySelector(".playerInput");
const pointsText = document.querySelector("#pointsText");
const pointsNum = document.querySelector("#pointsNum");
const titleEl = document.querySelector("#title");
const announcerEl = document.querySelector("#announcerText");

////////// Menu start //////////
startBtn.addEventListener("click", () => {
  menu.classList.add("hidden");
  numGameEntered();
});

////////// NumGame //////////
numGame.classList.add("hidden");
let points = 0;

const numGameEntered = () => {
  numGame.classList.remove("hidden");
  numToRead.classList.add("hidden");
  playerInput.classList.add("hidden");
  pointsText.classList.add("hidden");
};
const numGameStart = function () {
  numToRead.classList.remove("hidden");
  playerInput.classList.remove("hidden");
  pointsText.classList.remove("hidden");
  numGameStartBtn.classList.add("hidden");
  announcerEl.classList.add("hidden");
  titleEl.classList.add("hidden");
};
numGameStartBtn.addEventListener("click", () => {
  numGameStart();
});

// Make input max length as long as guessing numbers
// Add as much points for every number remebered correctly as there were numbers to guess
