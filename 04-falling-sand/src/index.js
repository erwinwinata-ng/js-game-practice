GRID_HEIGHT = 150;
GRID_WIDTH = 150;
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

function loop(time) {
  clear();

  grid.update();
  grid.draw();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

function getRandomSandColor() {
  // Define ranges for HSL values that represent sand colors
  const hue = Math.floor(Math.random() * 21) + 30; // Hue range: 30-50
  const saturation = Math.floor(Math.random() * 21) + 40; // Saturation range: 40-60
  const lightness = Math.floor(Math.random() * 21) + 70; // Lightness range: 70-90

  // Construct HSL color string
  const hslColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  return hslColor;
}

let isMouseDown = false;
let intervalId = null;
let lastEvent = null;

function performAction() {
  if (lastEvent) {
    var x = Math.floor(lastEvent.offsetX / PIXEL_WIDTH);
    var y = Math.floor(lastEvent.offsetY / PIXEL_WIDTH);
    grid.setCircle(x, y, getRandomSandColor, 2);
  }
}

// Start the action when mouse is held down
document.addEventListener('mousedown', function (event) {
  if (!isMouseDown) {
    isMouseDown = true;
    lastEvent = event;
    performAction(); // Call the action function immediately
    intervalId = setInterval(performAction, 10); // Optionally, continue the action every 100ms
  }
});

// Stop the action when mouse is released
document.addEventListener('mouseup', function (event) {
  if (isMouseDown) {
    isMouseDown = false;
    clearInterval(intervalId); // Clear the interval to stop continuous execution
  }
});

// Optionally, perform the action continuously while the mouse moves
document.addEventListener('mousemove', function (event) {
  lastEvent = event;
  if (isMouseDown) {
    performAction(); // Call the action function on mouse move if needed
  }
});
