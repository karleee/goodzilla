const Game = require('./game');
const Dino = require('./dino');

document.addEventListener('DOMContentLoaded', function () {
  // Getting main game canvas
  const gameCanvas = document.getElementById('game-canvas');
  const gameCanvasCtx = gameCanvas.getContext('2d');

  // Parallax scrolling effect
  // Getting background canvas
  const backgroundCanvas = document.getElementById('background-canvas');
  const backgroundCanvasCtx = backgroundCanvas.getContext('2d');

  // Getting foreground canvas
  const foregroundCanvas = document.getElementById('foreground-canvas');
  const foregroundCanvasCtx = foregroundCanvas.getContext('2d');

  const game = new Game(
    gameCanvasCtx,
    gameCanvas,
    backgroundCanvasCtx,
    backgroundCanvas,
    foregroundCanvasCtx,
    foregroundCanvas
  );

  game.start();
});