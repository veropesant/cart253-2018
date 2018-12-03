

//Class to create and handle a title screen
//for the drawing application

function Panel(title, instructions){
  this.title = title;
  this.instructions = instructions;
  this.lightText = 'Use a small source of light \nin a very dark room \nto paint';
  this.playText = 'Click the play/pause button \nto stop the recording';
}

Panel.prototype.display = function(){
  textFont(mainFont);
  textSize(80);
  textAlign(CENTER);
  for(var i=0; i<this.title.length; i++){
    textAlign(CENTER);
    var iCol=i;
    if(iCol>colors.length){
      iCol = i-colors.length;
    }
    var col = String(colors[iCol]);
    fill(col);
    text(this.title[i], 70+i*50, 80);
  }
  // text(this.title, width/2, height/2);
  push();
  fill(255);
  textSize(20);
  text(this.instructions, width/2, height-60);
  textAlign(LEFT);
  textSize(15);
  text(this.lightText, 40, height/2+20);
  image(imgBulb, width/3+20, height/2, 40, 60);
  text(this.playText, width/2+100, height/2+20);
  image(imgMouse, width/2+40, height/2+10, 50, 60);
  pop();

}
