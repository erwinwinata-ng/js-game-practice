class Food {
  constructor(gridSize, gridWidth, gridHeight) {
    this.x = Math.floor(Math.random() * gridWidth);
    this.y = Math.floor(Math.random() * gridHeight);
    this.gridSize = gridSize;
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.isValid = true
  }

  check(snake) {
    if (this.isValid && this.x === snake.x && this.y === snake.y) {
      console.log('food eaten');
      while (!snake.checkSpawn(this.x, this.y)) {
        this.x = Math.floor(Math.random() * this.gridWidth);
        this.y = Math.floor(Math.random() * this.gridHeight);
      }

      snake.addTail();

      this.isValid = false;
    }

    if (!this.isValid && (this.x !== snake.x || this.y !== snake.y)) {
      console.log('food is valid');
      this.isValid = true;
    }
  }

  draw(context, snake) {
    this.check(snake);

    context.fillStyle = '#BB0000';
    context.fillRect(this.x * this.gridSize, this.y * this.gridSize, this.gridSize, this.gridSize);
    context.fillStyle = '#FF0000';
    context.fillRect(this.x * this.gridSize + 4, this.y * this.gridSize + 4, this.gridSize - 8, this.gridSize - 8);
  }
}
