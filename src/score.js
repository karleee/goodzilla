class Score {
  // Constructor for a new Score
  constructor(amnt) {
    this.score = 0;
    this.amnt = amnt;
    this.timeInterval = 0;
  }

  // Adds the specified amnt to the score
  addScore() {
    if (this.timeInterval === 10) {
      this.score += this.amnt;
      this.timeInterval = 0;
    } else {
      this.timeInterval += 1;
    }
  }

  // Drawing the Score
  draw(ctx) {
    const text = `Score: ${this.score}`;
    ctx.font = '10px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(text, 20, 20);
    this.addScore();
  }
}

module.exports = Score;
