const Game = require('./game');

class GameStartMenu {
  // Constructor for GameStartMenu class
  constructor(options) {
    this.gameCanvasCtx = options.gameCanvasCtx;
    this.gameCanvas = options.gameCanvas;
    this.backgroundCanvasCtx = options.backgroundCanvasCtx;
    this.backgroundCanvas = options.backgroundCanvas;
    this.foregroundCanvasCtx = options.foregroundCanvasCtx;
    this.foregroundCanvas = options.foregroundCanvas;
    this.startGame = this.startGame.bind(this);
  }

  // Handles user clicks on replay button
  clickHandler() {
    const colors = document.getElementsByClassName('color-button-wrapper');

    for (let i = 0; i < colors.length; i++) {
      colors[i].addEventListener('click', e => this.startGame(e));
    }
  }

  // Starts a game
  startGame(e) {
    const menu = document.getElementById('game-start-menu');
    menu.classList.remove('active');

    const dinoColor = e.target.value;

    const game = new Game(
      this.gameCanvasCtx,
      this.gameCanvas,
      this.backgroundCanvasCtx,
      this.backgroundCanvas,
      this.foregroundCanvasCtx,
      this.foregroundCanvas,
      dinoColor
    );

    game.start();
  }

  // Drawing the game over menu
  draw() {
    const menu = document.getElementById('game-start-menu');
    menu.classList.add('active');
    this.clickHandler();
  }
}

module.exports = GameStartMenu;