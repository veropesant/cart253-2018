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
  this.speed = speed; // fixed : corrected the spelling mistake in the word 'speed'
  this.downKey = downKey;
  this.upKey = upKey;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() { //fixed : changed the .proto for .prototype
  if (keyIsDown(upKey)) { //fixed : changed keyDown for keyIsDown
    this.vy = -this.speed;
  }
  else if (keyIsDown(downKey)) {//fixed : changed keyDown for keyIsDown 
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
Paddle.prototype.display = function() { //fixed : removed the unexpected token ')' and corrected the spelling mistake in the word 'display'
  rect(this.x,this.y,this.w,this.h); //fixed : changed the function 'rectangle()' for 'rect()', because the first one does not exist
}
