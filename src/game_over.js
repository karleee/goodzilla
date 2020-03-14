class GameOverMenu {
  // constructor() {
  //   this.mainMenuHandler();
  // }

  // mainMenuHandler() {
  //   const menuButton = document.getElementById('game-over-main-menu-button');
  //   menuButton.addEventListener('click', () => {
  //     this.remove();
  //     const menu = document.getElementById('game-start-menu');
  //     menu.classList.add('active');
  //   });
  // }

  remove() {
    const menu = document.getElementById('game-over-menu');
    menu.classList.remove('active');
  }

  draw() {
    const menu = document.getElementById('game-over-menu');
    menu.classList.add('active');
  }
}

module.exports = GameOverMenu;