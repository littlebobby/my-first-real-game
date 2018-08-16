const hole_arr_left = [];
const hole_arr_right = [];

const img_black_hole = new Image();
img_black_hole.src = './image/black_hole.svg'

class BlackHole extends Component {
  constructor(x=0, y=250, width=25, height=25,speedX = 0, speedY=0) {
    super(x, y, width, height, speedX, speedY);
    
  }

  // control two sides
  // drawPair(ctx) {
  //   if (hole_arr_left.length < 2) {
  //     this.generateRandomLocation_left(ctx)
  //   } else if (hole_arr_right.length < 2) {
  //     this.generateRandomLocation_right(ctx)
  //   } else {
  //     return
  //   }
  //   console.log('left side black hole', hole_arr_left)
  //   console.log('RIGHT side black hole', hole_arr_right)
  // }

  // left
  generateRandomLocation_left(ctx) {
    const randomY = Math.floor(Math.random()*(24)) * 25
    const columnArr = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
    const randomX = columnArr[Math.floor(Math.random()*columnArr.length)] * 25
    this.drawBlackHole(randomX, randomY, ctx)
  }
  // right
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


  redrawBlackHole(ctx) {
    ctx.clearRect(this.x, this.y, 25, 25)
    ctx.drawImage(img_black_hole, this.x, this.y, this.width, this.height);
  }
  
  isPlayerEntered(player) {
    return (this.x === player.x && this.y === player.y)
  }

}