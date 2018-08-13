const canvas = document.querySelector('canvas');
const startGame = document.querySelector('#btn-start');
const stopGame = document.querySelector('#btn-stop');
const ctx = canvas.getContext('2d');
const p1_bullet_arr = [];
const p2_bullet_arr = [];


const p1 = new Player()
const p2 = new Player(775, 250, 25, 25, 'blue')
const obstacle = new Obstacle(ctx)

// stop game
stopGame.onclick = () => {
  myGameArea.clear()
}

const myGameArea = {
  intervalStart() {
    this.interval = setInterval(update, 100);
  },
  clear() {
    clearInterval(this.interval);
  }
}

// start game
startGame.onclick = () => {
  myGameArea.intervalStart();
  p1.createPlayer(ctx);
  p2.createPlayer(ctx);

  obstacle.createObstacle();
}

// update canvas 
const update = () => {
  ctx.clearRect(0, 0, 800, 500)
  p1.updatePlayer(ctx, 'orange');
  p2.updatePlayer(ctx, 'blue');
  
  obstacle.updateObstacle()
  // update bullet should after updateObstacle
  updateBullet()
  p1_bulletHit()
  p2_bulletHit()
}

// create bullet 
const createBullet = (x, y, p1=true) => {
  if (p1) {
    const bullet = new Bullet(x, y, 10, 3, 5, 'orange');
    p1_bullet_arr.push(bullet)
    // bullet.drawBullet();
  } else {
    const bullet = new Bullet(x, y, 10, 3, -5, 'blue');
    p2_bullet_arr.push(bullet)
    // bullet.drawBullet();
  } 
}

const updateBullet = () => {
  p1_bullet_arr.forEach(i => i.updateBullet())
  p2_bullet_arr.forEach(i => i.updateBullet())
}

// bullet hit something
const p1_bulletHit = () => {
  p1_bullet_arr.forEach((b, b_index) => {
    obstacle.obs_arr.forEach((o, o_index) => {
      if (b.shootSth(o)) {
      p1_bullet_arr.splice(b_index, 1)
      obstacle.obs_arr.splice(o_index, 1)
    } 
    })

    if (b.shootSth(p2)) {
      console.log('player2 dead')
      myGameArea.clear()
      ctx.fillStyle = 'orange'
      ctx.font = "30px Arial";
      ctx.fillText("↓You dead!!", p2.x, p2.y);
    } 
  })
}

const p2_bulletHit = () => {
  p2_bullet_arr.forEach((b, b_index) => {
    obstacle.obs_arr.forEach((o, o_index) => {
      if (b.shootSth(o)) {
      p2_bullet_arr.splice(b_index, 1)
      obstacle.obs_arr.splice(o_index, 1)
    } 
    })

    if (b.shootSth(p1)) {
      console.log('player1 dead')
      ctx.fillStyle = 'blue'
      ctx.font = "30px Arial";
      ctx.fillText("↓You dead!!", p1.x, p1.y);
      myGameArea.clear()
    } 
  })
}

// move player
document.onkeydown = (e) => {
  console.log(p1)
  switch(e.keyCode) {
    // p1
    case 87: p1.moveUp(); break;
    case 83: p1.moveDown(); break;
    case 65: p1.moveLeft(); break;
    case 68: p1.moveRight(); break;
    // p2
    case 38: p2.moveUp(); break;
    case 40: p2.moveDown(); break;
    case 37: p2.moveLeft(); break;
    case 39: p2.moveRight(); break;

    // p1 shoot F
    case 70: createBullet(p1.x + p1.width, p1.y + p1.height/2 + 0.5); break;
    // p2 shoot P
    case 80: createBullet(p2.x, p2.y + p2.height/2 + 0.5, false); break;
  }
}

// document.onkeydown = (e) => {
//   switch(e.keyCode) {
//     case 38: p2.moveUp(); break;
//     case 40: p2.moveDown(); break;
//     case 37: p2.moveLeft(); break;
//     case 39: p2.moveRight(); break;
//   }
// }





