class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.fallSpeed = 0;
  }

  update() {
    if (this.y < GRID_HEIGHT - 1) {
      this.y += this.fallSpeed;
      this.fallSpeed += FALL_ACCELERATION;
    } else {
      this.y = GRID_HEIGHT - 1;
      this.fallSpeed = 0;
    }
  }

  draw() {
    context.fillStyle = '#000000';
    context.fillRect(this.x * PIXEL_WIDTH, this.y * PIXEL_WIDTH, PIXEL_WIDTH, PIXEL_WIDTH);
  }
}
