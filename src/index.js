const Game = require('./game');
const Dino = require('./dino');

document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');

  // const backgroundCanvas = document.getElementById('background-canvas');

  // const foregroundCanvas = document.getElementById('foreground-canvas');
  // const foregroundCanvasContext = foregroundCanvas.getContext('2d');

  const game = new Game(
    ctx,
    canvas
  );

  game.start();
});