const img_missle = new Image();
img_missle.src = './image/missle.svg'
// const changeMissleDeg = document.querySelector('#change_missle_deg').getSVGDocument()
// console.log(changeMissleDeg)
console.log(img_missle)
img_missle.style.color = 'blue'

class Missle extends Component{
  constructor(x = 0, y = 0, width, height, speedX = 0, speedY=0, located_x=0, located_y=0) {
    super(x, y, width, height, speedX, speedY);
    this.located_x = located_x;
    this.located_y = located_y;
    this.flyUpward = true;
  }

  drawMissle(ctx) {
    ctx.drawImage(img_missle ,this.x, this.y, this.width, this.height);
    console.log('drawMissle called');
  }
  updateMissle(ctx) {
    this.missleOnFlying()
    this.x += this.speedX;
    this.y += this.speedY;
    // ctx.rotate(20*Math.PI/180)
    // this.drawMissle(ctx)
    ctx.drawImage(img_missle ,this.x, this.y, this.width, this.height);

    // this.missle_fly_upward()
  }

  // top() { return this.y }
  // bottom() { return this.y + this.height }
  // left() {return this.x }
  // right() {return this.x + this.width }

  // shootSth(o) {
  //   return (!(this.top() > o.y + o.height||
  //             this.bottom() < o.y ||
  //             this.left() > o.x + o.width ||
  //             this.right() < o.x))
  // }
  missleOnFlying() {
    if (this.flyUpward && this.y > -20) {
      this.missle_fly_upward() 
    } else {
      this.flyUpward = false;
      this.missle_fly_downward()
    }
  }
  missle_fly_upward() {
    this.speedY -= 1;
    console.log(this.speedY)
  }
  missle_fly_downward() {
    this.speedX = (this.located_x - this.x) / 15;
    this.speedY = (this.located_y - this.y) / 10;
    // this.speedX = -5;
    // this.speedY = 3;
  }

  
  // flyToLocatedPosition() {
  //   // const distance_x = this.located_x - this.x;
  //   // const distance_y = this.located_y - this.y;
  //   this.speedX = (this.located_x - this.x) / 15;
  //   this.speedY = (this.located_y - this.y) / 10;
  // }


}