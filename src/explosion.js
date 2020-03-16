// Width and height of a sprite
const EXPLOSION_WIDTH = 128;
const EXPLOSION_HEIGHT = 80;

// Creating array for explosion sprite
let explosionSprites = [];

for (let i = 0; i < 10; i++) {
  explosionSprites.push([EXPLOSION_WIDTH * i, 0, EXPLOSION_WIDTH, EXPLOSION_HEIGHT]);
}

const SPRITES = {
  // fireballSprites,
  explosionSprites
}

class Explosion {
  constructor(options) {
    this.position = options.position;
    this.game = options.game;
    this.frames = 0;

    // Setting explosion image
    this.explosion = new Image();
    this.explosion.src = '../dist/assets/spritesheets/explosion.png';
    this.explosion.alt = 'Explosion';
  }

  // Gets explosion sprite
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
    } else if (this.frames < 30) {
      this.frames += 1;
      return sprites[5];
    } else if (this.frames < 35) {
      this.frames += 1;
      return sprites[6];
    } else {
      this.frames = 0;
      return sprites[6];
    }
  }

  // Moving an explosion
  move() {
    // temp using enemy for testing
    if (this.game.isOutOfBounds(this.position, 'enemy')) this.remove();
  }

  // Removing an explosion
  remove() {
    this.game.remove(this);
  };

  // Drawing a fireball
  draw(ctx) {
    const sprite = this.getSprite(SPRITES.explosionSprites);;
    const image = this.explosion;

    console.log(image);

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

module.exports = Explosion;