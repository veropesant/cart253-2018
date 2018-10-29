// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

//Paddle constructor // fixed: added the slash to make a comment

//Sets the properties with the provided arguments or defaults // fixed: added the slash to make a comment
function Paddle(x,y,w,h,speed,upKey,downKey) { //fixed : corrected the spelling mistake in the word Paddle
  this.x = x;
  this.y = y;
  this.vx = 0; //fixed : corrected spelling mistake - this.vx instead of this.xv
  this.vy = 0; //fixed : corrected spelling mistake - this.vy instead of this.yv
  this.w = w;
  this.h = h;
  this.speed = speed; // fixed : corrected the spelling mistake in the word 'speed'
  this.downKey = downKey;
  this.upKey = upKey;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() { //fixed : changed the .proto for .prototype
  if (keyIsDown(this.upKey)) { //fixed : changed keyDown for keyIsDown and corrected upKey for this.upKey
    this.vy = -this.speed;
  }
  else if (keyIsDown(this.downKey)) {//fixed : changed keyDown for keyIsDown and corrected downKey for this.downKey
    this.vy = this.speed; //fixed : removed the '-' before this.speed, because we want it to go down
  }
  else { //fixed : added the else to make the paddles stop moving if no key is pressed
  // Otherwise stop moving
    this.vy = 0;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constrain(this.y,0,height-this.h); //fixed :  corrected the function constraint for constrain and the spelling mistake in the word height
}

// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() { //fixed : removed the unexpected token ')' and corrected the spelling mistake in the word 'display'
  rect(this.x,this.y,this.w,this.h); //fixed : changed the function 'rectangle()' for 'rect()', because the first one does not exist
}
