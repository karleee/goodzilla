const GameCharacterMenu = require('./game_character');
const GameInstructionsMenu = require('./game_instructions');

class GameStartMenu {
  // Constructor for GameStartMenu class
  constructor(options) {
    this.options = options;
    this.startChoice = this.startChoice.bind(this);
  }

  // Handles user clicks on choices button
  clickHandler() {
    const choices = document.getElementsByClassName('choice-button-wrapper');

    for (let i = 0; i < choices.length; i++) {
      choices[i].addEventListener('click', e => this.startChoice(e));
    }
  }

  // Takes user to the choice's screen
  startChoice(e) {
    const menu = document.getElementById('game-start-menu');
    menu.classList.remove('active');
    
    if (e.target.value === 'play') {
      const characterMenu = new GameCharacterMenu(this.options);
      characterMenu.draw();
    } else if (e.target.value === 'instructions') {
      const instructionsMenu = new GameInstructionsMenu(this.options);
      instructionsMenu.draw();
    }
  }

  // Drawing the game start menu
  draw() {
    const menu = document.getElementById('game-start-menu');
    menu.classList.add('active');
    this.clickHandler();
  }
}

module.exports = GameStartMenu;