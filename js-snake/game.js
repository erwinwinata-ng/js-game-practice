const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const GRID_SIZE = 25;
const GRID_HEIGHT = 12;
const GRID_WIDTH = 16;

const SNAKE_TAIL_INITIAL_LENTH = 2;

let timestamp = 0;

let snake;
function setup() {
  console.log('setup');
  canvas.width = GRID_SIZE * GRID_WIDTH;
  canvas.height = GRID_SIZE * GRID_HEIGHT;

  snake = new Snake(0, 0, GRID_SIZE, GRID_WIDTH, GRID_HEIGHT, SNAKE_TAIL_INITIAL_LENTH);
  snake.registerEventListener();
}

function clear() {
  context.fillStyle = '#FFF';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#000';
  context.strokeRect(0, 0, canvas.width, canvas.height);
}

function loop() {
  console.log('loop');
  clear();

  snake.draw(context);

  requestAnimationFrame(loop);
}

function main() {
  setup();
  requestAnimationFrame(loop);
}

main();