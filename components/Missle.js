const img_missle = new Image();
img_missle.src = './image/missle.svg'
img_missle.style.color = 'blue'

class Missle extends Component{
  constructor(x = 0, y = 0, width, height, speedX = 0, speedY=0, located_x=0, located_y=0, targetP1=true) {
    super(x, y, width, height, speedX, speedY);
    this.located_x = located_x;
    this.located_y = located_y;
    this.flyUpward = true;
    this.didBoomed = false;
  }

  drawMissle(ctx) {
    ctx.drawImage(img_missle ,this.x, this.y, this.width, this.height);
  }
  updateMissle(ctx) {
    this.missleOnFlying()
    this.x += this.speedX;
    this.y += this.speedY;
    ctx.drawImage(img_missle ,this.x, this.y, this.width, this.height);

  }

  top() { return this.y }
  bottom() { return this.y + this.height }
  left() {return this.x }
  right() {return this.x + this.width }

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
    // console.log(this.speedY)
  }
  missle_fly_downward() {
    const distance_x = this.located_x - this.x
    const distance_y = this.located_y - this.y
    this.speedX = distance_x / 15;
    this.speedY = distance_y / 15;
    const absDistance_x_y = Math.abs(distance_x) + Math.abs(distance_y);
    if (absDistance_x_y < 400 && absDistance_x_y > 200) {
      this.speedX = distance_x / 10;
      this.speedY = distance_y / 10;
      // console.log('<<<<<<<22222')
    } else if  (absDistance_x_y < 200) {
      this.didBoomed = true;
      // console.log('<<<<<<<111')
    }
  }

  inMissleShouldBoomArea(o) {
    return (!(this.top() > o.y + o.height + 25||
              this.bottom() < o.y - 25 ||
              this.left() > o.x + o.width + 25 ||
              this.right() < o.x - 25))
  }
}