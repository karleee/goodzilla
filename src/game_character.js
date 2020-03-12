const Game = require('./game');

class GameCharacterMenu {
  // Constructor for GameCharacterMenu class
  constructor(options) {
    this.gameCanvasCtx = options.gameCanvasCtx;
    this.gameCanvas = options.gameCanvas;
    this.backgroundCanvasCtx = options.backgroundCanvasCtx;
    this.backgroundCanvas = options.backgroundCanvas;
    this.foregroundCanvasCtx = options.foregroundCanvasCtx;
    this.foregroundCanvas = options.foregroundCanvas;
    this.startGame = this.startGame.bind(this);
    this.backToMainMenu = this.backToMainMenu.bind(this);
  }

  // Handles user clicks on character buttons
  clickHandler() {    
    const colors = document.getElementsByClassName('color-button-wrapper');
    const mainMenuButton = document.getElementById('character-main-menu-button-wrapper');

    mainMenuButton.addEventListener('click', this.backToMainMenu);

    for (let i = 0; i < colors.length; i++) {
      colors[i].addEventListener('click', e => this.startGame(e));
    }
  }

  // Starts a game
  startGame(e) {
    const menu = document.getElementById('game-character-menu');
    menu.classList.remove('active');

    const dinoColor = e.target.parentNode.value;

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

  // Goes back to main menu
  backToMainMenu() {
    const menu = document.getElementById('game-character-menu');
    menu.classList.remove('active');

    const startMenu = document.getElementById('game-start-menu');
    startMenu.classList.add('active');
  }

  // Drawing the game character menu
  draw() {
    const menu = document.getElementById('game-character-menu');
    menu.classList.add('active');
    this.clickHandler();
  }
}

module.exports = GameCharacterMenu;