const WIDTH = 65;
const HEIGHT = 84;

// Creating array for enemy sprite
let robotSprites = [];

for (let i = 0; i < 8; i++) {
  robotSprites.push([WIDTH * i, 0, WIDTH, HEIGHT]);
}

// Accounting for sprite sheet order
robotSprites.reverse();

class Enemy {
  constructor(options) {
    this.prevPos = options.prevPos;
    this.position = options.game.randomPosition(this.prevPos);
    this.speed = options.speed;
    this.game = options.game;
    this.ctx = options.ctx;
    this.enemies = options.enemies;
    this.isWrappable = true;

    // Setting frames for sprite animation
    this.frames = 0;

    // Setting enemy image
    this.enemy = new Image();
    this.enemy.src = '../dist/assets/spritesheets/small_robot.png';
    this.enemy.alt = 'Robot enemy';
  }

  // Gets enemy sprite
  getSprite(sprites) {
    if (this.frames < 10) {
      this.frames += 1;
      return sprites[0];
    } else if (this.frames < 15) {
      this.frames += 1;
      return sprites[1];
    } else if (this.frames < 20) {
      this.frames += 1;
      return sprites[2];
    } else if (this.frames < 25) {
      this.frames += 1;
      return sprites[3];
    } else if (this.frames < 30) {
      this.frames += 1;
      return sprites[4];
    } else if (this.frames < 35) {
      this.frames += 1;
      return sprites[5];
    } else if (this.frames < 40) {
      this.frames += 1;
      return sprites[6];
    } else if (this.frames < 45) {
      this.frames += 1;
      return sprites[7];
    } else {
      this.frames = 0;
      return sprites[7];
    }
  }

  // Moving an enemy
  move() {
    this.position[0] -= this.speed;
    if (this.game.isOutOfBounds(this.position, 'enemy')) this.remove();
   }

  // Hitbox for a mini devil
  hitbox() {
    return {
      minX: this.position[0] + 10,
      minY: this.position[1] + 17,
      width: WIDTH - 22,
      height: HEIGHT - 15
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

  // Plays explosion
  playExplosion(sprites) {
    if (this.frames < 10) {
      this.frames += 1;
      return sprites[0];
    } else if (this.frames < 15) {
      this.frames += 1;
      return sprites[1];
    } else if (this.frames < 20) {
      this.frames += 1;
      return sprites[2];
    } else if (this.frames < 25) {
      this.frames += 1;
      return sprites[3];
    } else if (this.frames < 30) {
      this.frames += 1;
      return sprites[4];
    } else if (this.frames < 35) {
      this.frames += 1;
      return sprites[5];
    } else if (this.frames < 40) {
      this.frames += 1;
      return sprites[6];
    } else if (this.frames < 45) {
      this.frames += 1;
      return sprites[7];
    } else {
      this.frames = 0;
      return sprites[7];
    }
  }

  // Removing an enemy
  remove() {
    this.game.remove(this);
  };

  // Drawing a mini devil
  draw(ctx) {
    const sprite = this.getSprite(robotSprites);

    ctx.drawImage(
      this.enemy,
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

  // Draws and updates enemy movement
  update(ctx) {
    this.move();
    this.draw(ctx);
  }
}

module.exports = Enemy;