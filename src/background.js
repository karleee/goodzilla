class Background {
  // Constructor for background
  constructor(ctx, canvas, image, speed) {    
    this.ctx = ctx;
    this.canvas = canvas;
    this.image = image;
    this.speed = speed;
    this.posX = 0;
  }

  // Drawing the background
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Preventing browser(s) from smoothing out/blurring lines
    this.ctx.mozImageSmoothingEnabled = false;
    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.msImageSmoothingEnabled = false;
    this.ctx.imageSmoothingEnabled = false;

    this.ctx.drawImage(this.image, this.posX, 0, this.image.width, this.image.height, 0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.image, this.posX - this.image.width, 0, this.image.width, this.image.height, 0, 0, this.canvas.width, this.canvas.height);
    
    if (this.image.width > this.canvas.width) {
      this.ctx.drawImage(this.image, this.x - this.image.width * 2, 0);
    }

    if (this.posX >= this.image.width) {
      this.posX = 0;
    }

    this.scrollImage();
  }

  // Scrolls an image
  scrollImage() {
    this.posX += this.speed;
  }
}

module.exports = Background;