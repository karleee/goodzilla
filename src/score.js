class Score {
  // Constructor for a new Score
  constructor(amnt) {
    this.score = 0;
    this.amnt = amnt;
    this.timeInterval = 0;
  }

  // Adds the specified amnt to the score
  addScore() {
    if (this.timeInterval === 20) {
      this.score += this.amnt;
      this.timeInterval = 0;
    } else {
      this.timeInterval += 1;
    }
  }

  // Drawing the Score
  draw(ctx) {
    const text = `SCORE: ${this.score}`;
    ctx.font = '55px miniPixel';
    ctx.strokeStyle = 'white';

    // setup these to match your needs
    ctx.miterLimit = 2;
    ctx.lineJoin = 'miter';

    // draw an outline, then filled
    ctx.lineWidth = 15;
    ctx.strokeText(text, 40, 60);
    // ctx.lineWidth = 1;
    ctx.fillText(text, 40, 60);
    ctx.fillStyle = '#F2055C';

    this.addScore();
  }
}

module.exports = Score;
