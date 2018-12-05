
//Class to create and handle the different buttons
//in the game
function Button(src, x, y, w, h, type){
  this.src=src;
  this.x=x;
  this.y=y;
  this.w=w;
  this.h=h;
  this.play='play';
  this.type=type;
}

//function called with draw to display the two main buttons
//camera and play/pause
Button.prototype.display = function(){
  imageMode(CENTER);
  push();
  image(imgPlayCon,this.x, this.y, this.w+5, this.h+5);
  pop();
  image(this.src, this.x, this.y, this.w, this.h);
}


//function to handle what to do when each button is clicked
Button.prototype.clicked = function(){
  //checking the distance between the mouse and the button clicked
  var d = dist(mouseX, mouseY, this.x, this.y);

  //if the mouse is on the button...
  if(d < this.w/2){
    //...check which button was clicked with the type
    if(this.type=='playPause'){
      //pause or play the video capture
      if(this.play=='play'){
        this.play='pause';
        this.src=imgPlay;
        play=false;
      }else{
        this.play='play';
        this.src=imgPause;
        play=true;
      }
    }else if(this.type=='camera'){
      //save the current canvas if it's the screeshot button
      var c = get(75, 75, 650, 450);
      save(c);
    }
  }

}
