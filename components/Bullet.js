class Bullet extends Component{
  constructor(x, y, width = 10, height = 3, speedX = 5, color='#f00') {
    super(x, y, width, height)
    this.speedX = speedX;
    this.color = color;
  }

  drawBullet() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  updateBullet() {
    ctx.fillStyle = this.color;
    this.x += this.speedX;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  top() { return this.y }
  bottom() { return this.y + this.height }
  left() {return this.x }
  right() {return this.x + this.width }

  shootSth(o) {
    return (!(this.top() > o.y + o.height||
              this.bottom() < o.y ||
              this.left() > o.x + o.width ||
              this.right() < o.x))
  }
}