const canvas = document.querySelector('canvas');
const startGame = document.querySelector('#btn-start');
const stopGame = document.querySelector('#btn-stop');
const ctx = canvas.getContext('2d');
const restartGame = document.querySelector('#btn-restart');

const p1 = new Player()
const p2 = new Player(775, 250, 25, 25, 'blue')
const obstacle = new Obstacle(ctx)

// stop game
stopGame.onclick = () => {
  myGameArea.clear();
}

restartGame.onclick = () => {
  ctx.clearRect(0, 0, 800, 500)
  myGameArea.clear();
  myGameArea.start();
  myGameArea.intervalStart();
}

const myGameArea = {
  start() {
    
    p1.createPlayer(ctx);
    p2.createPlayer(ctx);
  },
  intervalStart() {
    this.interval = setInterval(update, 100);
  },
  clear() {
    clearInterval(this.interval);
    if (p1.isDead) {
      restartGame.innerHTML = 'player1 REVIVE';
    } else {
      restartGame.innerHTML = 'player2 REVIVE';
    }
    restartGame.style['display'] = 'block';
  }
}

// start game
startGame.onclick = () => {
  myGameArea.start()
  myGameArea.intervalStart();
  obstacle.createObstacle();
}

// update canvas 
const update = () => {
  ctx.clearRect(0, 0, 800, 500)
  p1.updatePlayer(ctx, 'orange');
  p2.updatePlayer(ctx, 'blue');
  
  obstacle.updateObstacle()
  updateBullet()
  p1.bulletHitSth(obstacle, p2)
  p2.bulletHitSth(obstacle, p1)
}

// create bullet 
const createBullet = (x, y, isP1 = true) => {
  if (isP1) {
    const bullet = new Bullet(x, y, 10, 3, 5, 'orange');
    p1.bullet_arr.push(bullet)
    // bullet.drawBullet();
    
  } else {
    const bullet = new Bullet(x, y, 10, 3, -5, 'blue');
    p2.bullet_arr.push(bullet)
    // bullet.drawBullet();
  } 
}

const updateBullet = () => {
  p1.bullet_arr.forEach(i => i.updateBullet())
  p2.bullet_arr.forEach(i => i.updateBullet())
}


// move player
const keys = {};
document.addEventListener('keydown', (e) => {
  keys[e.keyCode] = true;
  keyPressed()
})
document.addEventListener('keyup', (e) => {
  delete keys[e.keyCode];
})
const keyPressed = () => {
  // P1
  if (keys[87]) { p1.moveUp() }
  if (keys[83]) { p1.moveDown() }
  if (keys[65]) { p1.moveLeft() }
  if (keys[68]) { p1.moveRight() }
  if (keys[70]) { createBullet(p1.x + p1.width, p1.y + p1.height/2 + 0.5) }
  // P2
  if (keys[38]) { p2.moveUp() }
  if (keys[40]) { p2.moveDown() }
  if (keys[37]) { p2.moveLeft() }
  if (keys[39]) { p2.moveRight() }
  if (keys[80]) { createBullet(p2.x, p2.y + p2.height/2 + 0.5, false) }
}





