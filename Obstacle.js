class Obstacle {
  constructor(ctx) {
    this.ctx = ctx;
    this.obs_arr = [];
  }
  createObstacle() {
    for(let i = 4; i < 28; i ++) {
      for (let j = 4; j < 16; j ++) {
        this.createRect(i*25, j*25);
      }
    }
  }

  createRect(x, y) {
    this.obs_arr.push({x: x, y: y, height: 25, width: 25})

    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(x, y, 25, 25);
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(x+3, y+3, 19, 19);
  }
  // top() { return this.y }
  // bottom() { return this.y + this.height }
  // left() {return this.x }
  // right() {return this.x + this.width }

  updateObstacle() {
    // this.ctx.clearRect(100, 100, 600, 300)
    // console.log(this.obs_arr)
    this.obs_arr.forEach(i => {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(i.x, i.y, 25, 25);
      this.ctx.fillStyle = 'green';
      this.ctx.fillRect(i.x+3, i.y+3, 19, 19);
    })
  }

}