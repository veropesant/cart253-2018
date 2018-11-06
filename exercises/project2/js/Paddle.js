// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor
//
// Sets the properties with the provided arguments or defaults
function Paddle(x,y,w,h,speed,downKey,upKey, shootKey, color, health, side) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
  this.shootKey = shootKey;
  this.color = color;
  this.health = health;
  this.side=side;
  this.isDead = false;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() {
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  else if (keyIsDown(this.downKey)) {
    this.vy = this.speed;
  }
  else {
    this.vy = 0;
  }
}

//handleHealth()
//
//Check if the health equals zero. If it does, it paralayzes the paddle for 2 sec
// then restores health and vx/vy
Paddle.prototype.handleHealth = function(paddle) {
  if(this.health<1 && !this.isDead){
    this.isDead = true;
    this.speed=0;
    this.color='#FE424D';
    var that = this;
    setTimeout(function() {
      console.log('revive now');
      that.health=3;
      that.speed=10;
      that.isDead = false;
      if(paddle == 'right'){
        that.color='#1AA6B7';
      }else{
        that.color='#022D41';
      }
    }, 3000);
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constrain(this.y,0,height-this.h);
}

// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() {
  push();
  noStroke();
  fill(this.color);
  rect(this.x,this.y,this.w,this.h, 20);
  pop()
}
