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

eval("const Fireball = __webpack_require__(/*! ./fireball */ \"./src/fireball.js\");\nconst Enemy = __webpack_require__(/*! ./enemy */ \"./src/enemy.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\n// Constants\nconst FIREBALL_VEL = 5;\nconst WIDTH = 24;\nconst HEIGHT = 24;\n\n// Creating arrays for sprite walking, jumping, and crouching\nlet walk = [];\nlet jump = [];\nlet crouch = [];\nlet hit = [];\n\nfor (let i = 4; i < 10; i++) {\n  walk.push([WIDTH * i, 0, WIDTH, HEIGHT]);\n}\n\njump = [[WIDTH * 11, 0, WIDTH, HEIGHT]];\n\nfor (let i = 18; i < 24; i++) {\n  crouch.push([WIDTH * i, 0, WIDTH, HEIGHT]);\n}\n\n// Populating hit array\nfor (let i = 14; i < 17; i++) {\n  hit.push([WIDTH * i, 0, WIDTH, HEIGHT]);\n}\n\nhit.push([WIDTH * 7, 0, WIDTH, HEIGHT]);\nhit.push([WIDTH * 8, 0, WIDTH, HEIGHT]);\nhit.push([WIDTH * 9, 0, WIDTH, HEIGHT]);\n\nconst SPRITES = {\n  walk,\n  jump,\n  crouch,\n  hit\n};\n\nclass Dino {\n  // Constructor for dino\n  constructor(options) {\n    // Setting player positioning and action\n    this.position = options.position;\n    this.canvas = options.canvas;\n    this.ctx = options.ctx;\n    this.game = options.game;\n    this.dinoColor = options.dinoColor;\n    this.frames = 0;\n    this.direction = 'idle';\n\n    // debugger;\n\n    // Setting game state boolean\n    this.gameOver = false;\n\n    // Setting new HTML img element\n    // eventually add different dino color selection here...\n    this.dino = new Image();\n\n    // Preventing browser(s) from smoothing out/blurring lines\n    this.ctx.mozImageSmoothingEnabled = false;\n    this.ctx.webkitImageSmoothingEnabled = false;\n    this.ctx.msImageSmoothingEnabled = false;\n    this.ctx.imageSmoothingEnabled = false;\n\n    this.dino.src = `../dist/assets/spritesheets/${this.dinoColor}_dino.png`;\n    this.dino.alt = `${this.dinoColor} dino`;\n\n    // debugger;\n\n    // Setting jump counter and boolean\n    this.jumps = 0;\n    this.isJumping = false;\n  }\n\n  // Toggles direction boolean\n  toggleDirection(direction) {\n    this.direction = direction;\n\n    if (this.direction === 'ArrowUp') {\n      this.isJumping = true;\n    } else if (this.direction === 'Space') {\n      this.shootFireball();\n    }\n  }\n\n  // Gets the correct sprite\n  getSprite() {       \n    // if (!this.gameOver) {\n      if (this.gameOver) {\n        return this.getHitSprite(SPRITES.hit);\n      } else if (!this.onGround() || this.direction === 'ArrowUp') {\n        return SPRITES.jump[0];\n      } else if (this.direction === 'idle') {\n        return this.getIdleSprite(SPRITES.walk);\n      } else if (this.direction === 'ArrowDown' || this.direction === 'Space') {\n        return this.getCrouchSprite(SPRITES.crouch);\n      }\n    // }\n  }\n\n  getHitSprite(sprites) {\n    if (this.frames < 10) {\n      this.frames += 1;\n      return sprites[0];\n    } else if (this.frames < 15) {\n      this.frames += 1;\n      return sprites[1];\n    } else if (this.frames < 20) {\n      this.frames += 1;\n      return sprites[2];\n    } else if (this.frames < 25) {\n      this.frames += 1;\n      return sprites[3];\n    } else if (this.frames < 30) {\n      this.frames += 1;\n      return sprites[4];\n    } else if (this.frames < 35) {\n      this.frames += 1;\n      return sprites[5];\n    } else if (this.frames < 40) {\n      this.frames = 0;\n      return sprites[5];\n    }\n  }\n\n  // Gets idle sprite\n  getIdleSprite(sprites) {\n    if (this.frames < 10) {\n      this.frames += 1;\n      return sprites[0];\n    } else if (this.frames < 15) {\n      this.frames += 1;\n      return sprites[1];\n    } else if (this.frames < 20) {\n      this.frames += 1;\n      return sprites[2];\n    } else if (this.frames < 25) {\n      this.frames += 1;\n      return sprites[3];\n    } else if (this.frames < 30) {\n      this.frames += 1;\n      return sprites[4];\n    } else if (this.frames < 35) {\n      this.frames += 1;\n      return sprites[5];\n    } else {\n      this.frames = 0;\n      return sprites[5];\n    }\n  }\n\n  // Jumping action\n  jump() {\n    const gravity = 0.6;\n    let jumpStrength = 9;\n\n    if (this.isJumping) {\n      if (this.jumps === 0 || !this.onGround()) {\n        this.position[1] -= jumpStrength - gravity * this.jumps;\n        this.jumps += 1;\n      } else {\n        this.position[1] = this.canvas.height - 25;\n        this.jumps = 0;\n        this.isJumping = false;\n      }\n    }\n  }\n\n  // Gets crouch sprite\n  getCrouchSprite(sprites) {  \n    if (this.frames < 10) {\n      this.frames += 1;\n      return sprites[0];\n    } else if (this.frames < 15) {\n      this.frames += 1;\n      return sprites[1];\n    } else if (this.frames < 20) {\n      this.frames += 1;\n      return sprites[2];\n    } else if (this.frames < 25) {\n      this.frames += 1;\n      return sprites[3];\n    } else if (this.frames < 30) {\n      this.frames += 1;\n      return sprites[4];\n    } else if (this.frames < 35) {\n      this.frames += 1;\n      return sprites[5];\n    } else {\n      this.frames = 0;\n      return sprites[5];\n    }\n  }\n\n  // Checks if dino is on the ground\n  onGround() {\n    return this.position[0] === 30 && this.position[1] >= this.canvas.height - 25;\n  }\n\n  // Adds a fireball to the array to be shot by the player\n  shootFireball() {\n    const startPos = [this.position[0] + 25, this.position[1] + 10];\n\n    const fireball = new Fireball({\n      position: startPos,\n      speed: FIREBALL_VEL,\n      game: this.game\n    });\n\n    this.game.add(fireball);\n\n    return fireball;\n  };\n\n  // Checks if the dino collieded with an enemy\n  collidedWith(otherObject) {\n    const posX = this.hitbox().minX;\n    const posY = this.hitbox().minY;\n\n    const collided = (posX < otherObject.hitbox().minX + otherObject.hitbox().width &&\n      posX + this.hitbox().width > otherObject.hitbox().minX &&\n      posY < otherObject.hitbox().minY + otherObject.hitbox().height &&\n      posY + this.hitbox().height > otherObject.hitbox().minY);\n\n    if (collided) {\n      this.gameOver = true;\n      return true;\n    }\n\n    return false;\n  };\n\n  // Hitbox for dino\n  hitbox() {\n    return {\n      minX: this.position[0] + 6,\n      minY: this.position[1] + 5,\n      width: WIDTH - 9,\n      height: HEIGHT - 8\n    };\n  }\n\n  // Draws the dino sprite\n  draw(ctx) {    \n    const sprite = this.getSprite();\n\n    ctx.drawImage(\n      this.dino,\n      sprite[0],\n      sprite[1],\n      sprite[2],\n      sprite[3],\n      this.position[0],\n      this.position[1],\n      sprite[2],\n      sprite[3]\n    );\n  }\n\n  update(ctx) {\n    this.jump();\n    this.draw(ctx);\n  }\n}\n\nmodule.exports = Dino;\n\n//# sourceURL=webpack:///./src/dino.js?");

/***/ }),

/***/ "./src/enemy.js":
/*!**********************!*\
  !*** ./src/enemy.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst Fireball = __webpack_require__(/*! ./fireball */ \"./src/fireball.js\");\n\nconst WIDTH = 5;\nconst HEIGHT = 5;\n\nclass Enemy {\n  constructor(options) {\n    this.position = options.position || options.game.randomPosition();\n    this.speed = options.speed || Util.randomNum(1, 3);\n    this.game = options.game;\n    this.radius = 3;\n    this.color = 'green';\n    this.isWrappable = true;\n  }\n\n  // Moving an enemy\n  move() {\n    this.position[0] -= this.speed;\n    if (this.game.isOutOfBounds(this.position, 'enemy')) this.remove();\n   }\n\n  // Hitbox for a mini devil\n  hitbox() {\n    return {\n      minX: this.position[0],\n      minY: this.position[1],\n      width: WIDTH,\n      height: HEIGHT\n    };\n  }\n\n  // Checks if an enemy collieded with a fireball\n  collidedWith(otherObject) {\n    const posX = this.hitbox().minX;\n    const posY = this.hitbox().minY;\n\n    const collided = (posX < otherObject.hitbox().minX + otherObject.hitbox().width &&\n      posX + this.hitbox().width > otherObject.hitbox().minX &&\n      posY < otherObject.hitbox().minY + otherObject.hitbox().height &&\n      posY + this.hitbox().height > otherObject.hitbox().minY);\n\n    if (collided) {\n      this.remove();\n      otherObject.remove();\n      return true;\n    }\n\n    return false;\n  }\n\n  // Removing an enemy\n  remove() {\n    this.game.remove(this);\n  };\n\n  // Drawing a mini devil\n  draw(ctx) {\n    ctx.beginPath();\n    ctx.strokeStyle = this.color;\n    ctx.fillStyle = this.color;\n    ctx.fillRect(this.hitbox().minX, this.hitbox().minY, this.hitbox().width, this.hitbox().height);\n    ctx.stroke();\n  }\n\n  // Draws and updates enemy movement\n  update(ctx) {\n    this.move();\n    this.draw(ctx);\n  }\n}\n\nmodule.exports = Enemy;\n\n//# sourceURL=webpack:///./src/enemy.js?");

/***/ }),

/***/ "./src/fireball.js":
/*!*************************!*\
  !*** ./src/fireball.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nconst WIDTH = 10;\nconst HEIGHT = 10;\n\nclass Fireball {\n  constructor(options) {\n    this.position = options.position;\n    this.speed = options.speed;\n    this.game = options.game;\n    this.radius = 3;\n    this.color = 'yellow';\n    this.isWrappable = false;\n  }\n\n  // Moving a fireball\n  move() {\n    this.position[0] += this.speed;\n    if (this.game.isOutOfBounds(this.position, 'fireball')) this.remove();\n  }\n\n  // Hitbox for a fireball\n  hitbox() {\n    return {\n      minX: this.position[0],\n      minY: this.position[1],\n      width: WIDTH,\n      height: HEIGHT\n    };\n  }\n\n  // Removing a fireball\n  remove() {\n    this.game.remove(this);\n    // this.game.fireballs.pop();\n  };\n\n  collidedWith(otherObject) {\n    const collided = (this.position[0] < otherObject.position[0] + otherObject.hitbox().width &&\n      this.position[0] + this.hitbox().width > otherObject.position[0] &&\n      this.position[1] < otherObject.position[1] + otherObject.hitbox().height &&\n      this.position[1] + this.hitbox().height > otherObject.position[1]);\n\n    if (collided) {\n      this.remove();\n      otherObject.remove();\n      return true;\n    }\n\n    return false;\n  };\n\n  // Drawing a fireball\n  draw(ctx) {\n    ctx.fillStyle = this.color;\n\n    ctx.beginPath();\n    ctx.arc(\n      this.position[0], this.position[1], this.radius, 0, 2 * Math.PI, true\n    );\n    ctx.fill();\n  }\n\n  // Draws and updates fireball movement\n  update(ctx) {\n    this.move();\n    this.draw(ctx);\n  }\n}\n\nmodule.exports = Fireball;\n\n//# sourceURL=webpack:///./src/fireball.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Dino = __webpack_require__(/*! ./dino */ \"./src/dino.js\");\nconst Fireball = __webpack_require__(/*! ./fireball */ \"./src/fireball.js\");\nconst Background = __webpack_require__(/*! ./background */ \"./src/background.js\");\nconst Enemy = __webpack_require__(/*! ./enemy */ \"./src/enemy.js\");\nconst GameOverMenu = __webpack_require__(/*! ./game_over */ \"./src/game_over.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nconst MAX_ENEMIES = 10;\n\nclass Game {\n  // Constructor for game\n  constructor(gameCtx, gameCanvas, backgroundCtx, backgroundCanvas, foregroundCtx, foregroundCanvas, dinoColor) {\n    // Setting context and canvas\n    this.gameCtx = gameCtx;\n    this.gameCanvas = gameCanvas;\n    this.backgroundCtx = backgroundCtx;\n    this.backgroundCanvas = backgroundCanvas;\n    this.foregroundCtx = foregroundCtx;\n    this.foregroundCanvas = foregroundCanvas;\n    this.dinoColor = dinoColor;\n\n    // Setting up game objects\n    this.dino = [];\n    this.fireballs = [];\n    this.enemies = [];\n\n    // Setting game assets\n    this.addDino(this.dinoColor);\n    this.addBackground(this.backgroundCtx, this.backgroundCanvas, this.foregroundCtx, this.foregroundCanvas);\n\n    // Setting game state\n    this.gameOver = false;\n    this.paused = false;\n    this.timeInterval = 0;\n\n    // Binding class methods\n    this.draw = this.draw.bind(this);\n    this.keyDownListener = this.keyDownListener.bind(this);\n    this.keyUpListener = this.keyUpListener.bind(this);\n\n    // Setting keypresses\n    this.setKeypresses();\n  }\n\n  // Adding dino player to the game\n  addDino(dinoColor) {\n    const dino = new Dino({\n      position: [30, this.gameCanvas.height - 25],\n      canvas: this.gameCanvas,\n      ctx: this.gameCtx,\n      game: this,\n      dinoColor\n    });\n\n    this.add(dino);\n\n    return dino;\n  }\n\n  // Adding enemies to the game\n  // change time interval === for difficulty level\n  addEnemies() {\n    this.timeInterval += 1;\n\n    if (this.timeInterval === 20 && this.enemies.length < MAX_ENEMIES) {\n      this.add(new Enemy({ game: this }));\n      this.timeInterval = 0;\n    } \n  }\n\n  // Adding objects to respective arrays\n  add(object) {\n    if (object instanceof Dino) {\n      this.dino.push(object);\n    } else if (object instanceof Fireball) {\n      this.fireballs.push(object);\n    } else if (object instanceof Enemy) {\n      this.enemies.push(object);\n    } else {\n      throw new Error('Unknown type of object');\n    }\n  };\n\n  // Removing objects from respective arrays\n  remove(object) {\n    if (object instanceof Fireball) {\n      this.fireballs.splice(this.fireballs.indexOf(object), 1);\n    } else if (object instanceof Enemy) {\n      this.enemies.splice(this.enemies.indexOf(object), 1);\n    } else {\n      throw new Error('Unknown type of object');\n    }\n  }\n\n  // Checking to see if the position is out of bounds\n  isOutOfBounds(pos, type) {\n    let result;\n\n    if (type === 'fireball') {\n      result = pos[0] > this.gameCanvas.width;\n    } else if (type === 'enemy') {\n      result = pos[0] < 0;\n    }\n\n    return result;\n  };\n\n  // Gets a random position\n  randomPosition() {\n    return [\n      this.gameCanvas.width + Util.randomNum(50, 150),\n      this.gameCanvas.height - Util.randomNum(10, 20)\n    ];\n  };\n\n  // Setting keypresses\n  setKeypresses() {\n    this.gameCanvas.addEventListener('keydown', this.keyDownListener);\n    this.gameCanvas.addEventListener('keyup', this.keyUpListener);\n  }\n\n  // Handler for key down\n  keyDownListener(e) {  \n    const dino = this.dino[0];\n    e.preventDefault(); \n\n    // Array of valid key codes\n    const validKeys = ['Space', 'ArrowUp', 'ArrowDown', 'Space'];\n\n    if (!this.gameOver) {   \n      // Prevents continuous actions when key is held down\n      if (e.repeat) {\n        if (e.code !== 'ArrowDown') {\n          dino.toggleDirection('idle');\n        } else {\n          return;\n        }\n      } else if (validKeys.includes(e.code)) {\n        dino.toggleDirection(`${e.code}`);\n      } \n    }\n  }\n\n  // Handler for key up\n  keyUpListener(e) {\n    const dino = this.dino[0];\n    e.preventDefault();\n    dino.toggleDirection('idle');\n  }\n\n  // Creating the background and foreground\n  addBackground(backgroundCtx, backgroundCanvas, foregroundCtx, foregroundCanvas) {\n    // Background\n    const backgroundImage = new Image();\n    backgroundImage.src = '../dist/assets/images/background.png';\n    backgroundImage.alt = 'Background';\n    this.background = new Background(backgroundCtx, backgroundCanvas, backgroundImage, 1);\n\n    // Foreground\n    const foregroundImage = new Image();\n    foregroundImage.src = '../dist/assets/images/foreground.png';\n    this.foreground = new Background(foregroundCtx, foregroundCanvas, foregroundImage, 10);\n  }\n\n  // Storing all moving game objects in an array\n  allObjects() {\n    return [].concat(this.dino, this.fireballs, this.enemies);\n  }\n\n  // Updates objects\n  updateObjects(ctx) {\n    this.allObjects().forEach(object => object.update(ctx));\n  }\n\n  // Checking for collisions between fireballs and enemies\n  checkCollisions() {\n    const fireballs = this.fireballs;\n    const enemies = this.enemies;\n      \n    for (let i = 0; i < fireballs.length; i++) {\n      for (let j = 0; j < enemies.length; j++) {\n        const obj1 = fireballs[i];\n        const obj2 = enemies[j];\n\n        if (obj1.collidedWith(obj2)) {  \n          const collision = obj1.collidedWith(obj2);\n          if (collision) return;\n        } \n      }\n    }\n  };\n\n  // Checking player collsions\n  checkPlayerCollisions() {\n    const dino = this.dino;\n    const enemies = this.enemies;\n\n    for (let i = 0; i < enemies.length; i++) {\n      const obj1 = dino[0];\n      const obj2 = enemies[i];\n\n      if (obj1.collidedWith(obj2)) {\n        const collision = obj1.collidedWith(obj2);\n        if (collision) {\n          this.gameOver = true;\n          return;\n        }\n      }\n    }\n  }\n\n  // Drawing the game\n  draw(ctx) {  \n    ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);\n\n    // Drawing background\n    this.background.draw();\n    this.foreground.draw();\n\n    // Adding enemies to game\n    this.addEnemies();\n  }\n\n  // Replays a new game\n  replay() {\n    const dino = this.dino[0];\n\n    document.getElementById('game-canvas').focus();\n\n    // Resetting game variables\n    this.gameOver = false;\n    this.timeInterval = 0;\n    dino.frames = 0;\n    dino.gameOver = false;\n    this.fireballs = [];\n    this.enemies = [];\n\n    this.start();\n  }\n\n  // temp start function for game\n  start() {        \n    this.gameCanvas.focus();\n\n    if (!this.gameOver) {\n      this.draw(this.gameCtx);\n      this.updateObjects(this.gameCtx);\n      this.checkCollisions();\n      this.checkPlayerCollisions();\n      requestAnimationFrame(this.start.bind(this));\n    } else {\n      const gameOver = new GameOverMenu({ game: this });\n      gameOver.draw();\n    }\n  }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_character.js":
/*!*******************************!*\
  !*** ./src/game_character.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\nclass GameCharacterMenu {\n  // Constructor for GameCharacterMenu class\n  constructor(options) {\n    this.gameCanvasCtx = options.gameCanvasCtx;\n    this.gameCanvas = options.gameCanvas;\n    this.backgroundCanvasCtx = options.backgroundCanvasCtx;\n    this.backgroundCanvas = options.backgroundCanvas;\n    this.foregroundCanvasCtx = options.foregroundCanvasCtx;\n    this.foregroundCanvas = options.foregroundCanvas;\n    this.startGame = this.startGame.bind(this);\n    this.backToMainMenu = this.backToMainMenu.bind(this);\n  }\n\n  // Handles user clicks on character buttons\n  clickHandler() {    \n    const colors = document.getElementsByClassName('color-button-wrapper');\n    const mainMenuButton = document.getElementById('character-main-menu-button-wrapper');\n\n    mainMenuButton.addEventListener('click', this.backToMainMenu);\n\n    for (let i = 0; i < colors.length; i++) {\n      colors[i].addEventListener('click', e => this.startGame(e));\n    }\n  }\n\n  // Starts a game\n  startGame(e) {\n    const menu = document.getElementById('game-character-menu');\n    menu.classList.remove('active');\n\n    const dinoColor = e.target.parentNode.value;\n\n    const game = new Game(\n      this.gameCanvasCtx,\n      this.gameCanvas,\n      this.backgroundCanvasCtx,\n      this.backgroundCanvas,\n      this.foregroundCanvasCtx,\n      this.foregroundCanvas,\n      dinoColor\n    );\n    \n    game.start();\n  }\n\n  // Goes back to main menu\n  backToMainMenu() {\n    const menu = document.getElementById('game-character-menu');\n    menu.classList.remove('active');\n\n    const startMenu = document.getElementById('game-start-menu');\n    startMenu.classList.add('active');\n  }\n\n  // Drawing the game character menu\n  draw() {\n    const menu = document.getElementById('game-character-menu');\n    menu.classList.add('active');\n    this.clickHandler();\n  }\n}\n\nmodule.exports = GameCharacterMenu;\n\n//# sourceURL=webpack:///./src/game_character.js?");

/***/ }),

/***/ "./src/game_instructions.js":
/*!**********************************!*\
  !*** ./src/game_instructions.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const GameStartMenu = __webpack_require__(/*! ./game_start */ \"./src/game_start.js\");\n\nclass GameInstructionsMenu {\n  // Constructor for GameInstructionsMenu class\n  constructor(options) {\n    this.options = options;\n    this.backToMainMenu = this.backToMainMenu.bind(this);\n  }\n\n  // Handles user clicks on back to main menu button\n  clickHandler() {\n    const mainMenuButton = document.getElementById('instructions-main-menu-button-wrapper');\n    mainMenuButton.addEventListener('click', this.backToMainMenu);\n  }\n\n  // Goes back to main menu\n  backToMainMenu() {\n    const menu = document.getElementById('game-instructions-menu');\n    menu.classList.remove('active');\n\n    const startMenu = document.getElementById('game-start-menu');\n    startMenu.classList.add('active');\n  }\n\n  // Drawing the game instructions menu\n  draw() {\n    const menu = document.getElementById('game-instructions-menu');\n    menu.classList.add('active');\n    this.clickHandler();\n  }\n}\n\nmodule.exports = GameInstructionsMenu;\n\n//# sourceURL=webpack:///./src/game_instructions.js?");

/***/ }),

/***/ "./src/game_over.js":
/*!**************************!*\
  !*** ./src/game_over.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class GameOverMenu {\n  // Constructor for GameOverMenu class\n  constructor(options) {\n    this.game = options.game;\n    this.setReplay = this.setReplay.bind(this);\n  }\n\n  // Handles user clicks on replay button\n  clickHandler() {\n    const replay = document.getElementById('replay-button');\n    replay.addEventListener('click', this.setReplay);\n  }\n\n  // Prepares for game's replay function\n  setReplay() {\n    const menu = document.getElementById('game-over-menu');\n    menu.classList.remove('active');    \n    this.game.replay();\n  }\n\n  // Drawing the game over menu\n  draw() {\n    const menu = document.getElementById('game-over-menu');\n    menu.classList.add('active');\n    this.clickHandler();\n  }\n}\n\nmodule.exports = GameOverMenu;\n\n//# sourceURL=webpack:///./src/game_over.js?");

/***/ }),

/***/ "./src/game_start.js":
/*!***************************!*\
  !*** ./src/game_start.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const GameCharacterMenu = __webpack_require__(/*! ./game_character */ \"./src/game_character.js\");\nconst GameInstructionsMenu = __webpack_require__(/*! ./game_instructions */ \"./src/game_instructions.js\");\n\nclass GameStartMenu {\n  // Constructor for GameStartMenu class\n  constructor(options) {\n    this.options = options;\n    this.startChoice = this.startChoice.bind(this);\n  }\n\n  // Handles user clicks on choices button\n  clickHandler() {\n    const choices = document.getElementsByClassName('choice-button-wrapper');\n\n    for (let i = 0; i < choices.length; i++) {\n      choices[i].addEventListener('click', e => this.startChoice(e));\n    }\n  }\n\n  // Takes user to the choice's screen\n  startChoice(e) {\n    const menu = document.getElementById('game-start-menu');\n    menu.classList.remove('active');\n    \n    if (e.target.value === 'play') {\n      const characterMenu = new GameCharacterMenu(this.options);\n      characterMenu.draw();\n    } else if (e.target.value === 'instructions') {\n      const instructionsMenu = new GameInstructionsMenu(this.options);\n      instructionsMenu.draw();\n    }\n  }\n\n  // Drawing the game start menu\n  draw() {\n    const menu = document.getElementById('game-start-menu');\n    menu.classList.add('active');\n    this.clickHandler();\n  }\n}\n\nmodule.exports = GameStartMenu;\n\n//# sourceURL=webpack:///./src/game_start.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const GameStartMenu = __webpack_require__(/*! ./game_start */ \"./src/game_start.js\");\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  // Getting main game canvas\n  const gameCanvas = document.getElementById('game-canvas');\n  const gameCanvasCtx = gameCanvas.getContext('2d');\n\n  // Getting background canvas\n  const backgroundCanvas = document.getElementById('background-canvas');\n  const backgroundCanvasCtx = backgroundCanvas.getContext('2d', { alpha: false });\n\n  // Getting foreground canvas\n  const foregroundCanvas = document.getElementById('foreground-canvas');\n  const foregroundCanvasCtx = foregroundCanvas.getContext('2d');\n\n  // Setting options hash\n  const options = ({\n    gameCanvasCtx,\n    gameCanvas,\n    backgroundCanvasCtx,\n    backgroundCanvas,\n    foregroundCanvasCtx,\n    foregroundCanvas\n  });\n\n  const startMenu = new GameStartMenu(options);\n\n  startMenu.draw();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n  // Find distance between two points.\n  dist(pos1, pos2) {\n    return Math.sqrt(\n      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)\n    );\n  },\n  inherits(ChildClass, BaseClass) {\n    ChildClass.prototype = Object.create(BaseClass.prototype);\n    ChildClass.prototype.constructor = ChildClass;\n  },\n  // Gets a random number\n  randomNum(max, min) {\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n  }\n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });