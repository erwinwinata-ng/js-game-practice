class SnakeTail {
  constructor(x, y, gridSize, tailLength) {
    this.x = x;
    this.y = y;
    this.gridSize = gridSize;
    this.tailLength = tailLength;

    this.nextTail;
  }

  checkSpawn(x, y) {
    if (this.x === x && this.y === y) {
      return false;
    }

    if (this.tailLength > 0) {
      return this.nextTail.checkSpawn(x, y);
    }

    return true;
  }

  addTail() {
    this.tailLength++;

    if (this.nextTail) {
      this.nextTail.addTail();
    }
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

    if (this.nextTail) {
      this.nextTail.draw(context);
    }

    context.fillStyle = '#333333';
    context.fillRect(this.x * this.gridSize, this.y * this.gridSize, this.gridSize, this.gridSize);
    context.fillStyle = '#111111';
    context.fillRect(this.x * this.gridSize + 4, this.y * this.gridSize + 4, this.gridSize - 8, this.gridSize - 8);
  }
}
