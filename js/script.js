//To Play Game
const playGame = document.querySelector(".play-game");
const homeScreen = document.querySelector(".home-screen");
const gameSCreen = document.querySelector(".game-screen");
const victoryScreen = document.querySelector(".victory-screen");

playGame.addEventListener("click", function() {
    homeScreen.remove();
    gameSCreen.classList.remove("hidden");
});

createImageGrid();

function createImageGrid() {

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
    gameGrid.forEach((imgStr, index) => {
        cardImages[index].setAttribute("src", imgStr);
    })

    // flip card and display images
    const cards = document.querySelectorAll(".card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", flipCard)
    }
};

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
let time = 0;

function timer() {
    time = setInterval(function() {
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
    starRating();
}

// Setting rates based on number of moves
const stars = document.querySelectorAll('.rating-icon');
let rating = 3;

function starRating() {
    if (moves === 20) {
        rating--;
        stars[2].classList.add('remove-star');
    } else if (moves === 30) {
        rating--;
        stars[1].classList.add('remove-star');
    } else if (moves === 40) {
        rating--;
        stars[0].classList.add('remove-star');
    }
}

// Matching of cards
let openedCards = [];
let matchedCards = [];

function checkForMatch(card) {
    openedCards.push(card);
    if (openedCards.length === 2) {

        if (openedCards[0].firstElementChild.src === openedCards[1].firstElementChild.src) {
            setTimeout(function() {
                openedCards[0].firstElementChild.classList.add("matched");
                openedCards[1].firstElementChild.classList.add("matched");
                matchedCards.push(...openedCards);
                victory();
                openedCards = [];
            }, 500);
        } else {
            setTimeout(function() {
                openedCards[0].classList.remove("flip");
                openedCards[1].classList.remove("flip");
                openedCards = [];
            }, 700);
        }
    }

}

// Resetting the game
const resetGame = document.querySelector(".refresh");

resetGame.addEventListener("click", reset);

function reset() {
    // reset moves
    moves = 0;
    movesCount.innerText = moves;

    //reset stars
    stars[2].classList.remove('remove-star');
    stars[1].classList.remove('remove-star');
    stars[0].classList.remove('remove-star');

    //reset time
    miliSeconds = 0;
    seconds = 0;
    minutes = 0;
    timeCount.innerText = minutes + " : " + miliSeconds + seconds;
    timeStart = false;
    clearInterval(time);

    //reset cards
    openedCards = [];
    matchedCards = [];
    let cards = document.querySelectorAll(".card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove("flip");
        cards[i].firstElementChild.classList.remove("matched");
    }
    createImageGrid();
};

//victory Screen
const gradeMoves = document.querySelector(".moves-result");
const gradeTime = document.querySelector(".time-result");
const gradeStars = document.querySelector(".stars-result");
const gameRating = document.querySelector(".game-rating");

function victory() {
    if (matchedCards.length === 16) {
        clearInterval(time);
        gameSCreen.classList.add("hidden");
        victoryScreen.classList.remove("hidden");
        gradeMoves.innerHTML = movesCount.innerHTML;
        gradeTime.innerHTML = timeCount.innerHTML;
        gradeStars.innerHTML = gameRating.innerHTML;
    };
};

//To Replay the game after winning
const replayGame = document.querySelector(".replay-button");
replayGame.addEventListener("click", () => {
    victoryScreen.classList.add("hidden");
    gameSCreen.classList.remove("hidden");
    reset();
});