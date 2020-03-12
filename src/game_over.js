class GameOverMenu {
  constructor(options) {
    debugger;
    this.game = options.game;

    // Binding functions to context of this
    this.setReplay = this.setReplay.bind(this);
  }

  // Handles user clicks on replay button
  clickHandler() {
    debugger;
    const replay = document.getElementById('replay-button');
    replay.addEventListener('click', this.setReplay);
  }

  // Prepares for game's replay function
  setReplay() {
    debugger;
    const menu = document.getElementById('game-over-menu');
    menu.classList.remove('active');    
    this.game.replay();
  }

  // Drawing the game over menu
  draw() {
    debugger;
    const menu = document.getElementById('game-over-menu');
    menu.classList.add('active');

    this.clickHandler();
  }
}

module.exports = GameOverMenu;