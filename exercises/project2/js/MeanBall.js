//class MeanBall
//A class to create a ball that the player should avoid

//MeanBall constructor
//
//Sets the properties with the arguments received
function MeanBall(x,y,vx,vy,size,speed,color) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  this.fillColor = color;
  this.active=true;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
MeanBall.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y,0,height-this.size);
  this.x = constrain(this.x,0,width-this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.size === height) {
    this.vy = -this.vy;
  }
  if(this.x === 0 || this.x + this.size === width){
    this.vx = -this.vx;
  }
}

// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
MeanBall.prototype.handleCollision = function(paddle, self, side) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      if(this.active==true){
        this.active=false;
        paddle.color='#FE424D';
        setTimeout(function(){
          if(side=='left'){
            paddle.color='#022D41';
          }else{
            paddle.color='#1AA6B7';
          }

        },100);

        if(paddle.h-40<0){
          paddle.score=0;
          gameOver=true;
          winner=self;
          endGame();
        }else{
          paddle.h = paddle.h-40;
        }
        var that = this;
        setTimeout(function(){
          that.active=true;
          that.x=width/2;
          that.y=height/2;
          dramaticSoundActive=true;
        },10000);
      }
    }
  }
}


MeanBall.prototype.display = function(){

    fill(this.fillColor);
    ellipse(this.x, this.y, this.size, this.size);

}
