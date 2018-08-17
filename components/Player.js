const img_funny = new Image()
img_funny.src = './image/Funny.svg'
const img_sad = new Image()
img_sad.src = './image/Sad.svg'
const img_angry = new Image()
img_angry.src = './image/Angry.svg'
const img = new Image()

const img_sleep_left = new Image();
img_sleep_left.src = './image/sleep_left.png';
const img_sleep_right = new Image();
img_sleep_right.src = './image/sleep_right.png';

const img_invulnerable = new Image();
img_invulnerable.src = './image/invulnerable.svg';
// const img_laugh = new Image();
// img_laugh.src = './image/laugh_emoji.png'


class Player extends Component{
  constructor(x=0, y=250, width=25, height=25,speedX = 0, speedY=0) {
    super(x, y, width, height, speedX, speedY);
    this.bullet_arr = [];
    this.health = 3;
    this.isDead = false;
    this.hasDizziness = false;
    this.transferable = true;
    this.isInvulnerable = false;
    this.bulletNum = 400;
  }
  createPlayer(ctx) {
    ctx.drawImage(img_funny, this.x, this.y, this.width, this.height);
  }

  updatePlayer(player, ctx, color='black') {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedX = 0;
    this.speedY = 0;
    switch(this.health) {
      case 3: img.src = img_funny.src; break;
      case 2: img.src = img_sad.src; break;
      case 1: img.src = img_angry.src; break;
    }
    if (this.hasDizziness) {
      img.src = img_sleep_left.src;
    } 
    if (this.isInvulnerable) {
      img.src = img_invulnerable.src;
    }
    ctx.drawImage(img, this.x, this.y, this.width, this.height);
    this.showBulletNum(player)
  }
  
  moveUp() {
    if(this.y > 0 && !this.hasDizziness) { this.speedY = -25; }
  }
  moveDown() {
    if(this.y < 575 && !this.hasDizziness) { this.speedY = 25; }
  }
  moveRight() {
    if(this.x < 975 && this.x !== 450 && !this.hasDizziness) { this.speedX = 25; }
  }
  moveLeft() {
    if(this.x > 0 && this.x !== 525 && !this.hasDizziness) { this.speedX = -25; }  
  }

  default(x=0, y=250, width=25, height=25) {
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
    this.hasDizziness = false;
    this.transferable = true;
    this.isInvulnerable = false;
  }

  // bullet hit obstacle or the other player
  bulletHitSth(obstacle, player, artillery) {
    this.bullet_arr.forEach((b, b_index) => {
      // hit -- obstacle 
      obstacle.obs_arr.forEach((o, o_index) => {
        if (b.shootSth(o)) {
          this.bullet_arr.splice(b_index, 1);
          obstacle.obs_arr.splice(o_index, 1);
        } 
      })
      // hit -- border
      if (b.x + b.width > 1000 || b.x < 0 || b.y < 0 || b.y + b.height > 600) {
        this.bullet_arr.splice(b_index, 1);
      }
      // hit -- player


      // ! check if is invulnerable
      if (b.shootSth(player) && player.isInvulnerable === false) {
        // clear the bullet in the same row
        const newArr = this.bullet_arr.filter(bullet => bullet.y !== b.y)
        this.bullet_arr = [...newArr];
        player.health --;
        this.checkHealth(player)
      } 
      
      // bulllet shoot artillery
      if (b.shootSth(artillery)) {
        this.bullet_arr.splice(b_index, 1);
      }
    })
  }

  checkHealth(player) {

    // !turn on invunerable ability
    if (player.health === 1 && player.isInvulnerable === false) {
      this.turnOnInvulnerable(player)
    }
    // ! added invulnerable test
    if (player.health === 0 && player.isInvulnerable === false) {
      ctx.fillStyle = 'red'
      ctx.font = "bold 30px Courier New";
      ctx.fillText("↓You dead!!", player.x, player.y);
      myGameArea.reborn()
    }
  }

  missleBoommed(artillery) {
    artillery.missle_arr.map((a, i) => {
      if (a.inMissleShouldBoomArea(this)) {
        // set dizziness effect 
        // ! wrap to check Invulnerable 
        if (!this.isInvulnerable) {
          this.hasDizziness = true;
          setTimeout(()=>this.hasDizziness = false, 3000)
          artillery.missle_arr.splice(i, 1)
          console.warn('i catch you ')
        }
        
      }
    }) 
  }

  enteredIntoBlackHole(holeObj) {
    if (holeObj.arr.length === 2 && this.transferable) {
      if (holeObj.arr[0].isPlayerEntered(this)) {
        this.x = holeObj.arr[1].x
        this.y = holeObj.arr[1].y
        this.transferable = false; 
        this.isTransferable()
        // console.log(holeObj.health)
        holeObj.health --
        console.log(holeObj.health)
        holeObj.checkIfHoleDie()


      } else if (holeObj.arr[1].isPlayerEntered(this)) {
        this.x = holeObj.arr[0].x
        this.y = holeObj.arr[0].y
        this.transferable = false; 
        this.isTransferable();
        holeObj.health --
        holeObj.checkIfHoleDie()
      }
    }
  }

  isTransferable() {
    if (!this.transferable) {
      setTimeout(() => {
        this.transferable = true;
      }, 3000);
    }
  }

  // todo show bullet number
  showBulletNum(player) {
    if (player.x < 525) {
      ctx.fillStyle = 'ffA433'
      ctx.font = "bold 20px Courier New";
      ctx.fillText(player.bulletNum, 10, 20)
    } else {
      ctx.fillStyle = 'ffA433'
      ctx.font = "bold 20px Courier New";
      ctx.fillText(player.bulletNum, 960, 20)
    }
   
  }

  // * condition - health 1 
  // * you will have 10sec invulnerable ability - health 1
  turnOnInvulnerable(player) {
    player.isInvulnerable = true;
    console.log('yeah i am invulnerable')
    setTimeout(() => {
      player.health = 1;
      console.log('called to turn off invulnerable')
      player.isInvulnerable = false;
    }, 10000);
    // this.health = 1;
    // this.hasDizziness = false;
  }

  // todo codition - health 2
  
}