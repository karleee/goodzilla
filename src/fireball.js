// Width and height of a sprite
const WIDTH = 30;
const HEIGHT = 30;

// Creating array for fireball sprite
let fireballSprites = [];

for (let i = 0; i < 5; i++) {
  fireballSprites.push([WIDTH * i, 0, WIDTH, HEIGHT]);
}

class Fireball {
  constructor(options) {    
    this.position = options.position;
    this.speed = options.speed;
    this.game = options.game;
    this.ctx = options.ctx;
    this.radius = 3;
    this.color = 'yellow';
    this.isWrappable = false;
    this.frames = 0;

    // Setting fireball image
    this.fireball = new Image();

    // Preventing browser(s) from smoothing out/blurring lines
    this.ctx.mozImageSmoothingEnabled = false;
    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.msImageSmoothingEnabled = false;
    this.ctx.imageSmoothingEnabled = false;

    this.fireball.src = '../dist/assets/spritesheets/fireball.png';
    this.fireball.alt = 'Fireball';
  }

  // Gets fireball sprite
  getSprite(sprites) {
    if (this.frames < 5) {
      this.frames += 1;
      return sprites[0];
    } else if (this.frames < 10) {
      this.frames += 1;
      return sprites[1];
    } else if (this.frames < 15) {
      this.frames += 1;
      return sprites[2];
    } else if (this.frames < 20) {
      this.frames += 1;
      return sprites[3];
    } else if (this.frames < 25) {
      this.frames += 1;
      return sprites[4];
    } else {
      this.frames = 0;
      return sprites[4];
    }
  }

  // Moving a fireball
  move() {
    this.position[0] += this.speed;
    if (this.game.isOutOfBounds(this.position, 'fireball')) this.remove();
  }

  // Hitbox for a fireball
  hitbox() {
    return {
      minX: this.position[0] + 5,
      minY: this.position[1],
      width: WIDTH - 10,
      height: HEIGHT
    };
  }

  // Removing a fireball
  remove() {
    this.game.remove(this);
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
    const sprite = this.getSprite(fireballSprites);

    ctx.drawImage(
      this.fireball,
      sprite[0],
      sprite[1],
      sprite[2],
      sprite[3],
      this.position[0],
      this.position[1],
      sprite[2],
      sprite[3]
    );
  }

  // Draws and updates fireball movement
  update(ctx) {
    this.move();
    this.draw(ctx);
  }
}

module.exports = Fireball;