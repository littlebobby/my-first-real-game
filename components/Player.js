const img_funny = new Image()
img_funny.src = './image/Funny.svg'
const img_sad = new Image()
img_sad.src = './image/Sad.svg'
const img_angry = new Image()
img_angry.src = './image/Angry.svg'
const img = new Image()


class Player extends Component{
  constructor(x=0, y=250, width=25, height=25, color='orange') {
    super(x, y, width, height);
    this.color = color;
    this.speedX = 0;
    this.speedY = 0;
    this.bullet_arr = [];
    this.health = 3;
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
    switch(this.health) {
      case 3: img.src = img_funny.src; break;
      case 2: img.src = img_sad.src; break;
      case 1: img.src = img_angry.src; break;
    }
    
    ctx.drawImage(img, this.x, this.y, this.width, this.height);
    
  }
  
  moveUp() {
    if(this.y > 0) { this.speedY = -25; }
  }
  moveDown() {
    if(this.y < 475) { this.speedY = 25; }
  }
  moveRight() {
    if(this.x < 775 && this.x !== 350) { this.speedX = 25; }
  }
  moveLeft() {
    if(this.x > 0 && this.x !== 425) { this.speedX = -25; }  
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
    this.health = 3;
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
      })
      // hit border
      if (b.x + b.width > 800 || b.x < 0 || b.y < 0 || b.y + b.height > 500) {
        this.bullet_arr.splice(b_index, 1);
      }
      // hit player
      if (b.shootSth(player)) {
        // clear the bullet in the same row
        console.log('shoooooot you')
        const newArr = this.bullet_arr.filter(bullet => bullet.y !== b.y)
        // this.bullet_arr.splice(b_index, 1)
        this.bullet_arr = [...newArr];
        
        console.log(this.health)
        player.health --;
        this.checkHealth(player)
      } 
    })
  }

  checkHealth(player) {
    console.log(player.health)
    if (player.health === 0) {
      ctx.fillStyle = 'red'
      ctx.font = "bold 30px Courier New";
      ctx.fillText("↓You dead!!", player.x, player.y);
      myGameArea.reborn()
    }
  }
  
}