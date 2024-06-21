class Bird {
  constructor(x, y, size, jumpSpeed, gravity) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.jumpSpeed = jumpSpeed;
    this.gravity = gravity;
    this.fallSpeed = 0;
    this.angle = 0;
    this.isJump = false;
    this.isAlive = true;
    this.score = 0;
  }

  checkOutOfBound() {
    // above
    if (this.y < -canvas.height/2) {
      this.y = -canvas.height/2 + this.size/2;
      this.fallSpeed = 0;
    }

    // bottom
    if (this.y + this.size/2 > canvas.height/2) {
      this.y = canvas.height/2 - this.size/2;
      this.fallSpeed = 0;
    }
  }

  fall() {
    this.y += this.fallSpeed;
    this.fallSpeed += this.gravity;
    this.angle += Math.PI * 2 / 180;
    if (this.angle > Math.PI * 45 / 180) {
      this.angle = Math.PI * 45 / 180;
    }
    console.log(this.angle);
  }
 
  jump() {
    this.fallSpeed = -this.jumpSpeed;
    this.angle = Math.PI * -45 / 180;
  }

  draw(context) {
    this.checkOutOfBound();


    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.fillStyle = 'red';
    context.fillRect(-this.size/2, -this.size/2, this.size, this.size);
    context.fillStyle = 'yellow';
    context.fillRect(0, 0, this.size/2, this.size/2);
    context.rotate(-this.angle);

    context.translate(-this.x, -this.y);
    this.fall();
  }

  registerEventListener(jumpKey) {
    document.addEventListener('keydown', function (event) {
      if (event.key === jumpKey) {
        if (!jumpTriggered) {
          bird.jump();
          jumpTriggered = true;
        }
      }
    });

    document.addEventListener('keyup', function (event) {
      if (event.key === jumpKey) {
        jumpTriggered = false;
      }
    });
  }
}