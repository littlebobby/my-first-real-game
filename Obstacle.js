class Obstacle {
  constructor(ctx) {
    this.ctx = ctx;
  }
  createObstacle() {
    for(let i = 4; i < 28; i ++) {
      for (let j = 4; j < 16; j ++) {
        this.createRect(i*25, j*25);
      }
    }
  }

  createRect(x, y) {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(x, y, 25, 25);
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(x+3, y+3, 19, 19);
  }

}