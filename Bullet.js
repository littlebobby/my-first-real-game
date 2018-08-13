class Bullet {
  constructor(x, y, width = 10, height = 3, speedX = 5, color='#f00') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = speedX;
    // this.speedY = speedY;
    this.color = color;
  }

  drawBullet() {

    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  updateBullet() {
    ctx.fillStyle = this.color;
    // ctx.clearRect(this.x, this.y, this.width, this.height)

    this.x += this.speedX;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  top() { return this.y }
  bottom() { return this.y + this.height }
  left() {return this.x }
  right() {return this.x + this.width }



  hitObstacle(obstacle) {
    return (!(this.top() > obstacle.y + obstacle.height||
              this.bottom() < obstacle.y ||
              this.left() > obstacle.x + obstacle.width ||
              this.right() < obstacle.x))
  };
    
    // obstacleArr.forEach(obstacle => {
      // console.log(obstacle)
      // console.log('text')
//       console.log('bullet, top()', this.top())
//       console.log('bullet, top()', this.bottom())
//       console.log('bullet, left()', this.left())
//       console.log('bullet, right()', this.right())
// console.log('bottom',obstacle.y + obstacle.height);
// console.log('top',obstacle.y);
// console.log('right',obstacle.x + obstacle.width);
// console.log('left',obstacle.x);




      // console.log('obstacle, height()', obstacle.y + obstacle.height)
    //   if (!(this.top() > obstacle.y + obstacle.height||
    //    this.bottom() < obstacle.y ||
    //    this.left() > obstacle.x + obstacle.width ||
    //    this.right() < obstacle.x)) {
    //      result = 'true'
    //    } else {
    //      result = 'false';
    //    }
    // });
    // console.log(result)
    
  

}