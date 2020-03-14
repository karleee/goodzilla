const GameStartMenu = require('./game_start');

document.addEventListener('DOMContentLoaded', function () {
  // Getting main game canvas
  const gameCanvas = document.getElementById('game-canvas');
  const gameCanvasCtx = gameCanvas.getContext('2d');

  // Getting background canvas
  const backgroundCanvas = document.getElementById('background-canvas');
  const backgroundCanvasCtx = backgroundCanvas.getContext('2d', { alpha: false });

  // Getting foreground canvas
  const foregroundCanvas = document.getElementById('foreground-canvas');
  const foregroundCanvasCtx = foregroundCanvas.getContext('2d');

  //testing.....
  //get DPI
  // let dpi = window.devicePixelRatio;
  // function fix_dpi() {
  //   //get CSS height
  //   //the + prefix casts it to an integer
  //   //the slice method gets rid of "px"
  //   let style_height = +getComputedStyle(gameCanvas).getPropertyValue("height").slice(0, -2);
  //   //get CSS width
  //   let style_width = +getComputedStyle(gameCanvas).getPropertyValue("width").slice(0, -2);
  //   //scale the canvas
  //   gameCanvas.setAttribute('height', style_height * dpi);
  //   gameCanvas.setAttribute('width', style_width * dpi);
  // }

  // fix_dpi();

  // Setting options hash
  const options = ({
    gameCanvasCtx,
    gameCanvas,
    backgroundCanvasCtx,
    backgroundCanvas,
    foregroundCanvasCtx,
    foregroundCanvas
  });

  const startMenu = new GameStartMenu(options);

  startMenu.draw();
});