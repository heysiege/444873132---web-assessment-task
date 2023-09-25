// defining the emoji sets 
const emojiSets = [
    {emojis: "🍎🍊🍌", answer: "fruits"},
    {emojis: "🐶🐱🐭", answer: "pets"},
    {emojis: "🚗🚌🚕", answer: "transport"},
    {emojis: "🍔🥖🧁", answer: "food"},
    {emojis: "⌚📱💻", answer: "devices"},
    {emojis: "🌞🌈🌦️", answer: "weather"},
    {emojis: "📚✏️🎓", answer: "school"},
    {emojis: "🎮🕹️👾", answer: "games"},
    {emojis: "🎵🎤🎧", answer: "music"},
    {emojis: "🍙🎌🏯", answer: "japan"},
    {emojis: "🦘🏉🌞", answer: "australia"},
    {emojis: "🕷️👦🕸️", answer: "spiderman"},
    {emojis: "🎉🎁🎂", answer: "birthday"},
    {emojis: "🧦👕👖", answer: "clothes"},
    {emojis: "🦍🦁🦒", answer: "zoo"},
    {emojis: "💊🧑‍⚕️🩺", answer: "doctor"},
    {emojis: "🤧😷💉", answer: "covid"},
    {emojis: "🎨🖼️✏️", answer: "art"},
    {emojis: "🦗🐜🦋", answer: "insects"},
    {emojis: "⚽🏀🎾", answer: "sports"},
    {emojis: "🏠🏡🏢", answer: "buildings"},
    {emojis: "🚀☄️🪐", answer: "space"},
    {emojis: "🏖️🩴🌊", answer: "beach"},
    {emojis: "🎃👻🕷️", answer: "halloween"},
    {emojis: "🎄🎅🤶", answer: "christmas"},
    {emojis: "👨‍🍳🍳🔪", answer: "cooking"},
    {emojis: "🦖🦕🌋", answer: "dinosaurs"},
    {emojis: "🧛🦇🌕", answer: "vampire"},
    {emojis: "🍻🍺🍷", answer: "drinks"},
    {emojis: "🔨🔧🪛", answer: "tools"}
];

let currentEmojiSetIndex = -1; 
let correctGuesses = 0; 
let shuffledEmojiSets = []; 
let startTime; 
let timerInterval;

const music = document.getElementById("backgroundMusic");

const correctCounter = document.getElementById("correctGuessesCounter"); 
const emojiDisplay = document.getElementById("emojiDisplay");
const guessInput = document.getElementById("guessInput");
const submitButton = document.getElementById("submitButton");
const startButton = document.getElementById("startButton");
const resultMessage = document.getElementById("resultMessage");
const winScreen = document.getElementById("winScreen");
const retryButton = document.getElementById("retryButton");
const timerValue = document.getElementById("timerValue");
const winTime = document.getElementById("winTime");
const timerElement = document.getElementById("timer");
const mainGame = document.getElementById("game");


// function that shuffles the emoji sets so that a new order of sets are played each round
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function updateEmojiDisplay() {
  // updates the emoji set that is shown, depending on which set is next in the order
  emojiDisplay.textContent = shuffledEmojiSets[currentEmojiSetIndex].emojis;

  // resets the input and the result message
  resultMessage.textContent = "";
  guessInput.value = "";
}

// function that clicks the submit button if the enter key is pressed (so users can either click the submit button or hit enter)
// suitable for touch screen and non-touch screen
function submitEnter(event) {
  if (event.keyCode === 13) {
      document.getElementById("submitButton").click();
  }
}


function checkGuess() { // this function is called when the enter key or submit button is clicked 
  if (currentEmojiSetIndex === -1) {
    return; // if the current emoji hasn't changed, then return the function
  }

  const userGuess = guessInput.value.toLowerCase();
  const correctAnswer = shuffledEmojiSets[currentEmojiSetIndex].answer.toLowerCase(); // find the correct answer in the array

  // if the user presses submit with an empty input then show a result message
  if (userGuess === "") {
      resultMessage.textContent = "Enter your guess above!";
  }
  else if (userGuess === correctAnswer) {
    correctGuesses++; // add 1 to the user's correct guess count
    correctCounter.textContent = correctGuesses; // update the player window
    if (correctGuesses >= 5) {
      showWinScreen(); // if they've finished then show the completion/win screen
    } 
    else {
      loadNextEmojiSet(); // if they still have more emoji sets to guess, then move onto the next set
    }
  } 
  // if the answer contains the user's input then let them know they're close
  else if (correctAnswer.includes(userGuess)) {
    resultMessage.style.display = "block";
    resultMessage.textContent = "Almost, you're close!";
  } 
  // if the user is wrong then show an incorrect message
  else {
    resultMessage.textContent = "Incorrect. Try again!";
    resultMessage.style.display = "block";
  }
}


function startGame() { // called when the start button is pressed
  // hide the start button and show the game screen
  startButton.style.display = "none";
  mainGame.style.display = "block";
  // record the time when the game starts and start counting how long the user takes
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
  // shuffle the emoji sets so that its in a new order
  shuffledEmojiSets = [...emojiSets];
  shuffleArray(shuffledEmojiSets);
  loadNextEmojiSet();
  // play music
  music.play();
}


// stopwatch function - the time started is subtracted from the time currently, and the text on screen is changed to show
function updateTimer() {
  const currentTime = Date.now();
  const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
  timerValue.textContent = elapsedSeconds;
}


// function checks what index the array is up to, to decide whether to clear the game or load the next set
function loadNextEmojiSet() {
  currentEmojiSetIndex++; // add one to the index counter
  if (currentEmojiSetIndex >= 5) { // if the index counter is now up to 5, then clear the values (because the game has ended)
    currentEmojiSetIndex = -1;
    emojiDisplay.textContent = "";
    clearInterval(timerInterval);
    timerElement.style.display = "none";
  }
  else {
    updateEmojiDisplay(); // if the index counter is under 5 then update the emoji set (function above)
  }
}


function showWinScreen() {
  currentEmojiSetIndex = -1;
  emojiDisplay.textContent = "";
  winScreen.style.display = "flex";
  clearInterval(timerInterval);
  timerElement.style.display = "none";
  // find the time that the user finished at and show the win screen with that time
  const endTime = Date.now();
  const elapsedSeconds = Math.floor((endTime - startTime) / 1000);
  winTime.textContent = elapsedSeconds;
  mainGame.style.display = "none";
  resultMessage.style.display = "none";
}


function retryGame() {
  // reset all the counters, hide the win screen and show the game display
  winScreen.style.display = "none";
  correctGuesses = 0;
  correctCounter.textContent = "0";
  shuffledEmojiSets = [];
  timerElement.style.display = "block";
  timerValue.textContent = "0";
  mainGame.style.display = "block";
  emojiDisplay.style.display = "block";
  music.pause();
  music.currentTime = 0;
  startGame();
}


// event listeners for the buttons that call functions when they're clicked
submitButton.addEventListener("click", checkGuess);
startButton.addEventListener("click", startGame);
retryButton.addEventListener("click", retryGame);
