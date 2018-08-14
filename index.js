const canvas = document.querySelector('canvas');
const c_width = canvas.width;
const c_height = canvas.height;
const start_btn = document.querySelector('#btn-start');
const pause_btn = document.querySelector('#btn-pause');
const ctx = canvas.getContext('2d');
const revivePlayer = document.querySelector('#btn-revive');
const restart_btn = document.querySelector('#btn-restart')

const p1 = new Player()
const p2 = new Player(c_width - 25, c_height/2, 25, 25, 'blue')
const obstacle = new Obstacle(ctx)
let frame = 0;

// BUTTON pause game
pause_btn.onclick = () => {
  pause_btn.innerHTML === 'Pause' 
  ? (pause_btn.innerHTML = 'Resume', myGameArea.clear())
  : (pause_btn.innerHTML = 'Pause', myGameArea.intervalStart());
}
// BUTTON revive game
revivePlayer.onclick = () => {
  ctx.clearRect(0, 0, c_width, c_height)
  myGameArea.clear();
  myGameArea.reborn();
  myGameArea.start();
  myGameArea.intervalStart();
}
// BUTTON restart game -- new game
restart_btn.onclick = () => {
  ctx.clearRect(0, 0, c_width, c_height);
  myGameArea.clear();
  myGameArea.start();
  p1.default();
  p2.default(c_width - 25, c_height/2, 25, 25, 'blue');
  obstacle.obs_arr = [];
  obstacle.createObstacle();
  myGameArea.intervalStart();
}

const myGameArea = {
  start() {
    revivePlayer.style['display'] = 'none';
    p1.createPlayer(ctx);
    p2.createPlayer(ctx);
  },
  intervalStart() {
    this.interval = setInterval(update, 100);
  },
  clear() {
    clearInterval(this.interval);
  },
  reborn() {
    this.clear()
    if (p1.isDead) {
      revivePlayer.innerHTML = 'player1 REBORN';
    } else {
      revivePlayer.innerHTML = 'player2 REBORN';
    }
    revivePlayer.style['display'] = 'block';
  }
}

// BUTTON start game
start_btn.onclick = () => {
  myGameArea.start()
  myGameArea.clear()
  myGameArea.intervalStart();
  obstacle.createObstacle();
  obstacle.createRiver()
}

// update canvas 
const update = () => {
  frame ++;
  ctx.clearRect(0, 0, c_width, c_height)
  p1.updatePlayer(ctx, 'orange');
  p2.updatePlayer(ctx, 'blue');
  
  obstacle.updateObstacle()
  updateBullet()
  p1.bulletHitSth(obstacle, p2)
  p2.bulletHitSth(obstacle, p1)
  if (frame % 3 === 0) {
    obstacle.generateRandomObstacle()
  }
  
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