const GameStartMenu = require('./game_start');

class GameInstructionsMenu {
  // Constructor for GameInstructionsMenu class
  constructor(options) {
    this.options = options;
    this.backToMainMenu = this.backToMainMenu.bind(this);
  }

  // Handles user clicks on back to main menu button
  clickHandler() {
    const mainMenuButton = document.getElementById('instructions-main-menu-button-wrapper');
    mainMenuButton.addEventListener('click', this.backToMainMenu);
  }

  // Goes back to main menu
  backToMainMenu() {
    location.reload(true);
  }

  // Drawing the game instructions menu
  draw() {
    const menu = document.getElementById('game-instructions-menu');
    menu.classList.add('active');
    this.clickHandler();
  }
}

module.exports = GameInstructionsMenu;