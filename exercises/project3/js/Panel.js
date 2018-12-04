

//Class to create and handle a title screen
//for the drawing application

function Panel(title, instructions){
  this.title = title;
  this.instructions = instructions;
  this.lightText = 'Use a small source of light \nin a very dark room \nto paint';
  this.playText = 'Click the play/pause button \nto stop the recording';
  this.camText = 'Click the camera button at \nany time to save your \ndrawing';
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
    text(this.title[i], 150+i*50, 80);
  }
  // text(this.title, width/2, height/2);
  push();
  fill(255);
  textSize(20);
  text(this.instructions, width/2, height-60);
  textAlign(LEFT);
  textSize(15);

  //Explanation text for the painting
  text(this.lightText, 90, height/3+20);
  image(imgBulb, width/3+60, height/3, 40, 60);

  //Explanation text for the play pause button
  text(this.playText, width/2+120, height/3+20);
  image(imgMouse, width/2+30, height/3+10, 50, 60);

  //Explanation text for the camera button
  text(this.camText, 90, height/2+50);
  image(imgMouseCam, width/3+60, height/2+40, 50, 60);
  pop();

}
