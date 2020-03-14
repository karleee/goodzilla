const Util = require('./util');

const WIDTH = 5;
const HEIGHT = 5;

class Enemy {
  constructor(options) {
    this.position = options.position || options.game.randomPosition();
    this.speed = options.speed;
    this.game = options.game;
    this.isWrappable = true;
  }

  // Moving an enemy
  move() {
    this.position[0] -= this.speed;
    if (this.game.isOutOfBounds(this.position, 'enemy')) this.remove();
   }

  // Hitbox for a mini devil
  hitbox() {
    return {
      minX: this.position[0],
      minY: this.position[1],
      width: WIDTH,
      height: HEIGHT
    };
  }

  // Checks if an enemy collieded with a fireball
  collidedWith(otherObject) {
    const posX = this.hitbox().minX;
    const posY = this.hitbox().minY;

    const collided = (posX < otherObject.hitbox().minX + otherObject.hitbox().width &&
      posX + this.hitbox().width > otherObject.hitbox().minX &&
      posY < otherObject.hitbox().minY + otherObject.hitbox().height &&
      posY + this.hitbox().height > otherObject.hitbox().minY);

    if (collided) {
      this.remove();
      otherObject.remove();
      return true;
    }

    return false;
  }

  // Removing an enemy
  remove() {
    this.game.remove(this);
  };

  // Drawing a mini devil
  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.hitbox().minX, this.hitbox().minY, this.hitbox().width, this.hitbox().height);
    ctx.stroke();
  }

  // Draws and updates enemy movement
  update(ctx) {
    this.move();
    this.draw(ctx);
  }
}

module.exports = Enemy;