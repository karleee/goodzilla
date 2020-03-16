const Dino = require('./dino');
const Fireball = require('./fireball');
const Background = require('./background');
const Enemy = require('./robot');
const GameOverMenu = require('./game_over');
const Score = require('./score');
const Util = require('./util');

const MAX_ENEMIES = 3;

class Game {
  // Constructor for game
  constructor(gameCtx, gameCanvas, backgroundCtx, backgroundCanvas, dinoColor) {
    // Setting context and canvas
    this.gameCtx = gameCtx;
    this.gameCanvas = gameCanvas;
    this.backgroundCtx = backgroundCtx;
    this.backgroundCanvas = backgroundCanvas;
    this.dinoColor = dinoColor;

    // Setting game canvas width and height
    this.gameCtx.canvas.width = window.innerWidth;
    this.gameCtx.canvas.height = window.innerHeight;

    // Setting up game objects
    this.dino = [];
    this.fireballs = [];
    this.enemies = [];
    this.score = new Score(1);
    this.playerLives = 3;
    this.gameOverMenu = new GameOverMenu();

    // Setting game assets
    this.addDino(this.dinoColor);
    this.addBackground(this.backgroundCtx, this.backgroundCanvas, this.foregroundCtx, this.foregroundCanvas);

    // Setting game state
    this.gameOver = false;
    this.paused = false;

    // Binding class methods
    this.draw = this.draw.bind(this);
    this.keyDownListener = this.keyDownListener.bind(this);
    this.keyUpListener = this.keyUpListener.bind(this);
    this.replay = this.replay.bind(this);
    this.goToMainMenu = this.goToMainMenu.bind(this);

    // Setting keypresses
    this.setKeypresses();
  }

  // Adding dino player to the game
  addDino(dinoColor) {
    const dino = new Dino({
      position: [80, this.gameCanvas.height - 200],
      canvas: this.gameCanvas,
      ctx: this.gameCtx,
      game: this,
      dinoColor
    });

    this.add(dino);

    return dino;
  }

  // Adding enemies to the game
  addEnemy(prevPos) {
    this.add(new Enemy({ 
      prevPos,
      speed: 8, 
      game: this, 
      ctx: this.gameCtx 
    }));
  }

  // Adding objects to respective arrays
  add(object) {
    if (object instanceof Dino) {
      this.dino.push(object);
    } else if (object instanceof Fireball) {
      this.fireballs.push(object);
    } else if (object instanceof Enemy) {
      this.enemies.push(object);
    } else {
      throw new Error('Unknown type of object');
    }
  };

  // Removing objects from respective arrays
  remove(object) {
    if (object instanceof Fireball) {
      this.fireballs.splice(this.fireballs.indexOf(object), 1);
    } else if (object instanceof Enemy) {
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
    } else if (type === 'enemy') {
      result = pos[0] < -70;
    }

    return result;
  };

  // Gets a random position
  randomPosition(prevPos) {
    return [
      this.gameCanvas.width + (prevPos[0] + Util.randomNum(50, 150)) + Util.randomNum(50, 150),
      this.gameCanvas.height - Util.randomNum(180, 210)
    ];
  };

  // Setting keypresses
  setKeypresses() {
    this.gameCanvas.addEventListener('keydown', this.keyDownListener);
    this.gameCanvas.addEventListener('keyup', this.keyUpListener);
    this.gameCanvas.addEventListener('keydown', this.replay);
    this.gameCanvas.addEventListener('keydown', this.goToMainMenu);
  }

  // Goes to main menu
  goToMainMenu(e) {
    if ((e.key === 'q' || e.key === 'Q') && this.gameOver) {
      // Force screen refresh to initiate new game
      location.reload();
      this.gameOverMenu.remove();
      const mainMenu = document.getElementById('game-start-menu');
      mainMenu.classList.add('active');
    }
  }

  // Handler for key down
  keyDownListener(e) {  
    const dino = this.dino[0];
    e.preventDefault(); 

    // Array of valid key codes
    const validKeys = ['Space', 'ArrowUp', 'ArrowDown', 'Space'];

    if (!this.gameOver) {   
      // Prevents continuous actions when key is held down
      if (e.repeat) {
        if (e.code !== 'ArrowDown') {
          dino.toggleDirection('idle');
        } else {
          return;
        }
      } else if (validKeys.includes(e.code)) {
        dino.toggleDirection(`${e.code}`);
      } 
    }
  }

  // Handler for key up
  keyUpListener(e) {
    const dino = this.dino[0];
    e.preventDefault();
    dino.toggleDirection('idle');
  }

  // Creating the background and foreground
  addBackground(backgroundCtx, backgroundCanvas) {
    // Background
    const backgroundImage = new Image();
    backgroundImage.src = '../dist/assets/images/game/background.png';
    backgroundImage.alt = 'Background';
    this.background = new Background(backgroundCtx, backgroundCanvas, backgroundImage, 20);
  }

  // Storing all moving game objects in an array
  allObjects() {
    return [].concat(this.dino, this.fireballs, this.enemies);
  }

  // Updates objects
  updateObjects(ctx) {
    this.allObjects().forEach(object => object.update(ctx));
  }

  // Checking for collisions between fireballs and enemies
  checkCollisions() {
    const fireballs = this.fireballs;
    const enemies = this.enemies;
      
    for (let i = 0; i < fireballs.length; i++) {
      for (let j = 0; j < enemies.length; j++) {
        const obj1 = fireballs[i];
        const obj2 = enemies[j];

        if (!obj1.isCollided && obj1.collidedWith(obj2)) return;
      }
    }
  };

  // Checking player collsions
  checkPlayerCollisions() {
    const dino = this.dino;
    const enemies = this.enemies;

    for (let i = 0; i < enemies.length; i++) {
      const obj1 = dino[0];
      const obj2 = enemies[i];

      if (obj1.collidedWith(obj2)) {
        this.gameOver = true;
        return;
      }
    }
  }

  // Drawing the game
  draw() {  
    this.gameCtx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);

    // Drawing background
    this.background.draw();

    // Drawing the score
    this.score.draw(this.gameCtx);

    // Adding enemies to game
    let prevPos;
    if (this.enemies.length === 1) {
      const prevEnemy = this.enemies[this.enemies.length - 1];
      prevPos = [prevEnemy.position[0], prevEnemy.position[1]];
    } else {
      prevPos = [0, 0];
    }

    if (this.enemies.length < MAX_ENEMIES) this.addEnemy(prevPos);
  }

  // Replays a new game
  replay(e) {
    if ((e.key === 'r' || e.key === 'R') && this.gameOver) {
      const dino = this.dino[0];

      this.gameOverMenu.remove();
      document.getElementById('game-canvas').focus();

      // Resetting game variables
      this.score.score = 0;
      this.gameOver = false;
      dino.frames = 0;
      dino.isHit = false;
      this.fireballs = [];
      this.enemies = [];
      this.playerLives = 3;

      this.start();
    }
  }

  // Starts a game
  start() {            
    this.gameCanvas.focus();

    if (!this.gameOver) {
      this.draw();
      this.updateObjects(this.gameCtx);
      this.checkCollisions();
      this.checkPlayerCollisions();
      requestAnimationFrame(this.start.bind(this));
    } else {
      this.gameOverMenu.draw();
    }
  }
}

module.exports = Game;