class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.grid = new Array(width * height).fill(null);
  }

  set(x, y, color) {
    this.grid[Math.floor((y * this.width) + x)] = color;
  }

  setCircle(x_center, y_center, colorFunction, radius = 0, numPoint = 360) {
    const x_min = Math.floor(x_center - radius);
    const x_max = Math.ceil(x_center + radius);
    const y_min = Math.floor(y_center - radius);
    const y_max = Math.ceil(y_center + radius);

    for (let x = x_min; x <= x_max; x++) {
      for (let y = y_min; y <= y_max; y++) {
        // Check if (x, y) is inside the circle
        if ((x - x_center) * (x - x_center) + (y - y_center) * (y - y_center) <= radius * radius) {
          this.set(x, y, colorFunction());
        }
      }
    }
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

      const direction = Math.random() > 0.5 ? -1 : 1;
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
