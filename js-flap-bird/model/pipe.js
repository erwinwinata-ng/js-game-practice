class Pipe {
  constructor(x, y, size, gapSize, moveSpeed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.gapSize = gapSize;
    this.moveSpeed = moveSpeed;
    this.isScore = true;
  }

  move() {
    this.x -= this.moveSpeed;
  }

  checkCollision(bird) {
    if (
      bird.x + bird.size/2 >= this.x - this.size/2 &&
      bird.x - bird.size/2 <= this.x + this.size/2 &&
      (bird.y + bird.size/2 >= this.y + this.gapSize/2 || bird.y - bird.size/2 <= this.y - this.gapSize/2)
    ) {
      console.log('gameover');
      bird.isAlive = false
    }

    if (this.isScore && bird.x >= this.x) {
      bird.score++;
      this.isScore = false;
    }
  }

  draw(canvas, context, bird) {
    this.checkCollision(bird);

    context.fillStyle = 'green';
    // top pipe
    context.fillRect(this.x - this.size/2, -canvas.height/2, this.size, canvas.height/2 + this.y - this.gapSize/2);
    // bottom pipe
    context.fillRect(this.x - this.size/2, this.y + this.gapSize/2, this.size, canvas.height/2 - this.y - this.gapSize/2);

    // middle pipe line
    context.fillStyle = 'black';
    context.fillRect(this.x, -canvas.height/2, 1, canvas.height);

    this.move();
  }
}