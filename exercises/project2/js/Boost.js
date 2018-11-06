

//class Boost
//A class to create a boost that allows the player who catches interval
// to reset his health and height


//Boost constructor
//
//Sets the properties with the arguments received
function Boost(x,y,vx,vy,size){
  this.x=x;
  this.y=y;
  this.vx=vx;
  this.vy=vy;
  this.size=size;
  this.angle=0;
  this.active=false;
  this.fillColor;
  this.active=false;
}



//update
//
//a function to make the boost move randomly on the canvas
Boost.prototype.update = function(){
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

//handle collision
//
//function to handle of the boost is catched by one of the players
Boost.prototype.handleCollision = function(paddle){
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      if(this.active==true){
        this.active=false;
        paddle.health=3;
        paddle.h=100;
      }
    }
  }
}

//display
//
//A function to display the boost and make it flicker
Boost.prototype.display = function(){
  fillColor = color(map(sin(this.angle),-1,1,0,255),map(cos(this.angle),-1,1,0,255,0),200);
  fill(fillColor);
  ellipse(this.x,this.y,this.size);
  this.angle += 0.05;
}
