const canvas = document.querySelector('canvas');
const c_width = canvas.width;
const c_height = canvas.height;
const start_btn = document.querySelector('#btn-start');
const pause_btn = document.querySelector('#btn-pause');
const ctx = canvas.getContext('2d');
const revivePlayer = document.querySelector('#btn-revive');
const restart_btn = document.querySelector('#btn-restart')

const p1 = new Player()
const p2 = new Player(c_width - 25, c_height/2)
const obstacle = new Obstacle(ctx)
const artillery = new Artillery();
let frame = 0;
// black hole array

// TODO BUTTON pause game
pause_btn.onclick = () => {
  pause_btn.innerHTML === 'Pause' 
  ? (pause_btn.innerHTML = 'Resume', myGameArea.clear())
  : (pause_btn.innerHTML = 'Pause', myGameArea.intervalStart());
}
// TODO revive game
revivePlayer.onclick = () => {
  ctx.clearRect(0, 0, c_width, c_height)
  myGameArea.clear();
  myGameArea.reborn();
  myGameArea.start();
  myGameArea.intervalStart();
}
// TODO restart game -- new game
restart_btn.onclick = () => {
  ctx.clearRect(0, 0, c_width, c_height);
  myGameArea.clear();
  myGameArea.start();
  p1.default();
  p2.default(c_width - 25, c_height/2);
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

// TODO start game
start_btn.onclick = () => {
  myGameArea.start()
  myGameArea.clear()
  myGameArea.intervalStart();
  obstacle.createObstacle();
  obstacle.createRiver();
  artillery.createArtillery(ctx)

  // * generate the first two black hole
  createPairBlackHole()
}

// * update canvas 
const update = () => {
  frame ++;
  ctx.clearRect(0, 0, c_width, c_height)
  p1.updatePlayer(ctx, 'orange');
  p2.updatePlayer(ctx, 'blue');
  
  obstacle.updateObstacle()
  artillery.createArtillery(ctx)
  updateBullet()
  // check bullet 
  p1.bulletHitSth(obstacle, p2, artillery)
  p2.bulletHitSth(obstacle, p1, artillery)

  // check missle
  if (artillery.missle_arr.length) {
    p1.missleBoommed(artillery); // note!!!!!!!
    p2.missleBoommed(artillery); // note!!!!!!!
  }
  if (frame % 6 === 0) {
    obstacle.generateRandomObstacle()
  }
  if (frame % 100 === 0) {
      createMissile()
  }

  updateMissle()

  // * update per frame
  updateBlackHole()
  // ! generate new blackhole per 10s after the previous did
  newBlackHole()
  p1.enteredIntoBlackHole(hole_left)
  p2.enteredIntoBlackHole(hole_right)
}

// TODO bullet 
const createBullet = (x, y, isP1 = true) => {
  if (isP1) {
    const bullet = new Bullet(x, y, 10, 3, 5, 0, 'orange');
    p1.bullet_arr.push(bullet)    
  } else {
    const bullet = new Bullet(x, y, 10, 3, -5, 0, 'blue');
    p2.bullet_arr.push(bullet)
  } 
}
const updateBullet = () => {
  p1.bullet_arr.forEach(i => i.updateBullet())
  p2.bullet_arr.forEach(i => i.updateBullet())
}

// TODO missle
const createMissile = () => {
  const random = Math.random() - 0.5;
  const missle = new Missle(500, 275, 25, 25, 0, 0, true);
  if (random > 0) {
    missle.targetP1 = true;
  } else {
    missle.targetP1 = false;
  }
  artillery.missle_arr.push(missle) 
  missle.drawMissle(ctx);
}
const updateMissleTargetLocation = () => {
  artillery.missle_arr.map(i => {
    // const random = Math.random() - 1;
    if (i.targetP1) {
      i.located_x = p1.x;
      i.located_y = p1.y;
    } else {
      i.located_x = p2.x;
      i.located_y = p2.y;
    }
  })
}
const updateMissle = () => {
  if (artillery.missle_arr.length) {
    artillery.missle_arr.map(i => i.updateMissle(ctx))
    // update mussle target location 3 frames per time
    if (frame % 3 === 0) {
      updateMissleTargetLocation()
    }
  }
}

// TODO black hole
const createPairBlackHole = () => {
  generateBlackHole(isLeft = true)
  generateBlackHole(isLeft = false)
  generateBlackHole(isLeft = true)
  generateBlackHole(isLeft = false)

}
const newBlackHole = () => {
  const blackHole = new BlackHole()
  blackHole.canDrawHole(hole_left, ctx, blackHole)
  blackHole.canDrawHole(hole_right, ctx, blackHole)
}
const generateBlackHole = (isLeft) => {
  const blackHole = new BlackHole()
  if (isLeft) {
    blackHole.beforeDrawHole(hole_left, ctx, blackHole)
  } else {
    blackHole.beforeDrawHole(hole_right, ctx, blackHole)
  }
  
  
}
const updateBlackHole = () => {
  hole_left.arr.forEach(a => a.redrawBlackHole(ctx, hole_left))
  hole_right.arr.forEach(a => a.redrawBlackHole(ctx, hole_right))
}


// todo move player
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