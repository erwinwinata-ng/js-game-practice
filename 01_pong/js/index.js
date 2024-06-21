const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 300;

const BACKGROUND_COLOR = '#000000';
const PLAYER_COLOR = '#FFFFFF';
const PLAYER_WIDTH = 10;
const PLAYER_HEIGHT = 50;
const PLAYER_SPEED = 3;
const BALL_SIZE = 10;
const BALL_INITIAL_SPEED = 3;
const BALL_SPEED_MULTIPLIER = 1.1;

let gameover = false;

let p1up = false;
let p1down = false;
let p1PosX = 10;
let p1PosY = canvas.height / 2 - PLAYER_HEIGHT / 2;

let p2up = false;
let p2down = false;
let p2PosX = canvas.width - 20;
let p2PosY = canvas.height / 2 - PLAYER_HEIGHT / 2;

let ballPosX = canvas.width / 2 - BALL_SIZE / 2;
let ballPosY = canvas.height / 2 - BALL_SIZE / 2;
let ballVelocity = BALL_INITIAL_SPEED;
let ballSpeedX = -1;
let ballSpeedY = 1;

// Listen for keydown events
document.addEventListener('keydown', function (event) {
  if (event.key === 'W' || event.key === 'w') { // UP
    p1up = true;
  }
  if (event.key === 'S' || event.key === 's') { // DOWN
    p1down = true;
  }
  if (event.key === 'ArrowUp') { // UP
    p2up = true;
  }
  if (event.key === 'ArrowDown') { // DOWN
    p2down = true;
  }
});

// Listen for keyup events
document.addEventListener('keyup', function (event) {
  if (event.key === 'W' || event.key === 'w') { // UP
    p1up = false;
  }
  if (event.key === 'S' || event.key === 's') { // DOWN
    p1down = false;
  }
  if (event.key === 'ArrowUp') { // UP 
    p2up = false;
  }
  if (event.key === 'ArrowDown') { // DOWN
    p2down = false;
  }
});

function clearCanvas() {
  context.fillStyle = BACKGROUND_COLOR;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function playerMove() {
  if (p1up) {
    p1PosY -= PLAYER_SPEED;
  }
  if (p1down) {
    p1PosY += PLAYER_SPEED;
  }

  if (p1PosY < 0) {
    p1PosY = 0;
  }
  if (p1PosY > canvas.height - PLAYER_HEIGHT) {
    p1PosY = canvas.height - PLAYER_HEIGHT;
  }

  if (p2up) {
    p2PosY -= PLAYER_SPEED;
  }
  if (p2down) {
    p2PosY += PLAYER_SPEED;
  }

  if (p2PosY < 0) {
    p2PosY = 0;
  }
  if (p2PosY > canvas.height - PLAYER_HEIGHT) {
    p2PosY = canvas.height - PLAYER_HEIGHT;
  }
}

function ballCollision() {
  if (
    (ballPosX >= p1PosX && ballPosX <= p1PosX + PLAYER_WIDTH) &&
    (ballPosY + BALL_SIZE >= p1PosY && ballPosY <= p1PosY + PLAYER_HEIGHT)
  ) {
    ballSpeedX = 1;
    ballVelocity *= BALL_SPEED_MULTIPLIER;
  }

  if (
    (ballPosX + BALL_SIZE >= p2PosX && ballPosX + BALL_SIZE <= p2PosX + PLAYER_WIDTH) &&
    (ballPosY + BALL_SIZE >= p2PosY && ballPosY <= p2PosY + PLAYER_HEIGHT)
  ) {
    ballSpeedX = -1;
    ballVelocity *= BALL_SPEED_MULTIPLIER;
  }
}

function ballMove() {
  ballPosX += ballSpeedX * ballVelocity;
  ballPosY += ballSpeedY * ballVelocity;

  if (ballPosX <= 0 || ballPosX >= canvas.width - BALL_SIZE) {
    gameover = true;
  }
  if (ballPosY <= 0 || ballPosY >= canvas.height - BALL_SIZE) {
    ballSpeedY = -ballSpeedY;
  }

  ballCollision();
}

function drawPlayer() {
  context.fillStyle = PLAYER_COLOR;
  context.fillRect(p1PosX, p1PosY, PLAYER_WIDTH, PLAYER_HEIGHT);
  context.fillRect(p2PosX, p2PosY, PLAYER_WIDTH, PLAYER_HEIGHT);
}

function drawBall() {
  context.fillStyle = PLAYER_COLOR;
  context.fillRect(ballPosX, ballPosY, BALL_SIZE, BALL_SIZE);
}

function render(time) {
  clearCanvas();

  playerMove();
  ballMove();

  drawPlayer();
  drawBall();

  if (gameover) {
    // TODO: gameover
  } else {
    requestAnimationFrame(render);
  }
}

requestAnimationFrame(render);
