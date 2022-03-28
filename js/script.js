//To Play Game
const playGame = document.querySelector(".play-game");
const homeScreen = document.querySelector(".home-screen");
const gameSCreen = document.querySelector(".game-screen");
const victoryScreen = document.querySelector(".victory-screen");

playGame.addEventListener("click", function() {
    homeScreen.remove();
    gameSCreen.classList.remove("hidden");
});

// Create an array of images from folder
const imageArray = [
    "img/1.png",
    "img/2.png",
    "img/3.png",
    "img/4.png",
    "img/5.png",
    "img/6.png",
    "img/7.png",
    "img/8.png",
    "img/9.png",
    "img/10.png",
    "img/11.png",
    "img/12.png"
];

//To select 8 unique random images
var uniqueImages = [];
while (uniqueImages.length < 8) {
    random = imageArray[Math.floor(Math.random() * 12)];
    if (uniqueImages.indexOf(random) === -1)
        uniqueImages.push(random);
}
// to save the unique images in two random cards
const gameGrid = uniqueImages
    .concat(uniqueImages)
    .sort(() => 0.5 - Math.random());

const cardImages = document.querySelectorAll(".card-image");
gameGrid.forEach((imgStr, index)=> {
    cardImages[index].setAttribute("src", imgStr);
})

// flip card and display images
const cards = document.querySelectorAll(".card");
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", flipCard)  
}

function flipCard() {
    this.classList.toggle("flip");
    //starts time after first click on card
    if (timeStart === false) {
        timeStart = true;
        timer();
    }
    //moves count after each click on card
    movesCounter();
    // push the cards clicked into an empty array and check for match
    checkForMatch(this);
}
// initialize time count
const timeCount = document.querySelector(".time-read");
let minutes = 0;
let seconds = 0;
let miliSeconds = 0;
let timeStart = false;

function timer() {
    let time = setInterval(function() {
        seconds++;
        if (seconds < 10) {
            miliSeconds = "0";
        }
        if (seconds >= 10) {
            miliSeconds = "";
        }
        if (seconds >= 60) {
            minutes++;
            miliSeconds = "0";
            seconds = "0";
        }
        timeCount.innerText = minutes + " : " + miliSeconds + seconds;
    }, 1000);
}

// initialize moves count  
const movesCount = document.querySelector(".count-value");
let moves = 0;

function movesCounter() {
    moves++;
    movesCount.innerText = moves;
}

// Matching of cards
let openedCards = [];
let matchedCards = [];

function checkForMatch(card) {
    openedCards.push(card);
    if (openedCards.length === 2){
        
        if (openedCards[0].firstElementChild.src === openedCards[1].firstElementChild.src) {
            setTimeout(function() {
                  openedCards[0].firstElementChild.classList.add("matched");
                  openedCards[1].firstElementChild.classList.add("matched");
                  matchedCards.push(...openedCards);
                  openedCards = [];
               }, 700);
           }
        else {
               setTimeout(function() {
                   openedCards[0].classList.remove("flip");
                   openedCards[1].classList.remove("flip");
                   openedCards = [];
               }, 900);
           }
    }
}