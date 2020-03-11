const Dino = require('./dino');
const Fireball = require('./fireball');
const Background = require('./background');
const Util = require('./util');

class Game {
  // Constructor for game
  constructor(gameCtx, gameCanvas, backgroundCtx, backgroundCanvas, foregroundCtx, foregroundCanvas) {
    // Setting context and canvas
    this.gameCtx = gameCtx;
    this.gameCanvas = gameCanvas;
    this.backgroundCtx = backgroundCtx;
    this.backgroundCanvas = backgroundCanvas;
    this.foregroundCtx = foregroundCtx;
    this.foregroundCanvas = foregroundCanvas;

    // Setting dino player
    this.dino = new Dino({
      position: [30, this.gameCanvas.height - 25], 
      canvas: this.gameCanvas, 
      ctx: this.gameCtx
    });

    // Setting an array of fireballs
    this.fireballs = [];

    // Setting game state
    this.gameOver = false;
    this.paused = false;

    // Binding class methods
    this.draw = this.draw.bind(this);
    this.keyDownListener = this.keyDownListener.bind(this);
    this.keyUpListener = this.keyUpListener.bind(this);

    // Setting keypresses
    this.setKeypresses();

    // Creating background and foreground
    this.createBackground(this.backgroundCtx, this.backgroundCanvas, this.foregroundCtx, this.foregroundCanvas);
  }

  // Adding moving objects to respective arrays
  addMovingObject(object) {
    if (object instanceof Fireball) {
      this.fireballs.push(object);
    } else {
      throw new Error('Unknown type of object');
    }
  };

  // Removing moving objects from respective arrays
  removeMovingObject(object) {
    if (object instanceof Fireball) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else {
      throw new Error('Unknown type of object');
    }
  }

  // Checking to see if the position is out of bounds
  isOutOfBounds(pos) {
    return pos[0] < 0 || pos[0] > this.gameCanvas.width;
  };

  // Creating an array of all moving objects
  allObjects() {
    return [].concat(this.fireballs);
  };

  // Setting keypresses
  setKeypresses() {
    this.gameCanvas.addEventListener('keydown', this.keyDownListener);
    this.gameCanvas.addEventListener('keyup', this.keyUpListener);
  }

  // Handler for key down
  keyDownListener(e) {  
    e.preventDefault(); 

    // Array of valid key codes
    const validKeys = ['Space', 'ArrowUp', 'ArrowDown', 'Space'];

    // Prevents continuous actions when key is held down
    if (e.repeat && e.code != 'ArrowDown') {
      this.dino.toggleDirection('idle');
      return;
    }

    if (!this.gameOver) {   
      if (validKeys.includes(e.code)) this.dino.toggleDirection(`${e.code}`);
    }
  }

  // Handler for key up
  keyUpListener(e) {
    e.preventDefault();
    this.dino.toggleDirection('idle');
  }

  // Creating the background and foreground
  createBackground(backgroundCtx, backgroundCanvas, foregroundCtx, foregroundCanvas) {
    // Background
    const backgroundImage = new Image();
    backgroundImage.src = '../dist/assets/images/background.png';
    backgroundImage.alt = 'Background';
    this.background = new Background(backgroundCtx, backgroundCanvas, backgroundImage, 1);

    // Foreground
    const foregroundImage = new Image();
    foregroundImage.src = '../dist/assets/images/foreground.png';
    this.foreground = new Background(foregroundCtx, foregroundCanvas, foregroundImage, 10);
  }

  // Drawing the game
  draw() {   
    if (!this.gameOver) {
      requestAnimationFrame(this.draw);
      this.dino.update(this.gameCtx);

      // Drawing background
      this.background.draw();
      this.foreground.draw();
    }
  }

  // temp start function for game
  start() {
    this.draw();
  }

}

module.exports = Game;