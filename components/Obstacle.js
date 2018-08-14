class Obstacle {
  constructor(ctx) {
    this.ctx = ctx;
    this.obs_arr = [];
  }
  createObstacle() {
    for(let i = 4; i < 15; i ++) {
      for (let j = 0; j < 20; j ++) {
        this.createRect(i*25, j*25);
      }
    }
    for(let i = 17; i < 28; i ++) {
      for (let j = 0; j < 20; j ++) {
        this.createRect(i*25, j*25);
      }
    }
  }
  createRiver() {
    for(let i = 15; i < 17; i ++) {
      for (let j = 0; j < 20; j ++) {
        this.ctx.fillStyle = '#32d8f770';
        this.ctx.fillRect(i*25, j*25, 25, 25);
      }
    }
  }

  createRect(x, y) {
    this.obs_arr.push({x: x, y: y, height: 25, width: 25})
    this.ctx.fillStyle = '#eee';
    this.ctx.fillRect(x, y, 25, 25);
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(x+3, y+3, 19, 19);
  }

  updateObstacle() {
    this.obs_arr.forEach(i => {
      this.ctx.fillStyle = '#eee';
      this.ctx.fillRect(i.x, i.y, 25, 25);
      this.ctx.fillStyle = 'green';
      this.ctx.fillRect(i.x+3, i.y+3, 19, 19);
    })

    this.createRiver()
  }

  generateRandomObstacle() {
    const randomRow = Math.floor(Math.random()*(20+1)) 
    const columnArr = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
    const randomColumn = columnArr[Math.floor(Math.random()*columnArr.length)]
    this.ctx.clearRect(randomColumn*25, randomRow*25, 25, 25)
    this.createRect(randomColumn*25, randomRow*25);
  }

}