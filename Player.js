class Player {
  constructor(x=0, y=250, width=25, height=25, color='orange') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speedX = 0;
    this.speedY = 0;
    this.bullet_arr = [];
    this.isDead = false;
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

  default(x=0, y=250, width=25, height=25, color='orange') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speedX = 0;
    this.speedY = 0;
    this.bullet_arr = [];
    this.isDead = false;
  }

  // bullet hit obstacle or the other player
  bulletHitSth(obstacle, player) {
    this.bullet_arr.forEach((b, b_index) => {
      // hit obstacle 
      obstacle.obs_arr.forEach((o, o_index) => {
        if (b.shootSth(o)) {
          this.bullet_arr.splice(b_index, 1);
          obstacle.obs_arr.splice(o_index, 1);
        } 
        // console.log('not hit border')
      })
      // hit border
      if (b.x + b.width > 800 || b.x < 0 || b.y < 0 || b.y + b.height > 500) {
        this.bullet_arr.splice(b_index, 1);
        console.log('hit border')
      }
      // hit player
      if (b.shootSth(player)) {
        myGameArea.clear()
        ctx.fillStyle = 'red'
        ctx.font = "30px Arial";
        ctx.fillText("↓You dead!!", player.x, player.y);
        player.isDead = true;
      } 
    })
  }
  
}