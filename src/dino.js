const Fireball = require('./fireball');

// Constants
const FIREBALL_VEL = 5;

// Creating arrays for sprite walking, jumping, and crouching
const width = 24;
const height = 24;
let walk = [];
let jump = [];
let crouch = [];

for (let i = 4; i < 10; i++) {
  walk.push([width * i, 0, width, height]);
}

jump = [[width * 11, 0, width, height]];

for (let i = 18; i < 24; i++) {
  crouch.push([width * i, 0, width, height]);
}

const SPRITES = {
  walk,
  jump,
  crouch
};

class Dino {
  // Constructor for dino
  constructor(options) {
    // Setting player positioning and action
    this.position = options.position;
    this.canvas = options.canvas;
    this.ctx = options.ctx;
    this.falling = false;
    this.frames = 0;
    this.direction = 'idle';
    this.gameOver = false;

    // Setting new HTML img element
    // eventually add different dino color selection here...
    this.dino = new Image();

    // Preventing browser(s) from smoothing out/blurring lines
    this.ctx.mozImageSmoothingEnabled = false;
    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.msImageSmoothingEnabled = false;
    this.ctx.imageSmoothingEnabled = false;

    this.dino.src = '../dist/assets/spritesheets/red_dino.png';

    // Setting jump counter and boolean
    this.jumps = 0;
    this.isJumping = false;
  }

  // Toggles direction boolean
  toggleDirection(direction, heldDown) {
    this.direction = direction;

    if (this.direction === 'ArrowUp') {
      this.isJumping = true;
    }
  }

  // Gets the correct sprite
  getSprite() {        
    if (!this.gameOver) {
      if (!this.onGround() || this.direction === 'ArrowUp') {
        return SPRITES.jump[0];
      } else if (this.direction === 'idle') {
        return this.getIdleSprite(SPRITES.walk);
      } else if (this.direction === 'ArrowDown') {
        return this.getCrouchSprite(SPRITES.crouch);
      }
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
    } else if (this.frames < 25) {
      this.frames += 1;
      return sprites[2];
    } else if (this.frames < 30) {
      this.frames += 1;
      return sprites[3];
    } else if (this.frames < 35) {
      this.frames += 1;
      return sprites[4];
    } else if (this.frames < 40) {
      this.frames += 1;
      return sprites[5];
    } else {
      this.frames = 0;
      return sprites[5];
    }
  }

  // Jumping action
  jump() {
    const gravity = 0.3;
    let jumpStrength = 6;

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
    } else if (this.frames < 25) {
      this.frames += 1;
      return sprites[2];
    } else if (this.frames < 30) {
      this.frames += 1;
      return sprites[3];
    } else if (this.frames < 35) {
      this.frames += 1;
      return sprites[4];
    } else if (this.frames < 40) {
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
  // shootFireball() {
  //   const fireball = new Fireball({
  //     pos: this.pos,
  //     vel: FIREBALL_VEL,
  //     color: '000000',
  //     // game: this.game
  //   });

  //   // this.game.add(fireball);
  // };

  // Draws the dino sprite
  draw(ctx) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
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