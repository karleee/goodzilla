const GameStartMenu = require('./game_start');

document.addEventListener('DOMContentLoaded', function () {
  // Getting main game canvas
  const gameCanvas = document.getElementById('game-canvas');
  const gameCanvasCtx = gameCanvas.getContext('2d');

  // Getting background canvas
  const backgroundCanvas = document.getElementById('background-canvas');
  const backgroundCanvasCtx = backgroundCanvas.getContext('2d');

  // Setting options hash
  const options = ({
    gameCanvasCtx,
    gameCanvas,
    backgroundCanvasCtx,
    backgroundCanvas
  });

  const startMenu = new GameStartMenu(options);

  startMenu.draw();
});