const Dino = require('./dino');
const Util = require('./util');

class Game {
  constructor(ctx, canvas) {
    // Setting context and canvas
    this.ctx = ctx;
    this.canvas = canvas;

    // Setting dino player
    this.dino = new Dino({  
      position: [30, 30],
      canvas
    });

    // Setting and binding draw method for Game
    this.draw = this.draw.bind(this);

    // Setting game state
    this.gameOver = false;
    this.paused = false;
  }

  draw() {
    if (!this.gameOver && !this.paused) {
      requestAnimationFrame(this.draw);
      this.dino.update(this.ctx);
    }
  }

  // temp start function for game
  start() {
    this.draw();
  }

}

module.exports = Game;