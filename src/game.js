const Dino = require('./dino');
const Fireball = require('./fireball');
const Background = require('./background');
const MiniDevil = require('./mini_devil');
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
      ctx: this.gameCtx,
      game: this
    });

    // Setting empty arrays for game objects
    this.fireballs = [];
    this.enemies = [];

    // Setting max enemies (move this into parameter list for easy, medium, hard levels later)
    this.maxEnemies = 5;

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

  // Adding objects to respective arrays
  addObject(object) {
    if (object instanceof Fireball) {
      this.fireballs.push(object);
    } else if (object instanceof MiniDevil) {
      if (this.enemies.length < this.maxEnemies) this.enemies.push(object);
    } else {
      throw new Error('Unknown type of object');
    }
  };

  // Removing objects from respective arrays
  removeObject(object) {
    if (object instanceof Fireball) {
      this.fireballs.splice(this.fireballs.indexOf(object), 1);
    } else if (object instanceof MiniDevil) {
      this.enemies.splice(this.enemies.indexOf(object), 1);
    } else {
      throw new Error('Unknown type of object');
    }
  }

  // Checking to see if the position is out of bounds
  isOutOfBounds(pos, type) {
    let result;

    if (type === 'fireball') {
      result = pos[0] > this.gameCanvas.width;
    } else {
      result = pos[0] < 0;
    }

    return result;
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

    if (!this.gameOver) {   
      // Prevents continuous actions when key is held down
      if (e.repeat) {
        if (e.code !== 'ArrowDown') {
          this.dino.toggleDirection('idle');
        } else {
          return;
        }
      } else if (validKeys.includes(e.code)) {
        this.dino.toggleDirection(`${e.code}`);
      } 
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

  // Creating enemies
  createEnemies() {
    let enemy;
    enemy = new MiniDevil({ position: [this.gameCanvas.width + (Math.random() * 10), this.gameCanvas.height - 25], speed: 3 });
    this.addObject(enemy);
    return enemy;
    // setInterval(this.generateEnemy, 4000);
  }

  // Storing all moving game objects in an array
  allObjects() {
    return [].concat(this.fireballs, this.enemies);
  }

  // Drawing the game
  draw() {     
    console.log(this.enemies);

    if (!this.gameOver) {
      requestAnimationFrame(this.draw);
      this.dino.update(this.gameCtx);

      // Creating enemies
      this.createEnemies();

      // Drawing background
      this.background.draw();
      this.foreground.draw();

      // Drawing fireballs and cleaning up out of bounds fireballs
      const allObjects = this.allObjects();
      allObjects.forEach(object => {
        object.update(this.gameCtx);

        if (this.isOutOfBounds(object.position, 'fireball')) this.removeObject(object);

        // if (this.isOutOfBounds(object.position, 'enemy')) this.removeObject(object);
      });
    }
  }

  // temp start function for game
  start() {
    this.draw();
  }
}

module.exports = Game;