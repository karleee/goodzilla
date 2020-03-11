const Util = require('./util');

class Fireball {
  constructor(options) {
    this.position = options.position;
    this.speed = options.speed;
    this.radius = 3;
    this.color = 'yellow';
    this.isWrappable = false;
  }

  // Moving a fireball
  move() {
    this.position[0] += this.speed;
  }

  // Hitbox for a fireball
  hitbox() {
    return {
      minX: this.position[0] + 5,
      minY: this.position[1] + 5
    };
  }

  // Drawing a fireball
  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.position[0], this.position[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }

  // Draws and updates fireball movement
  update(ctx) {
    this.draw(ctx);
    this.move();
  }
}

module.exports = Fireball;