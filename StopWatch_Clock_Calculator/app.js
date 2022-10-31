   // __________________________________________________ Stopwatch

   let minutes = 00;
   let seconds = 00;
   let miliseconds = 00;
   
   let appendMinutes = document.getElementById("minutes");
   let appendSeconds = document.getElementById("seconds");
   let appendMiliseconds = document.getElementById("miliseconds");
   
   let start = document.getElementById("start-btn");
   let stop = document.getElementById("stop-btn");
   let reset = document.getElementById("reset-btn");
   
   let Interval;
   
   function startTimer() {
      miliseconds++;
   
      if(miliseconds <= 9) {
         appendMiliseconds.innerHTML = "0" + miliseconds;
      };
   
      if(miliseconds > 9) {
         appendMiliseconds.innerHTML = miliseconds;
      };
   
      if(miliseconds > 99) {
         seconds++;
         appendSeconds.innerHTML = "0" + seconds;

         miliseconds = 0;
         appendMiliseconds.innerHTML = "0" + 0;
      };
   
   
   
      if(seconds <= 9) {
         appendSeconds.innerHTML = "0" + seconds;
      };
   
      if(seconds > 9) {
         appendSeconds.innerHTML = seconds;
      };
   
      if(seconds > 59) {
         minutes++;
         appendMinutes.innerHTML = "0" + minutes;

         seconds = 0;
         appendSeconds.innerHTML = "0" + 0;
      };
   
   
   
      if(minutes >9) {
         appendMinutes.innerHTML = minutes;
      };
   
   };
   
   start.onclick = function() {
      clearInterval(Interval);
      Interval = setInterval(startTimer, 10);
   };
   
   stop.onclick = function() {
      clearInterval(Interval);
   };
   
   reset.onclick = function() {
      clearInterval(Interval);
      miliseconds = "00";
      seconds = "00";
      minutes = "00";
   
      appendMiliseconds.innerHTML = miliseconds;
      appendSeconds.innerHTML = seconds;
      appendMinutes.innerHTML = minutes;
   };

// __________________________________________________ Clock

setInterval(currentTime, 1000) 
 
function currentTime() {
   let date = new Date();
   let localTime = date.toLocaleTimeString();
   document.getElementById("time-clock").innerHTML = localTime;
};

currentTime();

// __________________________________________________ Calculator
let operators = document.querySelectorAll(".operators");
let numbers = document.querySelectorAll(".numbers");

let decimal = document.getElementById("decimal");
let enter = document.getElementById("enter");
let clear = document.getElementById("clear");

for (var i = 0; i < numbers.length; i++) {
   numbers[i].addEventListener("click", ((event) => { numberClick(event) }));
};

for (var i = 0; i < operators.length; i++) {
   operators[i].addEventListener("click", ((event) => { operatorClick(event) }));
};

decimal.addEventListener("click", decimalClick);
enter.addEventListener("click", enterClick);
clear.addEventListener("click", clearClick);

let accumulator = '';
let currentOperator = '';

function updateCalcDisplay(value) {
   document.getElementById("calc-screen").innerHTML = value;
}

function removeLastChar(str) {
   return str.substring(0, str.length - 1);
}

function numberClick(event) {
   currentOperator = '';
   accumulator += event.target.outerText;
   updateCalcDisplay(accumulator);
}

/*
function operatorClick(event) {
   if (currentOperator === '') {
      currentOperator = event.target.outerText;
      accumulator += currentOperator;
      updateCalcDisplay(accumulator);
   } else {
      currentOperator = event.target.outerText;
      accumulator = removeLastChar(accumulator);
      accumulator += currentOperator;
      updateCalcDisplay(accumulator);
   }
}
*/

function operatorClick(event) {
   if (currentOperator != '') { 
      accumulator = removeLastChar(accumulator); 
   }
   currentOperator = event.target.outerText;
   accumulator += currentOperator;
   updateCalcDisplay(accumulator);
}

function decimalClick() {
   accumulator += ".";
   updateCalcDisplay(accumulator);
}

function enterClick() {
   accumulator = eval(accumulator);
   updateCalcDisplay(accumulator);
}

function clearClick() {
  accumulator = '';
  updateCalcDisplay(accumulator);
}

