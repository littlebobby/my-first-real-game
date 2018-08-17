const hole_left = {
  arr: [],
  health: 3,
  drawHolePermit: false,
  player: 'p1',
  checkIfHoleDie: function() {
    if(this.health === 0) {
      this.arr = [];
      this.drawHolePermit = false;
      setTimeout(() => {
        this.drawHolePermit = true
      }, 10000);
    }
  }
}
const hole_right = {
  arr: [],
  health: 3,
  drawHolePermit: false,
  player: 'p2',
  checkIfHoleDie: function() {
    if(this.health === 0) {
      this.arr = [];
      this.drawHolePermit = false;
      setTimeout(() => {
        this.drawHolePermit = true
      }, 10000);
    }
  }
}
const img_black_hole = new Image();
img_black_hole.src = './image/black-hole-1.svg';
const img_black_hole_1 = new Image();
img_black_hole_1.src = './image/black-hole-1.svg'
const img_black_hole_2 = new Image();
img_black_hole_2.src = './image/black-hole-2.svg'
const img_black_hole_3 = new Image();
img_black_hole_3.src = './image/black-hole-3.svg'

class BlackHole extends Component {
  constructor(x=0, y=250, width=25, height=25,speedX = 0, speedY=0) {
    super(x, y, width, height, speedX, speedY);
  }
  // ! need to update
  canDrawHole(holeObj, ctx, newHole) {
    if (holeObj.drawHolePermit) {
      this.beforeDrawHole(holeObj, ctx, newHole)
    }
  }

  beforeDrawHole(holeObj, ctx, newHole) {
    if (holeObj.player === 'p1' && holeObj.arr.length < 2) {
      this.generateRandomLocation_left(ctx)
      holeObj.arr.push(newHole)
      holeObj.health = 3
    } else if (holeObj.player === 'p2' && holeObj.arr.length < 2) {
      this.generateRandomLocation_right(ctx)
      holeObj.health = 3
      holeObj.arr.push(newHole)
    }
  }
  
  generateRandomLocation_left(ctx) {
    const randomY = Math.floor(Math.random()*(24)) * 25
    const columnArr = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
    const randomX = columnArr[Math.floor(Math.random()*columnArr.length)] * 25
    this.drawBlackHole(randomX, randomY, ctx)
  }
  generateRandomLocation_right(ctx) {
    const randomY = Math.floor(Math.random()*(24)) * 25;
    const columnArr = [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
    const randomX = columnArr[Math.floor(Math.random()*columnArr.length)] * 25
    this.drawBlackHole(randomX, randomY, ctx)
  }
  drawBlackHole(randomX,randomY, ctx) {
    ctx.clearRect(randomX, randomY, 25, 25)
    this.x = randomX;
    this.y = randomY;
    ctx.drawImage(img_black_hole, this.x, this.y, this.width, this.height);
    // console.log(hole_arr_left)
  }

  redrawBlackHole(ctx, holeObj) {
    ctx.clearRect(this.x, this.y, 25, 25)

    switch(holeObj.health) {
      case 3: img_black_hole.src = img_black_hole_1.src; break;
      case 2: img_black_hole.src = img_black_hole_2.src; break;
      case 1: img_black_hole.src = img_black_hole_3.src; break;
    }
    ctx.drawImage(img_black_hole, this.x, this.y, this.width, this.height);
  }
  
  isPlayerEntered(player) {
    return (this.x === player.x && this.y === player.y)
  }

}