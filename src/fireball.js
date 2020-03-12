const Util = require('./util');

const WIDTH = 10;
const HEIGHT = 10;

class Fireball {
  constructor(options) {
    this.position = options.position;
    this.speed = options.speed;
    this.game = options.game;
    this.radius = 3;
    this.color = 'yellow';
    this.isWrappable = false;
  }

  // Moving a fireball
  move() {
    this.position[0] += this.speed;
    if (this.game.isOutOfBounds(this.position, 'fireball')) this.remove();
  }

  // Hitbox for a fireball
  hitbox() {
    return {
      minX: this.position[0],
      minY: this.position[1],
      width: WIDTH,
      height: HEIGHT
    };
  }

  // Removing a fireball
  remove() {
    this.game.remove(this);
    // this.game.fireballs.pop();
  };

  collidedWith(otherObject) {
    const collided = (this.position[0] < otherObject.position[0] + otherObject.hitbox().width &&
      this.position[0] + this.hitbox().width > otherObject.position[0] &&
      this.position[1] < otherObject.position[1] + otherObject.hitbox().height &&
      this.position[1] + this.hitbox().height > otherObject.position[1]);

    if (collided) {
      this.remove();
      otherObject.remove();
      return true;
    }

    return false;
  };

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
    this.move();
    this.draw(ctx);
  }
}

module.exports = Fireball;