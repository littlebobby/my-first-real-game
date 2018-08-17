const img_bullet = new Image()
img_bullet.src = './image/bullet.svg'


class SupplyBox extends Component{
  constructor(x=0, y=250, width=25, height=25,speedX = 0, speedY=0) {
    super(x, y, width, height, speedX, speedY);
  }
  generateRandomLocation_left(ctx) {
    const randomY = Math.floor(Math.random()*(23)) * 25 + 25
    const columnArr = [0, 1, 2, 3]
    const randomX = columnArr[Math.floor(Math.random()*columnArr.length)] * 25
    this.drawSupplyBox(randomX, randomY, ctx)
  }
  generateRandomLocation_right(ctx) {
    const randomY = Math.floor(Math.random()*(23)) * 25 + 25;
    const columnArr = [36, 37, 38, 39]
    const randomX = columnArr[Math.floor(Math.random()*columnArr.length)] * 25
    this.drawSupplyBox(randomX, randomY, ctx)
  }

  drawSupplyBox(randomX, randomY, ctx) {
    ctx.clearRect(randomX, randomY, 25, 25)
    this.x = randomX;
    this.y = randomY;
    ctx.drawImage(img_bullet, this.x, this.y, this.width, this.height);
    
  }

  redrawSupplyBox() {
    ctx.clearRect(this.x, this.y, 25, 25)
    ctx.drawImage(img_bullet, this.x, this.y, this.width, this.height);

  }
}