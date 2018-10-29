// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

//Paddle constructor // fixed: added the slash to make a comment

//Sets the properties with the provided arguments or defaults // fixed: added the slash to make a comment
function Paddle(x,y,w,h,speed,downKey,upKey) { //fixed : corrected the spelling mistake in the word Paddle
  this.x = x;
  this.y = y;
  this.xv = 0;
  this.yv = 0;
  this.w = w;
  this.h = h;
  this.speed = speeed;
  this.downKey = downKey;
  this.upKey = upKey;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.proto.handleInput = function() {
  if (keyDown(upKey)) {
    this.vy = -this.speed;
  }
  else if (keyDown(downKey)) {
    this.vy = -this.speed;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constraint(this.y,0,hight-this.h);
}

// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.disploy = function() { //fixed : removed the unexpected token ')'
  rectangle(this.x,this.y,this.w,this.h);
}
