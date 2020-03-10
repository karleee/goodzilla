// Hash with sprite dimensions and positions
// sx, sy, sWidth, and sHeight (relate to source image)
// dx, dy, dWidth, dHeight (relate to the canvas)

// Creating array of sprite positions for walking
const width = 24;
const height = 24;
// const firstSprite = [0, 0, width, height];
let walk = [];

for (let i = 4; i < 10; i++) {
  walk.push([width * i, 0, width, height]);
}

const SPRITES = {
  walk
};

class Dino {
  constructor(options) {
    // Setting player positioning and action
    this.position = options.position;
    this.walkspeed = options.walkspeed ? options.walkspeed : 1;
    this.falling = false;
    this.jumping = false;
    this.jumpCount = 0;
    this.frames = 0;

    // Setting canvas element
    this.canvas = options.canvas;

    // Setting new HTML img element
    // eventually add different dino color selection here...
    this.dino = new Image();
    this.dino.src = './assets/spritesheets/red_dino.png';

    // Setting game over state
    this.gameOver = false;
  }

  // Checks if player is on the ground
  onGround() {
    // temp set height to 0 for ground for testing (use this.canvas.height - # later on...)
    return this.position[0] === 30 && this.position[1] >= 30;
  }

  // Toggles jump boolean
  toggleJump() {
    this.jumping = true;
  }

  // Gets the correct sprites
  getSprite() {
    // console.log(SPRITES.walk);
    const walkCycle = SPRITES.walk;

    if (this.onGround() && !this.gameOver) {
      if (this.frames < 10) {
        this.frames += 1;
        return walkCycle[0];
      } else if (this.frames < 20) {
        this.frames += 1;
        return walkCycle[1];
      } else if (this.frames < 30) {
        this.frames += 1;
        return walkCycle[2];
      } else if (this.frames < 40) {
        this.frames += 1;
        return walkCycle[3];
      } else if (this.frames < 50) {
        this.frames += 1;
        return walkCycle[4];
      } else if (this.frames < 60) {
        this.frames += 1;
        return walkCycle[5];
      } else {
        this.frames = 0;
        return walkCycle[5];
      }
    }
  }

  // Draws the dino sprite
  draw(ctx) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    const sprite = this.getSprite();

    console.log('Sprite: ' + sprite);
    console.log('Frames: ' + this.frames);

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
    this.draw(ctx);
  }
}

module.exports = Dino;