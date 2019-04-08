/*
 * Create a list that holds all of your cards and render them
 */
const cards = [
  'fa-diamond', 'fa-diamond',
  'fa-paper-plane-o', 'fa-paper-plane-o',
  'fa-anchor', 'fa-anchor',
  'fa-bolt', 'fa-bolt',
  'fa-cube', 'fa-cube',
  'fa-leaf', 'fa-leaf',
  'fa-bicycle', 'fa-bicycle',
  'fa-bomb', 'fa-bomb'
]
const timeCounter = document.getElementById('time-counter');
const stopTimer = document.getElementById('stop-time');//TODO remove after testing
const stars = document.querySelectorAll(".fa-star");
const totalMoves = document.querySelector('.moves');
const totalMatches = document.querySelector('.matches');
let matches = 0; //TODO: move to under initialize game
let moves = 0; //TODO: move to under initialize game
let startTime = 0;
let timerRunning = ''; //Do I need this?
let incTime = '';
let seconds = '00';
let minutes = '00';
let totalTime = '';
let goldStars = document.querySelectorAll('.fas .fa-star .glow');
let starList = document.querySelectorAll('.goldStars li');
let modal = document.getElementById("popup");
let starsList = document.querySelectorAll(".goldStars li");
let closeicon = document.querySelector(".close");
let bodyBack = document.getElementById("modalBack");


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Start the Game (.deck)
function genCard(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`
}
function startGame() {
  const deck = document.querySelector('.deck');
  const cardHTML = shuffle(cards).map(function(card) {
    return genCard(card);
  });

  //reset board
  timeCounter.innerHTML = "00:00";
  moves = 0;
  matches = 7;
  startTime = 0;
  //totalTime = 0;
  totalMoves.innerHTML = moves;
  deck.innerHTML = cardHTML.join('');
  starList.innerHTML = goldStars;
  bodyBack.classList.remove("grayOn");
  modal.classList.remove("show");
  modal.classList.add("hide");
  timerRunning = ''; //Do I need this?
  incTime = '';
  seconds = '00';
  minutes = '00';
  let openCards = [];
}

startGame();

// Move Counter (.moves)
const incCounter = function () {
	moves++;
	totalMoves.innerHTML = moves;
  if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
                //stars[i].className.remove = "goldStars";
                //stars[i].className.add = "emptyStar";
            } //TODO: change className to 'emptyStar'
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

// Matches (.Matches)
const incMatch = function () {
	matches++;
	//totalMatches.innerHTML = matches;
}

//Functions
function stopTime() {
  startTime = 0;
  clearInterval(incTime);
}

function startTimer() {
  incTime = setInterval(function() {
       timer();
    }, 1000);
}

function timer() {
  if (seconds < 59) {
    seconds++;
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    if ((seconds == 60) || (seconds == 0)) {
      seconds = '00';
    }
  } else {
    seconds = '00';
    if (minutes < 59) {
      minutes++;
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if ((minutes == 0) || (minutes == 60)) {
        minutes = '00';
      }
    }
  }

  timeCounter.innerHTML = `${minutes}:${seconds}`;
}

//End the game when restart is hit or all cards match, pop up modal and show moves, time and rating
// Restart the Game (.restart)
function endGame() {
  myWindow.close();
}

function playAgain() {
  stopTime();
  startGame();
}
document.querySelector('.restart').addEventListener('click', playAgain);

function gameOver() {
clearInterval(incTime);
finalTime = timer.innerHTML;
//set classes needed for Modal
modal.classList.remove("hide");
modal.classList.add("show");
bodyBack.classList.add("grayOn");
//declare star rating variable
const starRating = document.querySelector(".goldStars").innerHTML;
//showing move, rating, time on modal
document.getElementById("totalMoves").innerHTML = moves;
document.getElementById("finalTime").innerHTML = totalTime;
document.getElementById("starRating").innerHTML = starRating;
document.getElementById('playAgain').addEventListener('click', playAgain);
}

// flip cards
const allCards = document.querySelectorAll('.card');
let openCards = [];

allCards.forEach(function(card) {
  card.addEventListener('click', function(showCard) {
    startTime++;
    if (startTime === 1) {
      startTimer();
    }

    timerRunning = 1;
    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
      openCards.push(card); //https://developer.mozilla.org/en-US/docs/Web/Events/push
      card.classList.add('open', 'show');
      // flip cards
      if (openCards.length == 2) {
        if (openCards[0].dataset.card == openCards[1].dataset.card) {
          matchCards = openCards.slice();
          matchCards[0].classList.add("match");
          matchCards[1].classList.add("match");
          openCards[0].classList.remove("open", "show");
          openCards[1].classList.remove("open", "show");
          matchCards[0].classList.remove("open", "show")
          matchCards[1].classList.remove("open", "show");
          openCards.splice(0, 2);

          incCounter(); //increment counter on match
          incMatch();//increment match

          // is game over?
          if (matches === 8) {
            stopTime();
            totalTime = `${minutes}:${seconds}`;
            gameOver();
          }
        } else {
          // don't show more than 2 cards face up until the window is clicked again
          window.addEventListener('click', function() {
            if (openCards.length > 2) {
              openCards[0].classList.remove("open", "show");
              openCards[1].classList.remove("open", "show");
              //openCards[2].classList.remove("open", "show"); //needed to close two facing cards
              openCards.splice(0, 2);
            }
          });
          //If no match wait a second then hide
          //TODO: reduce wait time
          setTimeout(function() {
            openCards.forEach(function(card) {
              card.classList.remove('open', 'show');
            });
            incCounter(); //increment counter on no match
          }, 500); //delay
        }
      }
    }
  });
});
