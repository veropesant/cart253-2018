

//Class to create and handle a title screen
//for the drawing application

function Panel(title, instructions){
  this.title = title;
  this.instructions = instructions;
  //Different texts to display the isntructions on the title screen
  this.lightText = 'Use a small source of light \nin a very dark room \nto paint';
  this.playText = 'Click the play/pause button \nto stop the recording';
  this.camText = 'Click the camera button at \nany time to save your \ndrawing';
}

//Function to display the elements on the title screen
Panel.prototype.display = function(){
  //sets the styles for the main title
  textFont(mainFont);
  textSize(80);
  textAlign(CENTER);
  //Display each letter of the title separately and give them
  //the colors of the colors array declared in the script
  for(var i=0; i<this.title.length; i++){
    textAlign(CENTER);
    var iCol=i;
    //if the counter of colors is bigger than the array length
    //set it back to zero to use the array's first color and second, etc.
    if(iCol>colors.length){
      iCol = i-colors.length;
    }
    //sets the variable for the fill
    var col = String(colors[iCol]);
    fill(col);
    text(this.title[i], 150+i*50, 80);
  }

  //sets different styles for the instruction texts
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
