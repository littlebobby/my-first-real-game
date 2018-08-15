// const img_conon_right = new Image();
// img_conon_right.src = './image/cannon_right.svg'
// const img_conon_left = new Image();
// img_conon_left.src = './image/cannon_left.svg'
const img_artillery = new Image();
img_artillery.src = './image/artillery.svg'
// const img_missle = new Image();
// img_missle.src = './image/missle.svg'
class Artillery {
  constructor(x=500, y=275, width= 50, height=50) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.missle_arr = []; 
  }
  createArtillery(ctx) {
    ctx.drawImage(img_artillery ,this.x, this.y, this.width, this.height);
  }


}