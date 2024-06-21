class Snake {
  constructor(x, y, gridSize, gridWidth, gridHeight, tailLength) {
    this.x = x;
    this.y = y;
    this.gridSize = gridSize;
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.direction = -1;
    this.timestamp = 0;
    this.tailLength = tailLength;

    this.nextTail
  }
  
  registerEventListener() {
    document.addEventListener('keydown', function (event) {
      console.log(event.key);
      switch(event.key) {
        case 'ArrowUp':
          snake.direction = 0;
          break;
        case 'ArrowRight':
          snake.direction = 1;
          break;
        case 'ArrowDown':
          snake.direction = 2;
          break;
        case 'ArrowLeft':
          snake.direction = 3;
          break;
        default:
          // do nothing
      }
      console.log(snake.direction);
    })
  }

  move() {
    let isMove  = false;
    let prevX = this.x;
    let prevY = this.y;

    switch(this.direction) {
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
    if (this.x < 0) {
      this.x = 0;
      isMove = false;
    }
    if (this.x > this.gridWidth - 1) {
      this.x = this.gridWidth - 1;
      isMove = false;
    }
    if (this.y < 0) {
      this.y = 0;
      isMove = false;
    }
    if (this.y > this.gridHeight - 1) {
      this.y = this.gridHeight - 1;
      isMove = false;
    }

    if (isMove) {
      this.nextTail.move(prevX, prevY, this.tailLength - 1);
    }
  }

  draw(context) {
    if (!this.nextTail && this.tailLength > 0) {
      this.nextTail = new SnakeTail(this.x, this.y, this.gridSize, this.tailLength - 1);
    }

    // console.log(this.timestamp);
    if (this.timestamp > 15) {
      this.move();
      this.timestamp = 0;
    }

    this.nextTail.draw(context);

    context.fillStyle = '#555555';
    context.fillRect(this.x * this.gridSize, this.y * this.gridSize, this.gridSize, this.gridSize);

    this.timestamp++;
  }
}