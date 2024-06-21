const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const GRAVITY = 0.2;
const BIRD_SIZE = 20;
const BIRD_JUMP_SPEED = 5;
const PIPE_GAP_SIZE = 100;
const PIPE_WIDTH = 50;
const PIPE_RANGE = 150;
const PIPE_MOVE_SPEED = 2;

const bird = new Bird(0, 0, BIRD_SIZE, BIRD_JUMP_SPEED, GRAVITY);
const pipes = [];

let jumpTriggered = false;
let nextPipeX = PIPE_RANGE;

const clear = () => {
  // clear
  context.fillStyle = '#FFFFFF';
  context.fillRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
  // center line
  context.fillStyle = '#000000';
  context.fillRect(0, -canvas.height/2, 1, canvas.height);
  context.fillRect(-canvas.width/2, 0, canvas.width, 1);
}

const drawAllPipes = () => {
  if (nextPipeX < canvas.width/2 + PIPE_WIDTH/2) {
    const yLimit = canvas.height - (PIPE_GAP_SIZE) - 25 ;
    const nextPipeY = (Math.random() * yLimit) - (yLimit/2);
    pipes.push(new Pipe(nextPipeX, nextPipeY, PIPE_WIDTH, PIPE_GAP_SIZE, PIPE_MOVE_SPEED));

    nextPipeX += PIPE_RANGE;
  }

  for (const pipe of pipes) {
    pipe.draw(canvas, context, bird);
  }

  if (pipes[0].x < -canvas.width/2 - pipes[0].size/2) {
    // remove pipe after ourside of screen
    pipes.splice(0, 1);
  }

  nextPipeX -= PIPE_MOVE_SPEED;
}

const render = () => {
  clear();
  
  drawAllPipes();
  bird.draw(context);

  // score
  context.fillStyle = 'red';
  context.font = '48px Arial';
  context.fillText(bird.score, -canvas.width/2 + 10, canvas.height/2 - 10);

  if (bird.isAlive) {
    requestAnimationFrame(render);
  }

  console.log(bird.score);
}

const main = () => {
  canvas.width = 400;
  canvas.height = 300;
  context.translate(canvas.width/2, canvas.height/2);

  bird.registerEventListener(' ');
  requestAnimationFrame(render);
};

main();