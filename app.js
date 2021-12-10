// selecting elements
const score = document.querySelector('.score');
const timeLeft = document.querySelector('.time-left');
const squares = document.querySelectorAll('.square');
const btnContainer = document.querySelector('.btn-container');
const playBtn = document.querySelector('.play-btn');
const playBtnIcon = document.querySelector('.play-btn i');
const finalScore = document.querySelector('.final-score span');

// game sounds
const clickSound = document.querySelector('#click-sound');
const hitSound = document.querySelector('#hit-sound');
const timerSound = document.querySelector('#timer-sound');
const gameoverSound = document.querySelector('#game-over-sound');

// decrease volume of all sounds
[clickSound, hitSound, timerSound, gameoverSound].forEach(sound => {
    sound.volume = 0.3;
});

let hitId;
let result = 0;
let currentTime = 60;
let timerId = null;
let countDownTimerId = null;
let isFirstTime = true;
let isPlaying = false;

// set scoreboard
function setScoreboard() {
    result = 0;
    currentTime = 60;
    score.textContent = result;
    timeLeft.textContent = currentTime;
}

// render mole at random square
function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole');
    });

    let randSquare = squares[Math.floor(Math.random() * 9)];
    randSquare.classList.add('mole');

    hitId = randSquare.id;
}

// mouse click event listener
squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if(isPlaying) {
            clickSound.currentTime = 0;
            clickSound.play();
        }

        if(square.id === hitId) {
            hitSound.currentTime = 0;
            hitSound.play();

            result++;
            score.textContent = result;
            hitId = null;
        }
    });
});

// move mole
function moveMole() {
    timerId = setInterval(randomSquare, 500);
}

// count down
function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if(currentTime == 3) {
        timerSound.currentTime = 0;
        timerSound.play();
    }

    if(currentTime == 0) {
        timerSound.pause();
        gameoverSound.currentTime = 0;
        gameoverSound.play();

        clearInterval(timerId);
        clearInterval(countDownTimerId);
        clearBoard();
        isPlaying = false;
        btnContainer.classList.add('game-over');
        finalScore.textContent = result;
        // alert(`GAME OVER! Your final score is ${result}`);
    }
}

// clear board
function clearBoard() {
    squares.forEach(square => {
        square.classList.remove('mole');
    });
}

// play game
playBtn.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play();

    btnContainer.classList.remove('game-over');
    setScoreboard();
    isPlaying = true;
    moveMole();
    countDownTimerId = setInterval(countDown, 1000);
    
    if(isFirstTime) {
        isFirstTime = false;
        playBtnIcon.classList.remove('fa-play');
        playBtnIcon.classList.add('fa-undo');
    }
});

setScoreboard();