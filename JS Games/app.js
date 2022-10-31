// __________________________________________________ Guess the Color __________
// __________________________________________________ Variables
const novice = 0;
const interm = 1;
const expert = 2;

let randomColors = [];
let correctAnswer = -1;
let difficulty = novice;

let gridSize = document.getElementById("rgbColorOptions").style;

let maxSquares;  
update_maxSquares(difficulty);     

         // let colorClickedText = "";
         // let colorClickedStyle = "";

let rgbTitle = document.getElementById("whatColor");
let titleContainer = document.getElementById("rgbColorCode");
let randomColorFill = document.querySelectorAll(".colorSquare");
let newRandomColors = document.getElementById("newColors");

let difficultyTabs = document.querySelectorAll(".level");
         // let noviceTab = document.getElementById("novice");
         // let intermediateTab = document.getElementById("intermediate");
         // let expertTab = document.getElementById("expert");

// __________________________________________________ Event Listeners
let grid = document.querySelectorAll(".colorSquare");


newRandomColors.addEventListener("click", () => { gameSetup(difficulty); });
difficultyTabs[novice].addEventListener("click", () => { gameSetup(novice); });
difficultyTabs[interm].addEventListener("click", () => { gameSetup(interm); });
difficultyTabs[expert].addEventListener("click", () => { gameSetup(expert); });
         // noviceTab.addEventListener("click", noviceMode);
         // intermediateTab.addEventListener("click", intermediateMode);
         // expertTab.addEventListener("click", expertMode);

for (var i = 0; i < randomColorFill.length; i++) {
   randomColorFill[i].addEventListener("click", ((event) => { selectedColor(event) }));
};

// __________________________________________________ Functions
gameSetup(difficulty);

function gameSetup(diff) {
   for (var i = 0; i < difficultyTabs.length; i++) {
      difficultyTabs[i].classList.remove("level-active");
      difficultyTabs[i].classList.add((i == diff) ? "level-active"
                                                  : "level-disabled");
   };
   titleContainer.style.backgroundColor = "rgb(11, 114, 117)"
   titleContainer.style.borderColor = "rgb(11, 114, 117)"
   difficulty = diff;
   update_maxSquares(diff);
   add_removeGridClass();
   newColors();
   setStatus("");
};

function randomColor() {
   let r = Math.floor(Math.random()*256);
   let g = Math.floor(Math.random()*256);
   let b = Math.floor(Math.random()*256);

   let rgbValue = "RGB(" + r + ", " + g + ", "  + b + ")";
   return rgbValue;
};

function newColors() {
   correctAnswer = Math.floor(Math.random()*maxSquares);
   randomColors = [];
   
   for (var i = 0; i < maxSquares; i++) {
      randomColors[i] = randomColor();
      randomColorFill[i].style.backgroundColor = randomColors[i];
    };
   
   rgbTitle.innerHTML = randomColors[correctAnswer];
};

function selectedColor(event) {
   let clickedColor = event.target.style.backgroundColor.toLowerCase();
   let correct_answer = randomColors[correctAnswer].toLowerCase();

   if(clickedColor == correct_answer) {
      setStatus("Correct");
      changeAllSquareColors(randomColors[correctAnswer]); 
      titleContainer.style.backgroundColor = randomColors[correctAnswer];
      titleContainer.style.borderColor = randomColors[correctAnswer];
   } else {
      setStatus("Try Again");
      event.target.style.backgroundColor = "transparent";
   };
};

         // function selectedColor(event) {
         //    colorClickedText = event.target.style.backgroundColor;
         //    colorClickedStyle = event.target.style;

         //    if(colorClickedText == rgbTitle.innerHTML.toLowerCase()) {
         //       document.getElementById("status").innerHTML = "Correct";
         //       for (var i = 0; i < randomColorFill.length; i++) {
         //          randomColorFill[i].style.backgroundColor = rgbTitle.innerText;
         //       }
         //    } else {
         //       document.getElementById("status").innerHTML = "Try Again";
         //       colorClickedStyle.backgroundColor = "transparent";
         //    };

         //    console.log(colorClickedText);
         //    console.log(rgbTitle.innerHTML);
         // };

function changeAllSquareColors(color) {
   for (var i = 0; i < maxSquares; i++) {
      randomColorFill[i].style.backgroundColor = color;
   };
};

function setStatus(s) {
   document.getElementById("status").innerHTML = s;
};

function update_maxSquares(diff) {
   if(diff == novice) { 
      maxSquares = 3;
      gridSize.gridTemplateRows = "repeat(1, 8rem)";
   } else {
   if(diff == interm) {
      maxSquares = 6;
      gridSize.gridTemplateRows = "repeat(2, 8rem)";
   } else {
      maxSquares = 9;
      gridSize.gridTemplateRows = "repeat(3, 8rem)";
   };
   };
};
         // function noviceMode() {
         //    noviceTab.classList.add("level-active");
         //    noviceTab.classList.remove("level-disabled");

         //    if(expertTab.classList.contains("level-active")) {
         //       expertTab.classList.remove("level-active");
         //       expertTab.classList.add("level-disabled");
         //    };
         //    if (intermediateTab.classList.contains("level-active")) {
         //       intermediateTab.classList.remove("level-active");
         //       intermediateTab.classList.add("level-disabled")
         //    };

         // };

         // function intermediateMode() {
         //    intermediateTab.classList.add("level-active");
         //    intermediateTab.classList.remove("level-disabled");

         //    if(expertTab.classList.contains("level-active")) {
         //       expertTab.classList.remove("level-active");
         //       expertTab.classList.add("level-disabled");
         //    };
         //    if (noviceTab.classList.contains("level-active")) {
         //       noviceTab.classList.remove("level-active");
         //       noviceTab.classList.add("level-disabled")
         //    };
         // };

         // function expertMode() {
         //    expertTab.classList.add("level-active");
         //    expertTab.classList.remove("level-disabled");

         //    if(intermediateTab.classList.contains("level-active")) {
         //       intermediateTab.classList.remove("level-active");
         //       intermediateTab.classList.add("level-disabled");
         //    };
         //    if (noviceTab.classList.contains("level-active")) {
         //       noviceTab.classList.remove("level-active");
         //       noviceTab.classList.add("level-disabled")
         //    };
         // };

         function add_removeGridClass() {
   for(var i = 0; i < grid.length; i++) {
      grid[i].classList.remove("colorSquare");
   };

   for( var i = 0; i < maxSquares; i++) {
      grid[i].classList.add("colorSquare");
   };
};   


// __________________________________________________ Hangman __________
// __________________________________________________ Variables
let letters = document.querySelectorAll(".letters");
let playAgain = document.getElementById("playAgain-btn");
let requestHint = document.querySelector(".requestHint-btn");
let wordToGuess = document.getElementById("word");
let hints = document.querySelectorAll(".hint");
let strikes = document.querySelectorAll(".strike");
let gameOverMsg = document.getElementById("gameOver-msg");

let canvas = document.getElementById("hangedMan-container");
let ctx = canvas.getContext("2d");
let canvasHangmanIndex = -1;


let remainingHints = 3;
let remainingStrikes = 10;
let displayedWord = "";
let guessThisWord = "";
let hangmanGameOver = false;

let words = ["Ghost", "Pumpkin", "Spooky"];
let drawArray = [platform, post, beam, noose, head, torso, rightArm, leftArm, rightLeg, leftLeg];



// __________________________________________________ Event Listeners

/*
for (var i = 0; i < letters.length; i++) {
   // letters[i].addEventListener("click", ((event) => { selectedLetter(event) }));
   letters[i].addEventListener("click", selectedLetter);
};
*/

letters.forEach((letter) => {
  letter.addEventListener("click", selectedLetter);
});

playAgain.addEventListener("click", resetGame);
requestHint.addEventListener("click", trackHints);

// __________________________________________________ Functions

function gameStart() {
   resetGame();
   initCanvas();
};
gameStart();

function newRandomWord() {
   let randomWord = words[Math.floor(Math.random(words)*words.length)];
   guessThisWord = randomWord;

   for(var i = 0; i < guessThisWord.length; i++) {
      displayedWord += "_";
   };
   populateDisplayWord();
   initCanvas();
   console.log(guessThisWord);
};

function populateDisplayWord() {
   wordToGuess.innerHTML = displayedWord.split("").join(" ");
}

function selectedLetter(event) {
   if (event.target.classList.contains("clicked") || hangmanGameOver) { 
      return; // do nothing if DOM node has already been clicked
   }

   let clickedLetter = event.target.innerHTML;
   event.target.classList.add("clicked");

   for(var i = 0; i < guessThisWord.length; i++) {
      if (guessThisWord[i].toLowerCase() == clickedLetter.toLowerCase()){
         displayedWord = displayedWord.substring(0, i) + 
                         clickedLetter +
                         displayedWord.substring(i + 1, displayedWord.length);
      };  
   };
   
   if (!guessThisWord.toUpperCase().includes(clickedLetter)) {
      trackStrikes();
   }
   populateDisplayWord();
   setGameOver();
};

function trackStrikes() {
   if(remainingStrikes === 0) {
      return;
   };

   strikes[10 - remainingStrikes].classList.add("clicked");
   DrawNextHangmanPiece();
   remainingStrikes--;
};

function trackHints() {
   if(remainingHints === 0 || hangmanGameOver) {
      return;
   };

   hints[3 - remainingHints].classList.add("clicked");
   provideHint();
   provideHint();
   remainingHints--;
};

function provideHint() {
   let newHint = randomLetter();
   while (true) {
      if (!guessThisWord.toUpperCase().includes(newHint.innerHTML) && 
          !newHint.classList.contains("clicked") && 
          !newHint.classList.contains("requestedHint")) {
            newHint.classList.add("requestedHint");
            break;
      };
      newHint = randomLetter();
   };
   console.log(newHint);
};

function randomLetter() {
  return letters[Math.floor(Math.random()*letters.length)];
};

function setGameOver() {
   if(remainingStrikes == 0) {
      gameOverMsg.innerHTML = "Game Over!";
      gameOverMsg.classList.add("gameOver-msg-loss");
      displayedWord = guessThisWord.toUpperCase();
      populateDisplayWord();
      hangmanGameOver = true;
   }

   if(displayedWord == guessThisWord.toUpperCase() && !(remainingStrikes == 0)) {
      gameOverMsg.innerHTML = "Correct!"
      gameOverMsg.classList.add("gameOver-msg-win");
      hangmanGameOver = true;
   };
};

function resetGame() {
   for(var i = 0; i < letters.length; i++) {
      letters[i].classList.remove("clicked");
      letters[i].classList.remove("requestedHint");
   };

   for(var i = 0; i < hints.length; i++) {
      hints[i].classList.remove("clicked");
   };

   for(var i = 0; i < strikes.length; i++) {
      strikes[i].classList.remove("clicked");
   };

   gameOverMsg.classList.remove("gameOver-msg-loss")
   gameOverMsg.classList.remove("gameOver-msg-win");

   gameOverMsg.innerHTML = "";
   displayedWord = "";
   remainingHints = 3;
   remainingStrikes = 10;
   hangmanGameOver = false;
   ctx.reset();
   canvasHangmanIndex = -1;
   ctx.clearRect(0, 0, 250, 140);
   
   newRandomWord();
};

// __________________________________________________ Functions (Hanged-Man)

function initCanvas() {
   ctx.beginPath();
   ctx.strokeStyle = "rgb(240, 248, 255)";
   ctx.lineWidth = 2.3;
 };

 function draw(fromX, fromY, toX, toY) {
   ctx.moveTo(fromX, fromY);
   ctx.lineTo(toX, toY);
   ctx.stroke(); 
};

function DrawNextHangmanPiece() {
   canvasHangmanIndex++;
   drawArray[canvasHangmanIndex]();
};

// Hangman part definitions
function head() {
   ctx.beginPath();
   ctx.arc(130, 36, 8, 0, 2 * Math.PI);
   ctx.stroke();
};

function torso() {
   draw(130, 45, 130, 85);
};

function leftArm() {
   draw(130, 55, 115, 65);
};

function rightArm() {
   draw(130, 55, 145, 65);
};

function leftLeg() {
   draw(130, 85, 115, 100);
};

function rightLeg() {
   draw(130, 85, 145, 100);
};

function platform() {
   draw(65, 130, 200, 130);
};

function post() {
   draw(75, 140, 75, 10);
};

function beam() {
   draw(140, 20, 65, 20);
};

function noose() {
   draw(130, 20, 130, 30);
};

 // __________________________________________________ Pairs Game __________
// __________________________________________________ Variables


// __________________________________________________ Event Listeners



// __________________________________________________ Functions
