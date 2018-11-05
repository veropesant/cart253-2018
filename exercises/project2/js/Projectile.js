// Projectile
//
// A class that defines how a projectile behaves

// Projectile constructor
//
// Sets the properties with the provided arguments or defaults
function Projectile(x,y,w,h,speed,color) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.color = color;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Projectile.prototype.update = function () {
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

// display()
//
// Draw the paddle as a rectangle on the screen
Projectile.prototype.display = function() {
  push();
  fill(this.color);
  rect(this.x,this.y,this.w,this.h);
  pop()
}
