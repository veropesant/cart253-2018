

//Class to create a color palette to give the user
//a choice of color to draw with

function Color(x, y, size, col){
  this.x=x;
  this.y=y;
  this.size=size;
  this.col=col;
  this.strokeCol = 'black';
  this.click=false;
}


Color.prototype.display = function(){

  fill(this.col);
  stroke(this.strokeCol);
  rectMode(CENTER);
  push();
  fill('black');
  noStroke();
  rect(this.x, this.y, 35, 35);
  pop();
  ellipse(this.x, this.y, this.size, this.size);

}

Color.prototype.handleHover = function(){

  var d = dist(mouseX, mouseY, this.x, this.y);
  if(d<this.size/2){
    this.size = 35;
  }else{
    if(this.click==false){
      this.size = 30;
    }

  }

}

Color.prototype.clicked = function(){

  var d = dist(mouseX, mouseY, this.x, this.y);

  if(d<this.size/2){
    this.click=true;
    this.size=35;
    this.strokeCol='white';
    inUseCol = this.col;
  }

}
