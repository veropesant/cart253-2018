

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

//Display each color one after the other
Color.prototype.display = function(){

  fill(this.col);
  stroke(this.strokeCol);
  ellipseMode(CENTER);
  push();
  fill('black');
  noStroke();
  ellipse(this.x, this.y, 40, 40);
  pop();
  ellipse(this.x, this.y, this.size, this.size);

}

//function to create a scale up effect when the mouse is over one of the color button
Color.prototype.handleHover = function(){

  var d = dist(mouseX, mouseY, this.x, this.y);
  if(d<this.size/2){
    this.size = 35;
  }else{
    if(this.click==false){
      //put the size back to normal when the mouse is gone
      //and if the button was not clicked
      this.size = 30;
    }

  }

}

//function to handle the click event on the color buttons
Color.prototype.clicked = function(){
  //get the distance between the mouse and the clicked button
  var d = dist(mouseX, mouseY, this.x, this.y);

  //if the mouse touches the button, changes the styles
  //Adds a white stroke and augment the size
  if(d<this.size/2){
    this.click=true;
    this.size=35;
    this.strokeCol='white';
    inUseCol = this.col;
  }

}
