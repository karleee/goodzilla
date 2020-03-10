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

/***/ "./src/dino.js":
/*!*********************!*\
  !*** ./src/dino.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Hash with sprite dimensions and positions\n// sx, sy, sWidth, and sHeight (relate to source image)\n// dx, dy, dWidth, dHeight (relate to the canvas)\n\n// Creating array of sprite positions for walking\nconst width = 24;\nconst height = 24;\n// const firstSprite = [0, 0, width, height];\nlet walk = [];\n\nfor (let i = 4; i < 10; i++) {\n  walk.push([width * i, 0, width, height]);\n}\n\nconst SPRITES = {\n  walk\n};\n\nclass Dino {\n  constructor(options) {\n    // Setting player positioning and action\n    this.position = options.position;\n    this.walkspeed = options.walkspeed ? options.walkspeed : 1;\n    this.falling = false;\n    this.jumping = false;\n    this.jumpCount = 0;\n    this.frames = 0;\n\n    // Setting canvas element\n    this.canvas = options.canvas;\n\n    // Setting new HTML img element\n    // eventually add different dino color selection here...\n    this.dino = new Image();\n    this.dino.src = './assets/spritesheets/red_dino.png';\n\n    // Setting game over state\n    this.gameOver = false;\n  }\n\n  // Checks if player is on the ground\n  onGround() {\n    // temp set height to 0 for ground for testing (use this.canvas.height - # later on...)\n    return this.position[0] === 30 && this.position[1] >= 30;\n  }\n\n  // Toggles jump boolean\n  toggleJump() {\n    this.jumping = true;\n  }\n\n  // Gets the correct sprites\n  getSprite() {\n    // console.log(SPRITES.walk);\n    const walkCycle = SPRITES.walk;\n\n    if (this.onGround() && !this.gameOver) {\n      if (this.frames < 10) {\n        this.frames += 1;\n        return walkCycle[0];\n      } else if (this.frames < 20) {\n        this.frames += 1;\n        return walkCycle[1];\n      } else if (this.frames < 30) {\n        this.frames += 1;\n        return walkCycle[2];\n      } else if (this.frames < 40) {\n        this.frames += 1;\n        return walkCycle[3];\n      } else if (this.frames < 50) {\n        this.frames += 1;\n        return walkCycle[4];\n      } else if (this.frames < 60) {\n        this.frames += 1;\n        return walkCycle[5];\n      } else {\n        this.frames = 0;\n        return walkCycle[5];\n      }\n    }\n  }\n\n  // Draws the dino sprite\n  draw(ctx) {\n    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n    \n    const sprite = this.getSprite();\n\n    console.log('Sprite: ' + sprite);\n    console.log('Frames: ' + this.frames);\n\n    ctx.drawImage(\n      this.dino,\n      sprite[0],\n      sprite[1],\n      sprite[2],\n      sprite[3],\n      this.position[0],\n      this.position[1],\n      sprite[2],\n      sprite[3]\n    );\n  }\n\n  update(ctx) {\n    this.draw(ctx);\n  }\n}\n\nmodule.exports = Dino;\n\n//# sourceURL=webpack:///./src/dino.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Dino = __webpack_require__(/*! ./dino */ \"./src/dino.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nclass Game {\n  constructor(ctx, canvas) {\n    // Setting context and canvas\n    this.ctx = ctx;\n    this.canvas = canvas;\n\n    // Setting dino player\n    this.dino = new Dino({  \n      position: [30, 30],\n      canvas\n    });\n\n    // Setting and binding draw method for Game\n    this.draw = this.draw.bind(this);\n\n    // Setting game state\n    this.gameOver = false;\n    this.paused = false;\n  }\n\n  draw() {\n    if (!this.gameOver && !this.paused) {\n      requestAnimationFrame(this.draw);\n      this.dino.update(this.ctx);\n    }\n  }\n\n  // temp start function for game\n  start() {\n    this.draw();\n  }\n\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst Dino = __webpack_require__(/*! ./dino */ \"./src/dino.js\");\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  const canvas = document.getElementById('game-canvas');\n  const ctx = canvas.getContext('2d');\n\n  // const backgroundCanvas = document.getElementById('background-canvas');\n\n  // const foregroundCanvas = document.getElementById('foreground-canvas');\n  // const foregroundCanvasContext = foregroundCanvas.getContext('2d');\n\n  const game = new Game(\n    ctx,\n    canvas\n  );\n\n  game.start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n  getRandomIntInclusive(min, max) {\n    min = Math.ceil(min);\n    max = Math.floor(max);\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n  },\n  numberWithCommas(x) {\n    return x.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, \",\");\n  },\n  createCookie(name, value, days) {\n    let expires = \"\";\n    if (days) {\n      const date = new Date();\n      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));\n      expires = \"; expires=\" + date.toUTCString();\n    }\n    document.cookie = name + \"=\" + value + expires + \"; path=/\";\n  },\n  readCookie(name) {\n    const nameEQ = name + \"=\";\n    const ca = document.cookie.split(';');\n    for (let i = 0; i < ca.length; i++) {\n      const c = ca[i];\n      while (c.charAt(0) === ' ') c = c.substring(1, c.length);\n      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);\n    }\n    return null;\n  }\n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });