// Projectile
//
// A class that defines how a projectile behaves

// Projectile constructor
//
// Sets the properties with the provided arguments or defaults
function Projectile(x,y,size,vx,vy,speed,color,isHurting) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy=vy;
  this.size=size;
  this.speed = speed;
  this.color = color;
  this.isHurting =isHurting;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Projectile.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;


  // Constrain y position to be on screen
  this.x = constrain(this.x,0,width-this.size);

  // Check for touching upper or lower edge and reverse velocity if so

  if(this.x === 0 || this.x + this.size === width){
    this.size=0;
    this.vx=0;
  }
}

// handleCollision(enemy)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Projectile.prototype.handleCollision = function(enemy, self) {
  // Check if the ball overlaps the enemy on x axis
  if (this.x + this.size > enemy.x && this.x < enemy.x + enemy.w) {
    // Check if the ball overlaps the enemy on y axis
    if (this.y + this.size > enemy.y && this.y < enemy.y + enemy.h) {
      this.size=0;
      this.vx=0;
      this.vy=0;
      enemy.health--;
      if(self.h<100){
        self.h=self.h+20;
      }
      this.showUpdateText('-1', enemy);
      enemy.color=255;
      console.log('health: '+enemy.health);
      this.isHurting = false;
      console.log('after: '+this.isHurting);
    }
  }
}

//showUpdateText()
//
//Make a text appear for 1sec to show the damage taken
Projectile.prototype.showUpdateText = function(text, enemy){
  if(enemy.health>=0){
    updateText = text;
    if(enemy.side=='left'){
      updateTextX = enemy.x+20;
      setTimeout(function(){
          enemy.color='#022D41';
      },100);
    }else{
      updateTextX = enemy.x-20;
      setTimeout(function(){
          enemy.color='#1AA6B7';
      },100);
    }
    updateTextY = enemy.y-20;
    setTimeout(function(){
          updateText = '';
          updateTextX = 0;
          updateTextY = 0;
    }, 1000);
  }

}


// display()
//
// Draw the paddle as a rectangle on the screen
Projectile.prototype.display = function() {
  push();
  fill(this.color);
  rect(this.x,this.y,this.size,this.size);
  pop()
}
