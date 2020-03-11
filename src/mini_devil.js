const Util = require('./util');

class MiniDevil {
  constructor(options) {
    this.position = options.position;
    this.speed = options.speed;
    this.radius = 3;
    this.color = 'green';
    this.isWrappable = false;
  }

  // Moving a mini devil
  move() {
    this.position[0] -= this.speed;
  }

  // Hitbox for a mini devil
  hitbox() {
    return {
      minX: this.position[0] + 5,
      minY: this.position[1] + 5
    };
  }

  // Drawing a mini devil
  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.position[0], this.position[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }

  // Draws and updates MiniDevil movement
  update(ctx) {
    this.draw(ctx);
    this.move();
  }
}

module.exports = MiniDevil;