'use strict';

var cardsArray = [{
  'name': 'babyFace',
  'img': 'img/babyFace.png'
}, {
  'name': 'babyFace2',
  'img': 'img/babyFace2.png'
}, {
  'name': 'flamingo',
  'img': 'img/flamingo.png'
}, {
  'name': 'irish',
  'img': 'img/irish.png'
}, {
  'name': 'soldier',
  'img': 'img/soldier.png'
}, {
  'name': 'stitch',
  'img': 'img/stitch.png'
}, {
  'name': 'tongue',
  'img': 'img/tongue.png'
}, {
  'name': 'pizza',
  'img': 'img/pizza.jpeg'
}, {
  'name': 'annoyed',
  'img': 'img/annoyed.png'
}, {
  'name': 'frankrijk',
  'img': 'img/frankrijk.png'
}, {
  'name': 'frankrijk0',
  'img': 'img/frankrijk0.png'
},{
  'name': 'funnyFace',
  'img': 'img/funnyFace.png',
},{
  'name': 'metVriendinnen',
  'img': 'img/metVriendinnen.png',
},{
  'name': 'metVriendinnen1',
  'img': 'img/metVriendinnen1.png',
},{
  'name': 'neemtFoto',
  'img': 'img/neemtFoto.jpg',
},{
  'name': 'segoConfused',
  'img': 'img/segoConfused.png',
},{
  'name': 'segoShocked',
  'img': 'img/segoShocked.png',
},{
  'name': 'tv',
  'img': 'img/tv.png',
},{
  'name': 'zwartWit',
  'img': 'img/zwartWit.png',
},{
  'name': 'mafia',
  'img': 'img/mafia.png',
},{
  'name': 'sismance',
  'img': 'img/sismance.png',
},{
  'name': 'crown',
  'img': 'img/crown.png',
},{
  'name': 'tibo',
  'img': 'img/tibo.png',
},{
  'name': 'tiboLikey',
  'img': 'img/tiboLikey.png',
},{
  'name': 'kotLotte',
  'img': 'img/kotLotte.png'
}];
// var cardsArray = [{
//   'name': 'kotLotte',
//   'img': 'img/kotLotte.png'
// }];

var gameGrid = cardsArray.concat(cardsArray).sort(function () {
  return 0.5 - Math.random();
});

var firstGuess = '';
var secondGuess = '';
var count = 0;
var previousTarget = null;
var delay = 1200;

let correctGuesses=0;
let wrongGuesses=0; //counter for wrong guesses
var matchAudio;  // Declare a global audio object
let matched=false; // is used to not call in audio when there  is a match

var game = document.getElementById('game');
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(function (item) {
  var name = item.name,
      img = item.img;


  var card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  var front = document.createElement('div');
  front.classList.add('front');

  var back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = 'url(' + img + ')';

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});



var match = function match() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.add('match');
  });

  // Stop any currently playing audio
  if (matchAudio && !matchAudio.paused) {
    matchAudio.pause();  // Stop the audio
    matchAudio.currentTime = 0;  // Reset playback to the start
  }

  // Create and play the new audio object
  matchAudio = new Audio('audio/tiboSound.mp3');
  matchAudio.play();
  matched=true;
  correctGuesses++;
  console.log(`correct guesses= ${correctGuesses}`);
  if (correctGuesses==cardsArray.length){
    console.log("victory screen");
    // Set cookie to indicate win, expiring in 1 day
    var now = new Date();
    now.setTime(now.getTime() + (1 * 24 * 60 * 60 * 1000)); // Add 1 day in milliseconds
    var expires = "expires=" + now.toUTCString(); // Format the expiration date

    document.cookie = "result=win; " + expires + "; path=/"; // Set the cookie with expiration
    window.location.href = 'endScreen.html';
  }
};

var resetGuesses = function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  

  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.remove('selected');
  });

  if(matched==false){
    wrongGuesses++;
    if(wrongGuesses==40){
      console.log("victory screen");
      // Set cookie to indicate win, expiring in 1 day
      var now = new Date();
      now.setTime(now.getTime() + (1 * 24 * 60 * 60 * 1000)); // Add 1 day in milliseconds
      var expires = "expires=" + now.toUTCString(); // Format the expiration date

      document.cookie = "result=lose; " + expires + "; path=/"; // Set the cookie with expiration
      window.location.href = 'endScreen.html';
    }
    document.getElementById('wrongGuesses').textContent = "Fails: " + wrongGuesses;
    console.log("wrong guesses= "+wrongGuesses);
    // Stop any currently playing audio
    if (matchAudio && !matchAudio.paused) {
      matchAudio.pause();  // Stop the audio
      matchAudio.currentTime = 0;  // Reset playback to the start
    }

    // Generate a random number between 1 and 3
    var randomNumber = Math.floor(Math.random() * 3) + 1;

    // Use switch-case to play one of the three sounds
    switch(randomNumber) {
      case 1:
        matchAudio = new Audio('audio/lol.mp3');
        break;
      case 2:
        matchAudio = new Audio('audio/cartoonTrombone.mp3');
        break;
      case 3:
        matchAudio = new Audio('audio/trombone.mp3');
        break;
    }

    // Play the selected audio
    matchAudio.play();
  }else{
    matched=false;
  }
};

grid.addEventListener('click', function (event) {

  var clicked = event.target;

  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
});


//TODO:
//-counter
//-sound effects victory
//-when victory is achieved send log
//-also add last game
//- make victory and lose screen
