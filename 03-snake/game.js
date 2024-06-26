const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const GRID_SIZE = 25;
const GRID_HEIGHT = 12;
const GRID_WIDTH = 16;

const SNAKE_TAIL_INITIAL_LENTH = 2;

let timestamp = 0;
let food;
let snake;

document.addEventListener('keydown', function (event) {
  switch (event.key) {
    case ' ':
      setup();
      break;
    default:
    // do nothing
  }
});

function setup() {
  console.log('setup');
  canvas.width = GRID_SIZE * GRID_WIDTH;
  canvas.height = GRID_SIZE * GRID_HEIGHT;

  snake = new Snake(GRID_SIZE, GRID_WIDTH, GRID_HEIGHT, SNAKE_TAIL_INITIAL_LENTH);
  snake.registerEventListener();

  food = new Food(GRID_SIZE, GRID_WIDTH, GRID_HEIGHT);
}

function clear() {
  context.fillStyle = '#FFFFFF';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#000000';
  context.strokeRect(0, 0, canvas.width, canvas.height);
}

function loop() {
  console.log('loop');
  clear();

  snake.draw(context);

  food.draw(context, snake);

  if (!snake.isAlive) {
    context.fillStyle = '#FF0000';
    context.font = "20px Georgia center";
    const gameoverText = 'Game Over';
    const gameover = context.measureText(gameoverText);
    context.fillText(gameoverText, (canvas.width / 2) - (gameover.width / 2), canvas.height / 2);
    const restartText = 'Press "Space" to Restart';
    const restartWidth = context.measureText(restartText).width;
    context.fillText(restartText, (canvas.width / 2) - (restartWidth / 2), canvas.height / 2 + 20);
  }

  requestAnimationFrame(loop);
}

function main() {
  setup();
  requestAnimationFrame(loop);
}

main();
