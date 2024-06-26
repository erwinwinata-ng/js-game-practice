class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.grid = new Array(width * height).fill(null);
  }

  set(x, y, color) {
    this.grid[Math.floor((y * this.width) + x)] = color;
  }

  swap(a, b) {
    const temp = this.grid[a];
    this.grid[a] = this.grid[b];
    this.grid[b] = temp;
  }

  isEmpty(index) {
    return this.grid[index] === null;
  }

  updatePixel(i) {
    if (!this.isEmpty(i)) {
      const below = i + this.width;

      const direction = Math.random() < 0.5 ? -1 : 1;
      const belowA = below - direction;
      const belowB = below + direction;

      const belowX = below % this.width;
      const belowAX = belowA % this.width;
      const belowBX = belowB % this.width;

      const isBelowAValid = belowX - belowAX === 1 || belowX - belowAX === -1;
      const isBelowBValid = belowX - belowBX === 1 || belowX - belowBX === -1;

      if (this.isEmpty(below)) {
        this.swap(i, below);
      } else if (isBelowAValid && this.isEmpty(belowA)) {
        this.swap(i, belowA);
      } else if (isBelowBValid && this.isEmpty(belowB)) {
        this.swap(i, belowB);
      }
    }
  }

  update() {
    for (let i = this.grid.length - this.width - 1; i >= 0; i--) {
      this.updatePixel(i);
    }
  }

  draw() {
    this.grid.forEach((color, index) => {
      // 0 -> 0, 0
      // 1 -> 1, 0
      // 2 -> 2, 0
      const x = index % this.width;
      const y = Math.floor(index / this.width);
      if (color != null) {
        context.fillStyle = color;
        context.fillRect(PIXEL_WIDTH * x, PIXEL_WIDTH * y, PIXEL_WIDTH, PIXEL_WIDTH);
      }
    });
  }
}
