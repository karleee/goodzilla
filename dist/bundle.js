/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/background.js":
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

class Background {
  // Constructor for background
  constructor(ctx, canvas, image, y, width, speed) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.image = image;
    this.x = 0;
    this.y = y;
    this.width = width;
    this.speed = speed;
  }

  // Drawing the background
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.image, this.x, this.y);
    // this.ctx.drawImage(this.image, this.x + this.width, this.y);

    // if (this.width < this.canvas.width) {
    //   this.ctx.drawImage(this.image, this.x + this.width * 2, this.y);
    // }

    // if (this.x <= -this.width) {
    //   this.x = 0;
    // }

    // this.scrollImage();
  }

  // Scrolls an image
  scrollImage() {
    this.x -= this.speed;
  }
}

module.exports = Background;

/***/ }),

/***/ "./src/dino.js":
/*!*********************!*\
  !*** ./src/dino.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

// Constant for player movement changes
const MOVEMENT_SPEED = 1;

// Creating array of sprite positions for walking
const width = 24;
const height = 24;
let walk = [];
let jump = [];

for (let i = 4; i < 10; i++) {
  walk.push([width * i, 0, width, height]);
}

jump = [[width * 11, 0, width, height]];

const SPRITES = {
  walk,
  jump
};

class Dino {
  constructor(options) {
    // Setting player positioning and action
    this.position = options.position;
    this.falling = false;
    this.frames = 0;
    this.direction = 'idle';

    // Setting canvas element
    this.canvas = options.canvas;

    // Setting new HTML img element
    // eventually add different dino color selection here...
    this.dino = new Image();
    this.dino.src = '../dist/assets/spritesheets/red_dino.png';

    // Setting game over state
    this.gameOver = false;

    // Setting jump counter and boolean
    this.jumps = 0;
    this.isJumping = false;
  }

  // Toggles direction boolean
  toggleDirection(direction, heldDown) {
    this.direction = direction;

    if (this.direction === 'Space') {
      this.isJumping = true;
    }
  }

  // Gets the correct sprite
  getSprite() {
    if (!this.gameOver) {
      if (this.direction === 'idle') {
        return this.getIdleSprite(SPRITES.walk);
      } else if (this.direction === 'Space') {
        return this.getJumpSprite(SPRITES.jump);
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

  // Gets jumping sprite
  getJumpSprite(sprites) {   
    return sprites[0];
  }

  // Jumping action
  jump() {
    const gravity = 0.4;
    let jumpStrength = 7;

    if (this.isJumping) {
      if (this.jumps === 0 || !this.onGround()) {
        this.position[1] -= jumpStrength - gravity * this.jumps;
        this.jumps += 1;
      } else {
        this.position[1] = 110;
        this.jumps = 0;
        this.isJumping = false;
      }
    }
  }

  // Checks if dino is on the ground
  onGround() {
    return this.position[0] === 30 && this.position[1] >= 110;
  }

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

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Dino = __webpack_require__(/*! ./dino */ "./src/dino.js");
const Background = __webpack_require__(/*! ./background */ "./src/background.js");
const Util = __webpack_require__(/*! ./util */ "./src/util.js");

class Game {
  // Constructor for game
  constructor(gameCtx, gameCanvas, backgroundCtx, backgroundCanvas, foregroundCtx) {
    // Setting context and canvas
    this.gameCtx = gameCtx;
    this.gameCanvas = gameCanvas;
    this.backgroundCtx = backgroundCtx;
    this.backgroundCanvas = backgroundCanvas;
    this.foregroundCtx = foregroundCtx;

    // Setting dino player
    this.dino = new Dino({position: [30, this.gameCanvas.height - 40], canvas: this.gameCanvas});

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
    this.createBackground(this.backgroundCtx, this.backgroundCanvas, this.foregroundCtx);
  }

  // Setting keypresses
  setKeypresses() {
    this.gameCanvas.addEventListener('keydown', this.keyDownListener);
    this.gameCanvas.addEventListener('keyup', this.keyUpListener);
  }

  // Handler for key down
  keyDownListener(e) {  
    e.preventDefault(); 
    if (!this.gameOver) {     
      if (e.code === 'Space') this.dino.toggleDirection(`${e.code}`);
    }
  }

  // Handler for key up
  keyUpListener(e) {
    e.preventDefault();
    this.dino.toggleDirection('idle');
  }

  // Creating the background and foreground
  createBackground(backgroundCtx, backgroundCanvas, foregroundCtx) {
    const backgroundImage = new Image();
    backgroundImage.src = '../dist/assets/images/background.png';
    backgroundImage.alt = 'Background';
    this.background = new Background(backgroundCtx, backgroundCanvas, backgroundImage, 0, 1068, 0.8);

    // const foregroundImage = new Image();
    // foregroundImage.src = './assets/images/foreground-grass.png';
    // this.foreground = new Background(foregroundCtx, foregroundImage, 250, 720, 6);
  }

  // Drawing the game
  draw() {    
    if (!this.gameOver && !this.paused) {
      requestAnimationFrame(this.draw);
      this.dino.update(this.gameCtx);
    }
  }

  // temp start function for game
  start() {
    this.draw();
  }

}

module.exports = Game;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(/*! ./game */ "./src/game.js");
const Dino = __webpack_require__(/*! ./dino */ "./src/dino.js");

document.addEventListener('DOMContentLoaded', function () {
  // Getting main game canvas
  const gameCanvas = document.getElementById('game-canvas');
  const gameCanvasCtx = gameCanvas.getContext('2d');

  // Parallax scrolling effect
  // Getting background canvas
  const backgroundCanvas = document.getElementById('background-canvas');
  const backgroundCanvasCtx = backgroundCanvas.getContext('2d');

  // Getting foreground canvas
  const foregroundCanvas = document.getElementById('foreground-canvas');
  const foregroundCanvasCtx = foregroundCanvas.getContext('2d');

  const game = new Game(
    gameCanvasCtx,
    gameCanvas,
    backgroundCanvasCtx,
    backgroundCanvas,
    foregroundCanvasCtx
  );

  game.start();
});

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

const Util = {
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  createCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  },
  readCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      const c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
};

module.exports = Util;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map