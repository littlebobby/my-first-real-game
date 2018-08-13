const canvas = document.querySelector('canvas');
const startGame = document.querySelector('#btn-start');
const stopGame = document.querySelector('#btn-stop');
const ctx = canvas.getContext('2d');

console.log('good');
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
  p1.updatePlayer(ctx, 'red');
  p2.updatePlayer(ctx, 'blue');
}



// move player
document.onkeydown = (e) => {
  switch(e.keyCode) {
    case 87: p1.moveUp(); break;
    case 83: p1.moveDown(); break;
    case 65: p1.moveLeft(); break;
    case 68: p1.moveRight(); break;

    case 38: p2.moveUp(); break;
    case 40: p2.moveDown(); break;
    case 37: p2.moveLeft(); break;
    case 39: p2.moveRight(); break;
  }
}





