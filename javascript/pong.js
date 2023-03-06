const gameContainer = document.querySelector(".game-container");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const ball = document.querySelector(".ball");
const player1Score = document.querySelector(".player1-score");
const player2Score = document.querySelector(".player2-score");
const startButton = document.querySelector(".start-button");
const restartButton = document.querySelector(".restart-button");
const stopButton = document.querySelector(".stop-button");

let ballXPosition = 246;
let ballYPosition = 146;
let ballXSpeed = -2;
let ballYSpeed = 2;
let player1YPosition = 120;
let player2YPosition = 120;
let player1ScoreCount = 0;
let playermovementspeed = 30;
let player2ScoreCount = 0;
let gameRunning = false;
let gameStopped = false;
let GameStarted = false;
let gamepause = false;

function moveBall() {
  ballXPosition += ballXSpeed;
  ballYPosition += ballYSpeed;

  // Check if the ball hits the player1 paddle
  if (
    ballXPosition <= 18 &&
    ballYPosition >= player1YPosition - 8 &&
    ballYPosition <= player1YPosition + 58
  ) {
    ballXSpeed = -ballXSpeed;
  }

  // Check if the ball hits the player2 paddle
  if (
    ballXPosition >= 472 &&
    ballYPosition >= player2YPosition - 8 &&
    ballYPosition <= player2YPosition + 58
  ) {
    ballXSpeed = -ballXSpeed;
  }

  // Check if the ball hits the top or bottom wall
  if (ballYPosition <= 0 || ballYPosition >= 292) {
    ballYSpeed = -ballYSpeed;
  }

  // Check if the ball goes out of bounds on the left or right side
  if (ballXPosition <= -10) {
    player2ScoreCount++;
    player2Score.textContent = player2ScoreCount;
    if (player2ScoreCount >= 10) {
      endGame("Gracz 2");
    } else {
      resetBall();
    }
  } else if (ballXPosition >= 506) {
    player1ScoreCount++;
    player1Score.textContent = player1ScoreCount;
    if (player1ScoreCount >= 10) {
      endGame("Gracz 1");
    } else {
      resetBall();
    }
  }

  ball.style.top = ballYPosition + "px";
  ball.style.left = ballXPosition + "px";
}
let lastPlayer1Movement = null;
let lastPlayer2Movement = null;
const movementDelay = 0; // milliseconds


function movePlayer1(event) {
  const gameContainerHeight = gameContainer.getBoundingClientRect().height;
  const playerHeight = player1.getBoundingClientRect().height;

  if (event.keyCode === 87 && lastPlayer1Movement !== "down" && player1YPosition > 0) {
    player1YPosition -= playermovementspeed / gameContainerHeight * 100;
    player1.style.top = player1YPosition / gameContainerHeight * 100 + "%";
    lastPlayer1Movement = "up";
    setTimeout(() => {lastPlayer1Movement = null;}, movementDelay);
  }
  if (event.keyCode === 83 && lastPlayer1Movement !== "up" && player1YPosition < gameContainerHeight - playerHeight) {
    player1YPosition += playermovementspeed / gameContainerHeight * 100;
    player1.style.top = player1YPosition / gameContainerHeight * 100 + "%";
    lastPlayer1Movement = "down";
    setTimeout(() => {lastPlayer1Movement = null;}, movementDelay);
  }
}

function movePlayer2(event) {
  const gameContainerHeight = gameContainer.getBoundingClientRect().height;
  const playerHeight = player2.getBoundingClientRect().height;

  if (event.keyCode === 38 && lastPlayer2Movement !== "down" && player2YPosition > 0) {
    player2YPosition -= playermovementspeed / gameContainerHeight * 100;
    player2.style.top = player2YPosition / gameContainerHeight * 100 + "%";
    lastPlayer2Movement = "up";
    setTimeout(() => {lastPlayer2Movement = null;}, movementDelay);
  }
  if (event.keyCode === 40 && lastPlayer2Movement !== "up" && player2YPosition < gameContainerHeight - playerHeight) {
    player2YPosition += playermovementspeed / gameContainerHeight * 100;
    player2.style.top = player2YPosition / gameContainerHeight * 100 + "%";
    lastPlayer2Movement = "down";
    setTimeout(() => {lastPlayer2Movement = null;}, movementDelay);
  }
}

function resetBall() {
  ballXPosition = 246;
  ballYPosition = 146;
  ballXSpeed = -2;
  ballYSpeed = 2;
}

function startGame() {
  if (!gameRunning && gamepause==false) {
    playermovementspeed = 30;
    document.getElementById("paused-message").innerHTML = "";

    GameStarted = true;
    gameRunning = true;
    gameStopped = false;
    startButton.textContent = "Restart";
    player1ScoreCount = 0;
    player2ScoreCount = 0;
    player1Score.textContent = "0";
    player2Score.textContent = "0";
    resetBall();
    moveBallInterval = setInterval(moveBall, 10);
  } else {
    playermovementspeed = 0;
    document.getElementById("paused-message").innerHTML = "Press again START";

    GameStarted = false;
    gameRunning = false;
    startButton.textContent = "Start";
    clearInterval(moveBallInterval);
  }
}

function endGame(winner) {
  clearInterval(moveBallInterval);
  gameRunning = false;
  gameStopped = true;
  alert(`${winner} Wygrywa gre!`);
  startButton.textContent = "Start";
}

function restartGame() {
  clearInterval(moveBallInterval);
  gameRunning = false;
  gameStopped = false;
  startButton.textContent = "Start";
  player1ScoreCount = 0;
  player2ScoreCount = 0;
  player1Score.textContent = "0";
  player2Score.textContent = "0";
  resetBall();
  player1YPosition = 120;
  player2YPosition = 120;
  player1.style.top = player1YPosition + "px";
  player2.style.top = player2YPosition + "px";
}

function stopGame() {

  if (!gameRunning) {
    playermovementspeed = 30;

    gamepause = false;
    document.getElementById("paused-message").innerHTML = "";
    gameRunning = true;
    gameStopped = false;
    stopButton.textContent = "Stop";

    resetBall();
    moveBallInterval = setInterval(moveBall, 10);
  } else {
    playermovementspeed = 0;

    gamepause = true;
    document.getElementById("paused-message").innerHTML = "Game is paused";
    gameRunning = false;
    stopButton.textContent = "Wznów";
    clearInterval(moveBallInterval);
  }
}

document.addEventListener("keydown", movePlayer1);
document.addEventListener("keydown", movePlayer2);
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);
stopButton.addEventListener("click", stopGame);

