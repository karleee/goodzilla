const Fireball = require('./fireball');
const Enemy = require('./enemy');
const Util = require('./util');

// Constants
const FIREBALL_VEL = 5;
const WIDTH = 24;
const HEIGHT = 24;

// Creating arrays for sprite walking, jumping, and crouching
let walk = [];
let jump = [];
let crouch = [];
let hit = [];

for (let i = 4; i < 10; i++) {
  walk.push([WIDTH * i, 0, WIDTH, HEIGHT]);
}

jump = [[WIDTH * 11, 0, WIDTH, HEIGHT]];

for (let i = 18; i < 24; i++) {
  crouch.push([WIDTH * i, 0, WIDTH, HEIGHT]);
}

// Populating hit array
for (let i = 14; i < 17; i++) {
  hit.push([WIDTH * i, 0, WIDTH, HEIGHT]);
}

hit.push([WIDTH * 7, 0, WIDTH, HEIGHT]);
hit.push([WIDTH * 8, 0, WIDTH, HEIGHT]);
hit.push([WIDTH * 9, 0, WIDTH, HEIGHT]);

const SPRITES = {
  walk,
  jump,
  crouch,
  hit
};

class Dino {
  // Constructor for dino
  constructor(options) {
    // Setting player positioning and action
    this.position = options.position;
    this.canvas = options.canvas;
    this.ctx = options.ctx;
    this.game = options.game;
    this.dinoColor = options.dinoColor;
    this.frames = 0;
    this.direction = 'idle';

    // Setting game state boolean
    this.gameOver = false;

    // Setting new HTML img element
    // eventually add different dino color selection here...
    this.dino = new Image();

    // Preventing browser(s) from smoothing out/blurring lines
    this.ctx.mozImageSmoothingEnabled = false;
    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.msImageSmoothingEnabled = false;
    this.ctx.imageSmoothingEnabled = false;

    this.dino.src = `../dist/assets/spritesheets/${this.dinoColor}_dino.png`;
    this.dino.alt = `${this.dinoColor} dino`;

    // debugger;

    // Setting jump counter and boolean
    this.jumps = 0;
    this.isJumping = false;
  }

  // Toggles direction boolean
  toggleDirection(direction) {
    this.direction = direction;

    if (this.direction === 'ArrowUp') {
      this.isJumping = true;
    } else if (this.direction === 'Space') {
      this.shootFireball();
    }
  }

  // Gets the correct sprite
  getSprite() {       
    // if (!this.gameOver) {
      if (this.gameOver) {
        return this.getHitSprite(SPRITES.hit);
      } else if (!this.onGround() || this.direction === 'ArrowUp') {
        return SPRITES.jump[0];
      } else if (this.direction === 'idle') {
        return this.getIdleSprite(SPRITES.walk);
      } else if (this.direction === 'ArrowDown' || this.direction === 'Space') {
        return this.getCrouchSprite(SPRITES.crouch);
      }
    // }
  }

  getHitSprite(sprites) {
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
      this.frames = 0;
      return sprites[5];
    }
  }

  // Gets idle sprite
  getIdleSprite(sprites) {
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
    } else {
      this.frames = 0;
      return sprites[5];
    }
  }

  // Jumping action
  jump() {
    const gravity = 0.6;
    let jumpStrength = 9;

    if (this.isJumping) {
      if (this.jumps === 0 || !this.onGround()) {
        this.position[1] -= jumpStrength - gravity * this.jumps;
        this.jumps += 1;
      } else {
        this.position[1] = this.canvas.height - 25;
        this.jumps = 0;
        this.isJumping = false;
      }
    }
  }

  // Gets crouch sprite
  getCrouchSprite(sprites) {  
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
    } else {
      this.frames = 0;
      return sprites[5];
    }
  }

  // Checks if dino is on the ground
  onGround() {
    return this.position[0] === 30 && this.position[1] >= this.canvas.height - 25;
  }

  // Adds a fireball to the array to be shot by the player
  shootFireball() {
    const startPos = [this.position[0] + 25, this.position[1] + 10];

    const fireball = new Fireball({
      position: startPos,
      speed: FIREBALL_VEL,
      game: this.game
    });

    this.game.add(fireball);

    return fireball;
  };

  // Checks if the dino collieded with an enemy
  collidedWith(otherObject) {
    const posX = this.hitbox().minX;
    const posY = this.hitbox().minY;

    const collided = (posX < otherObject.hitbox().minX + otherObject.hitbox().width &&
      posX + this.hitbox().width > otherObject.hitbox().minX &&
      posY < otherObject.hitbox().minY + otherObject.hitbox().height &&
      posY + this.hitbox().height > otherObject.hitbox().minY);

    if (collided) {
      this.gameOver = true;
      return true;
    }

    return false;
  };

  // Hitbox for dino
  hitbox() {
    return {
      minX: this.position[0] + 6,
      minY: this.position[1] + 5,
      width: WIDTH - 9,
      height: HEIGHT - 8
    };
  }

  // Draws the dino sprite
  draw(ctx) {    
    const sprite = this.getSprite();

    ctx.drawImage(
      this.dino,
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

  update(ctx) {
    this.jump();
    this.draw(ctx);
  }
}

module.exports = Dino;