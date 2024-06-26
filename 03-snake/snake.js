class Snake {
  constructor(gridSize, gridWidth, gridHeight, tailLength) {
    this.x = Math.floor(Math.random() * gridWidth);
    this.y = Math.floor(Math.random() * gridHeight);
    this.gridSize = gridSize;
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.direction = -1;
    this.timestamp = 0;
    this.tailLength = tailLength;
    this.isAlive = true;
    this.allowChangeDirection = true;
    this.nextTail
  }

  registerEventListener() {
    document.addEventListener('keydown', function (event) {
      if (snake.allowChangeDirection) {
        switch (event.key) {
          case 'ArrowUp':
            if (snake.direction != 2) {
              snake.direction = 0;
              snake.allowChangeDirection = false;
            }
            break;
          case 'ArrowRight':
            if (snake.direction != 3) {
              snake.direction = 1;
              snake.allowChangeDirection = false;
            }
            break;
          case 'ArrowDown':
            if (snake.direction != 0) {
              snake.direction = 2;
              snake.allowChangeDirection = false;
            }
            break;
          case 'ArrowLeft':
            if (snake.direction != 1) {
              snake.direction = 3;
              snake.allowChangeDirection = false;
            }
            break;
          default:
          // do nothing
        }
      }
    });
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
    this.nextTail.addTail();
  }

  move() {
    let isMove = false;
    let prevX = this.x;
    let prevY = this.y;

    switch (this.direction) {
      case 0: {
        // up
        this.y--;
        isMove = true;
        break;
      }
      case 1: {
        // right
        this.x++;
        isMove = true;
        break;
      }
      case 2: {
        // bottom
        this.y++;
        isMove = true;
        break;
      }
      case 3: {
        // left
        this.x--;
        isMove = true;
        break;
      }
      default:
      // do nothing
    }

    // prevent out of bound
    // if (this.x < 0) {
    //   this.x = 0;
    //   isMove = false;
    // }
    // if (this.x > this.gridWidth - 1) {
    //   this.x = this.gridWidth - 1;
    //   isMove = false;
    // }
    // if (this.y < 0) {
    //   this.y = 0;
    //   isMove = false;
    // }
    // if (this.y > this.gridHeight - 1) {
    //   this.y = this.gridHeight - 1;
    //   isMove = false;
    // }

    // infinite level
    if (this.x < 0) {
      this.x = this.gridWidth - 1;
    }
    if (this.x > this.gridWidth - 1) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = this.gridHeight - 1;
    }
    if (this.y > this.gridHeight - 1) {
      this.y = 0;
    }

    if (isMove) {
      this.allowChangeDirection = true;

      this.nextTail.move(prevX, prevY, this.tailLength - 1);

      if (!this.nextTail.checkSpawn(this.x, this.y)) {
        this.isAlive = false;
      }
    }
  }

  draw(context) {
    if (this.isAlive && this.timestamp > 15) {
      this.move();
      this.timestamp = 0;
    }

    if (!this.nextTail && this.tailLength > 0) {
      this.nextTail = new SnakeTail(this.x, this.y, this.gridSize, this.tailLength - 1);
    }

    this.nextTail.draw(context);

    context.fillStyle = '#666666';
    context.fillRect(this.x * this.gridSize, this.y * this.gridSize, this.gridSize, this.gridSize);

    context.fillStyle = '#444444';
    context.fillRect(this.x * this.gridSize + 4, this.y * this.gridSize + 4, this.gridSize - 8, this.gridSize - 8);

    this.timestamp++;
  }
}
