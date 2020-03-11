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

eval("class Background {\n  // Constructor for background\n  constructor(ctx, canvas, image, speed) {    \n    this.ctx = ctx;\n    this.canvas = canvas;\n    this.image = image;\n    this.speed = speed;\n    this.posX = 0;\n  }\n\n  // Drawing the background\n  draw() {\n    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n\n    // Preventing browser(s) from smoothing out/blurring lines\n    this.ctx.mozImageSmoothingEnabled = false;\n    this.ctx.webkitImageSmoothingEnabled = false;\n    this.ctx.msImageSmoothingEnabled = false;\n    this.ctx.imageSmoothingEnabled = false;\n\n    this.ctx.drawImage(this.image, this.posX, 0, this.image.width, this.image.height, 0, 0, this.canvas.width, this.canvas.height);\n    this.ctx.drawImage(this.image, this.posX - this.image.width, 0, this.image.width, this.image.height, 0, 0, this.canvas.width, this.canvas.height);\n    \n    if (this.image.width > this.canvas.width) {\n      this.ctx.drawImage(this.image, this.x - this.image.width * 2, 0);\n    }\n\n    if (this.posX >= this.image.width) {\n      this.posX = 0;\n    }\n\n    this.scrollImage();\n  }\n\n  // Scrolls an image\n  scrollImage() {\n    this.posX += this.speed;\n  }\n}\n\nmodule.exports = Background;\n\n//# sourceURL=webpack:///./src/background.js?");

/***/ }),

/***/ "./src/dino.js":
/*!*********************!*\
  !*** ./src/dino.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Fireball = __webpack_require__(/*! ./fireball */ \"./src/fireball.js\");\n\n// Constants\nconst FIREBALL_VEL = 5;\n\n// Creating arrays for sprite walking, jumping, and crouching\nconst width = 24;\nconst height = 24;\nlet walk = [];\nlet jump = [];\nlet crouch = [];\n\nfor (let i = 4; i < 10; i++) {\n  walk.push([width * i, 0, width, height]);\n}\n\njump = [[width * 11, 0, width, height]];\n\nfor (let i = 18; i < 24; i++) {\n  crouch.push([width * i, 0, width, height]);\n}\n\nconst SPRITES = {\n  walk,\n  jump,\n  crouch\n};\n\nclass Dino {\n  // Constructor for dino\n  constructor(options) {\n    // Setting player positioning and action\n    this.position = options.position;\n    this.canvas = options.canvas;\n    this.ctx = options.ctx;\n    this.game = options.game;\n    this.falling = false;\n    this.frames = 0;\n    this.direction = 'idle';\n    this.gameOver = false;\n\n    // Setting new HTML img element\n    // eventually add different dino color selection here...\n    this.dino = new Image();\n\n    // Preventing browser(s) from smoothing out/blurring lines\n    this.ctx.mozImageSmoothingEnabled = false;\n    this.ctx.webkitImageSmoothingEnabled = false;\n    this.ctx.msImageSmoothingEnabled = false;\n    this.ctx.imageSmoothingEnabled = false;\n\n    this.dino.src = '../dist/assets/spritesheets/red_dino.png';\n\n    // Setting jump counter and boolean\n    this.jumps = 0;\n    this.isJumping = false;\n  }\n\n  // Toggles direction boolean\n  toggleDirection(direction) {\n    this.direction = direction;\n\n    if (this.direction === 'ArrowUp') {\n      this.isJumping = true;\n    } else if (this.direction === 'Space') {\n      this.shootFireball();\n    }\n  }\n\n  // Gets the correct sprite\n  getSprite() {       \n    if (!this.gameOver) {\n      if (!this.onGround() || this.direction === 'ArrowUp') {\n        return SPRITES.jump[0];\n      } else if (this.direction === 'idle') {\n        return this.getIdleSprite(SPRITES.walk);\n      } else if (this.direction === 'ArrowDown' || this.direction === 'Space') {\n        return this.getCrouchSprite(SPRITES.crouch);\n      }\n    }\n  }\n\n  // Gets idle sprite\n  getIdleSprite(sprites) {\n    if (this.frames < 10) {\n      this.frames += 1;\n      return sprites[0];\n    } else if (this.frames < 15) {\n      this.frames += 1;\n      return sprites[1];\n    } else if (this.frames < 25) {\n      this.frames += 1;\n      return sprites[2];\n    } else if (this.frames < 30) {\n      this.frames += 1;\n      return sprites[3];\n    } else if (this.frames < 35) {\n      this.frames += 1;\n      return sprites[4];\n    } else if (this.frames < 40) {\n      this.frames += 1;\n      return sprites[5];\n    } else {\n      this.frames = 0;\n      return sprites[5];\n    }\n  }\n\n  // Jumping action\n  jump() {\n    const gravity = 0.4;\n    let jumpStrength = 7;\n\n    if (this.isJumping) {\n      if (this.jumps === 0 || !this.onGround()) {\n        this.position[1] -= jumpStrength - gravity * this.jumps;\n        this.jumps += 1;\n      } else {\n        this.position[1] = this.canvas.height - 25;\n        this.jumps = 0;\n        this.isJumping = false;\n      }\n    }\n  }\n\n  // Gets crouch sprite\n  getCrouchSprite(sprites) {  \n    if (this.frames < 10) {\n      this.frames += 1;\n      return sprites[0];\n    } else if (this.frames < 15) {\n      this.frames += 1;\n      return sprites[1];\n    } else if (this.frames < 25) {\n      this.frames += 1;\n      return sprites[2];\n    } else if (this.frames < 30) {\n      this.frames += 1;\n      return sprites[3];\n    } else if (this.frames < 35) {\n      this.frames += 1;\n      return sprites[4];\n    } else if (this.frames < 40) {\n      this.frames += 1;\n      return sprites[5];\n    } else {\n      this.frames = 0;\n      return sprites[5];\n    }\n  }\n\n  // Checks if dino is on the ground\n  onGround() {\n    return this.position[0] === 30 && this.position[1] >= this.canvas.height - 25;\n  }\n\n  // Adds a fireball to the array to be shot by the player\n  shootFireball() {\n    const startPos = [this.position[0] + 25, this.position[1] + 10];\n\n    const fireball = new Fireball({\n      position: startPos,\n      speed: FIREBALL_VEL\n    });\n\n    this.game.addObject(fireball);\n\n    return fireball;\n  };\n\n  // Draws the dino sprite\n  draw(ctx) {\n    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n    \n    const sprite = this.getSprite();\n\n    ctx.drawImage(\n      this.dino,\n      sprite[0],\n      sprite[1],\n      sprite[2],\n      sprite[3],\n      this.position[0],\n      this.position[1],\n      sprite[2],\n      sprite[3]\n    );\n  }\n\n  update(ctx) {\n    this.jump();\n    this.draw(ctx);\n  }\n}\n\nmodule.exports = Dino;\n\n//# sourceURL=webpack:///./src/dino.js?");

/***/ }),

/***/ "./src/fireball.js":
/*!*************************!*\
  !*** ./src/fireball.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nclass Fireball {\n  constructor(options) {\n    this.position = options.position;\n    this.speed = options.speed;\n    this.radius = 3;\n    this.color = 'yellow';\n    this.isWrappable = false;\n  }\n\n  // Moving a fireball\n  move() {\n    this.position[0] += this.speed;\n  }\n\n  // Hitbox for a fireball\n  hitbox() {\n    return {\n      minX: this.position[0] + 5,\n      minY: this.position[1] + 5\n    };\n  }\n\n  // Drawing a fireball\n  draw(ctx) {\n    ctx.fillStyle = this.color;\n\n    ctx.beginPath();\n    ctx.arc(\n      this.position[0], this.position[1], this.radius, 0, 2 * Math.PI, true\n    );\n    ctx.fill();\n  }\n\n  // Draws and updates fireball movement\n  update(ctx) {\n    this.draw(ctx);\n    this.move();\n  }\n}\n\nmodule.exports = Fireball;\n\n//# sourceURL=webpack:///./src/fireball.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Dino = __webpack_require__(/*! ./dino */ \"./src/dino.js\");\nconst Fireball = __webpack_require__(/*! ./fireball */ \"./src/fireball.js\");\nconst Background = __webpack_require__(/*! ./background */ \"./src/background.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nclass Game {\n  // Constructor for game\n  constructor(gameCtx, gameCanvas, backgroundCtx, backgroundCanvas, foregroundCtx, foregroundCanvas) {\n    // Setting context and canvas\n    this.gameCtx = gameCtx;\n    this.gameCanvas = gameCanvas;\n    this.backgroundCtx = backgroundCtx;\n    this.backgroundCanvas = backgroundCanvas;\n    this.foregroundCtx = foregroundCtx;\n    this.foregroundCanvas = foregroundCanvas;\n\n    // Setting dino player\n    this.dino = new Dino({\n      position: [30, this.gameCanvas.height - 25], \n      canvas: this.gameCanvas, \n      ctx: this.gameCtx,\n      game: this\n    });\n\n    // Setting an array of fireballs\n    this.fireballs = [];\n\n    // Setting game state\n    this.gameOver = false;\n    this.paused = false;\n\n    // Binding class methods\n    this.draw = this.draw.bind(this);\n    this.keyDownListener = this.keyDownListener.bind(this);\n    this.keyUpListener = this.keyUpListener.bind(this);\n\n    // Setting keypresses\n    this.setKeypresses();\n\n    // Creating background and foreground\n    this.createBackground(this.backgroundCtx, this.backgroundCanvas, this.foregroundCtx, this.foregroundCanvas);\n  }\n\n  // Adding objects to respective arrays\n  addObject(object) {\n    if (object instanceof Fireball) {\n      this.fireballs.push(object);\n    } else {\n      throw new Error('Unknown type of object');\n    }\n  };\n\n  // Removing objects from respective arrays\n  removeObject(object) {\n    if (object instanceof Fireball) {\n      this.fireballs.splice(this.fireballs.indexOf(object), 1);\n    } else {\n      throw new Error('Unknown type of object');\n    }\n  }\n\n  // Checking to see if the position is out of bounds\n  isOutOfBounds(pos) {\n    return pos[0] > this.gameCanvas.width;\n  };\n\n  // Setting keypresses\n  setKeypresses() {\n    this.gameCanvas.addEventListener('keydown', this.keyDownListener);\n    this.gameCanvas.addEventListener('keyup', this.keyUpListener);\n  }\n\n  // Handler for key down\n  keyDownListener(e) {  \n    e.preventDefault(); \n\n    // Array of valid key codes\n    const validKeys = ['Space', 'ArrowUp', 'ArrowDown', 'Space'];\n\n    if (!this.gameOver) {   \n      // Prevents continuous actions when key is held down\n      if (e.repeat) {\n        if (e.code !== 'ArrowDown') {\n          this.dino.toggleDirection('idle');\n        } else {\n          return;\n        }\n      } else if (validKeys.includes(e.code)) {\n        this.dino.toggleDirection(`${e.code}`);\n      } \n    }\n  }\n\n  // Handler for key up\n  keyUpListener(e) {\n    e.preventDefault();\n    this.dino.toggleDirection('idle');\n  }\n\n  // Creating the background and foreground\n  createBackground(backgroundCtx, backgroundCanvas, foregroundCtx, foregroundCanvas) {\n    // Background\n    const backgroundImage = new Image();\n    backgroundImage.src = '../dist/assets/images/background.png';\n    backgroundImage.alt = 'Background';\n    this.background = new Background(backgroundCtx, backgroundCanvas, backgroundImage, 1);\n\n    // Foreground\n    const foregroundImage = new Image();\n    foregroundImage.src = '../dist/assets/images/foreground.png';\n    this.foreground = new Background(foregroundCtx, foregroundCanvas, foregroundImage, 10);\n  }\n\n  // Drawing the game\n  draw() {   \n    if (!this.gameOver) {\n      requestAnimationFrame(this.draw);\n      this.dino.update(this.gameCtx);\n\n      // Drawing background\n      this.background.draw();\n      this.foreground.draw();\n\n      // Drawing fireballs and cleaning up out of bounds fireballs\n      this.fireballs.forEach((fireball, idx) => {\n        fireball.update(this.gameCtx);\n\n        if (this.isOutOfBounds(fireball.position)) this.removeObject(fireball);\n      });\n    }\n  }\n\n  // temp start function for game\n  start() {\n    this.draw();\n  }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst Dino = __webpack_require__(/*! ./dino */ \"./src/dino.js\");\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  // Getting main game canvas\n  const gameCanvas = document.getElementById('game-canvas');\n  const gameCanvasCtx = gameCanvas.getContext('2d');\n\n  // Parallax scrolling effect\n  // Getting background canvas\n  const backgroundCanvas = document.getElementById('background-canvas');\n  const backgroundCanvasCtx = backgroundCanvas.getContext('2d');\n\n  // Getting foreground canvas\n  const foregroundCanvas = document.getElementById('foreground-canvas');\n  const foregroundCanvasCtx = foregroundCanvas.getContext('2d');\n\n  const game = new Game(\n    gameCanvasCtx,\n    gameCanvas,\n    backgroundCanvasCtx,\n    backgroundCanvas,\n    foregroundCanvasCtx,\n    foregroundCanvas\n  );\n\n  game.start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n  // Find distance between two points.\n  dist(pos1, pos2) {\n    return Math.sqrt(\n      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)\n    );\n  },\n  inherits(ChildClass, BaseClass) {\n    ChildClass.prototype = Object.create(BaseClass.prototype);\n    ChildClass.prototype.constructor = ChildClass;\n  }\n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });