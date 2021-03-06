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

const supplyBox_left_arr = []
const supplyBox_right_arr = []

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

  // ! create the first 2 supply box
  createSupplyBox(isP1 = true)
  createSupplyBox(isP1 = false)


}

// * update canvas 
const update = () => {
  frame ++;
  ctx.clearRect(0, 0, c_width, c_height)
  
  obstacle.updateObstacle()
  p1.updatePlayer(p1, ctx, 'orange');
  p2.updatePlayer(p2, ctx, 'blue');
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
  if (frame % 9 === 0) {
    obstacle.generateRandomObstacle()
  }
  if (frame % 150 === 0) {
      createMissile()
  }
  updateMissle()

  // * update per frame
  updateBlackHole()
  // ! generate new blackhole per 10s after the previous did
  newBlackHole()
  p1.enteredIntoBlackHole(hole_left)
  p2.enteredIntoBlackHole(hole_right)


  // todo generate supply box
  updateSupplyBox()
  // ! check if collected
  p1.collectSupplyBox(supplyBox_left_arr)
  p2.collectSupplyBox(supplyBox_right_arr)

  createSupplyBox(isP1 = true)
  createSupplyBox(isP1 = false)


}

// * bullet 
const createBullet = (x, y, isP1 = true) => {
  if (isP1 && p1.bulletNum > 0 && !p1.hasDizziness) {
    if (frame < 60*2*10) {
      const bullet = new Bullet(x, y, 10, 3, 5, 0, 'orange');
      p1.bullet_arr.push(bullet)    
      p1.bulletNum --;
    }
    // console.log(p1.bulletNum)
    if (frame >= 60*2*10) {
      const bullet = new Bullet(x, y, 10, 3, 10, 0, 'orange');
      p1.bullet_arr.push(bullet)    
      p1.bulletNum --;
    }
  } else if (!isP1 && p2.bulletNum > 0 && !p2.hasDizziness){
    if (frame < 60*2*10) {
      const bullet = new Bullet(x, y, 10, 3, -5, 0, 'blue');
      p2.bullet_arr.push(bullet)    
      p2.bulletNum --;
    }
    // console.log(p1.bulletNum)
    if (frame >= 60*2*10) {
      const bullet = new Bullet(x, y, 10, 3, -10, 0, 'blue');
      p2.bullet_arr.push(bullet)    
      p2.bulletNum --;
    }
  } 
}
const updateBullet = () => {
  p1.bullet_arr.forEach(i => i.updateBullet())
  p2.bullet_arr.forEach(i => i.updateBullet())
}

// * missle
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

// * black hole
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

// !
// todo create supply box
// const createNewBox = () => {

// }
const createSupplyBox = (isP1) => {
  const supplybox = new SupplyBox();
  if (isP1 && p1.canHaveNewSupplyBox) {
    supplybox.generateRandomLocation_left(ctx);
    supplyBox_left_arr.push(supplybox);
    p1.canHaveNewSupplyBox = false;
  } else if (!isP1 && p2.canHaveNewSupplyBox) {
    supplybox.generateRandomLocation_right(ctx);
    supplyBox_right_arr.push(supplybox);
    p2.canHaveNewSupplyBox = false;
  }
}
const updateSupplyBox = () => {
  supplyBox_left_arr.map(a => a.redrawSupplyBox())
  supplyBox_right_arr.map(a => a.redrawSupplyBox())
}

// * move player
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