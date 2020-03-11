// const Util = require("./util");
// // const MovingObject = require("./moving_object");

// function Fireball(options) {
//   options.radius = Fireball.RADIUS;
// }

// Fireball.RADIUS = 2;
// Fireball.SPEED = 15;

// Util.inherits(Fireball, MovingObject);

// Fireball.prototype.isWrappable = false;

// module.exports = Fireball;

const Util = require('./util');

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

function Fireball(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = '#000000';
  this.game = options.game;
}

Fireball.prototype.isWrappable = false;

Fireball.prototype.draw = function draw(ctx) {
  ctx.fillStyle = this.color;

  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
  );
  ctx.fill();
};

Fireball.prototype.isCollidedWith = function isCollidedWith(otherObject) {
  const centerDist = Util.dist(this.pos, otherObject.pos);
  return centerDist < (this.radius + otherObject.radius);
};


Fireball.prototype.move = function move(timeDelta) {
  // timeDelta is number of milliseconds since last move
  // if the computer is busy the time delta will be larger
  // in this case the Fireball should move farther in this frame
  // velocity of object is how far it should move in 1/60th of a second
  const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
    offsetX = this.vel[0] * velocityScale,
    offsetY = this.vel[1] * velocityScale;

  this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

  if (this.game.isOutOfBounds(this.pos)) {
    if (this.isWrappable) {
      this.pos = this.game.wrap(this.pos);
    } else {
      this.remove();
    }
  }
};

Fireball.prototype.remove = function remove() {
  this.game.remove(this);
};

module.exports = Fireball;