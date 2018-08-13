class Player {
  constructor(x=0, y=250, width=25, height=25, color='orange') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speedX = 0;
    this.speedY = 0;
  }
  createPlayer(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  updatePlayer(ctx, color='black') {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedX = 0;
    this.speedY = 0;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  
  moveUp() {
    if(this.y > 0) { this.speedY = -25; }
  }
  moveDown() {
    if(this.y < 475) { this.speedY = 25; }
  }
  moveRight() {
    if(this.x < 775) { this.speedX = 25; }
  }
  moveLeft() {
    if(this.x > 0) { this.speedX = -25; }  
  }
}