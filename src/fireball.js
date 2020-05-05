// Width and height of a sprite
const FIREBALL_WIDTH = 166;
const FIREBALL_HEIGHT = 84;
const EXPLOSION_WIDTH = 128;
const EXPLOSION_HEIGHT = 80;

// Creating array for fireball sprite
let fireballSprites = [];

for (let i = 0; i < 5; i++) {
  fireballSprites.push([FIREBALL_WIDTH * i, 0, FIREBALL_WIDTH, FIREBALL_HEIGHT]);
}

// Creating array for explosion sprite
let explosionSprites = [];

for (let i = 0; i < 10; i++) {
  explosionSprites.push([EXPLOSION_WIDTH * i, 0, EXPLOSION_WIDTH, EXPLOSION_HEIGHT]);
}

const SPRITES = {
  fireballSprites,
  explosionSprites
}

class Fireball {
  constructor(options) {    
    this.position = options.position;
    this.speed = options.speed;
    this.game = options.game;
    this.ctx = options.ctx;
    this.isWrappable = false;
    this.frames = 0;

    // Setting fireball image
    this.fireball = new Image();
    this.fireball.src = '../dist/assets/spritesheets/fireball.png';
    this.fireball.alt = 'Fireball';

    // Setting explosion image
    this.explosion = new Image();
    this.explosion.src = '../dist/assets/spritesheets/explosion.png';
    this.explosion.alt = 'Explosion';

    // Setting collision boolean
    this.isCollided = false;
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

  // Gets explosion sprite
  getExplosionSprite(sprites) {
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
    } else if (this.frames < 30) {
      this.frames += 1;
      return sprites[5];
    } else {
      this.frames = 0;
      return sprites[5];
    }
  }

  // Moving a fireball
  move() {
    if (!this.isCollided) {
      this.position[0] += this.speed;
      if (this.game.isOutOfBounds(this.position, 'fireball')) this.remove();
    }
  }

  // Hitbox for a fireball
  hitbox() {
    return {
      minX: this.position[0] + 50,
      minY: this.position[1],
      width: FIREBALL_WIDTH - 60,
      height: FIREBALL_HEIGHT
    };
  }

  // Removing a fireball
  remove() {
    this.game.remove(this);
  };

  // Checks if a fireball collided with an enemy
  collidedWith(otherObject) {
    const collided = (this.position[0] < otherObject.position[0] + otherObject.hitbox().width &&
      this.position[0] + this.hitbox().width > otherObject.position[0] &&
      this.position[1] < otherObject.position[1] + otherObject.hitbox().height &&
      this.position[1] + this.hitbox().height > otherObject.position[1]);

    if (collided) {
      this.isCollided = true;
      setTimeout(() => this.remove(), 1000);
      otherObject.remove();
      return true;
    }

    return false;
  };

  // Drawing a fireball
  draw(ctx) {
    let sprite;
    let image;

    if (this.isCollided) {
      sprite = this.getExplosionSprite(SPRITES.explosionSprites);
      image = this.explosion;
    } else {
      sprite = this.getSprite(SPRITES.fireballSprites);
      image = this.fireball;
    }
    
    ctx.drawImage(
      image,
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