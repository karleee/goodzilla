class GameOverMenu {
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