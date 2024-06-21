class SnakeTail {
  constructor(x, y, gridSize, tailLength) {
    this.x = x;
    this.y = y;
    this.gridSize = gridSize;
    this.tailLength = tailLength;

    this.nextTail;
  }

  move(x, y, tailLength) {
    if (this.nextTail) {
      this.nextTail.move(this.x, this.y, tailLength - 1);
    }

    this.x = x;
    this.y = y;
    this.tailLength = tailLength;
  }

  draw(context) {
    if (!this.nextTail && this.tailLength > 0) {
      this.nextTail = new SnakeTail(this.x, this.y, this.gridSize, this.tailLength - 1);
    }

    context.fillStyle = '#333333';
    context.fillRect(this.x * this.gridSize, this.y * this.gridSize, this.gridSize, this.gridSize);
    
    if (this.nextTail) {
      this.nextTail.draw(context);
    }

  }
}