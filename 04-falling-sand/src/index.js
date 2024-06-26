GRID_HEIGHT = 100;
GRID_WIDTH = 100;
PIXEL_WIDTH = 5;
FALL_ACCELERATION = 0.05;

canvas = document.getElementById('game');
context = this.canvas.getContext('2d');

canvas.height = GRID_HEIGHT * PIXEL_WIDTH;
canvas.width = GRID_WIDTH * PIXEL_WIDTH;

const grid = new Grid(GRID_WIDTH, GRID_HEIGHT);

function clear() {
  context.fillStyle = '#FFFFFF';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#000000';
  context.strokeRect(0, 0, canvas.width, canvas.height);
}

let frameCount = 0;

function loop(time) {
  if (frameCount % (60 / 15) === 0) {
    clear();

    grid.update();
    grid.draw();
  }

  frameCount++;
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

let isMouseDown = false;

document.addEventListener('mousedown', function (event) {
  isMouseDown = true;
});
document.addEventListener('mouseup', function (event) {
  isMouseDown = false;
});

function getRandomSandColor() {
  // Define ranges for HSL values that represent sand colors
  const hue = Math.floor(Math.random() * 21) + 30; // Hue range: 30-50
  const saturation = Math.floor(Math.random() * 21) + 40; // Saturation range: 40-60
  const lightness = Math.floor(Math.random() * 21) + 70; // Lightness range: 70-90

  // Construct HSL color string
  const hslColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  return hslColor;
}

document.addEventListener('mousemove', function (event) {
  if (isMouseDown) {
    var x = Math.floor(event.offsetX / PIXEL_WIDTH);
    var y = Math.floor(event.offsetY / PIXEL_WIDTH);
    grid.set(x, y, getRandomSandColor());
  }
});
