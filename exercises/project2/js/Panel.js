//class Panel
//A class to create a start panel before the game starts
//and an end panel when the game ends, and to define what
//goes in it: start button, explanation, final score, winner etc.

//Panel constructor
//
//Sets the properties with the arguments received
function Panel(state, text, title){
  this.state = state;
  this.text = text;
  this.title = title;
}


Panel.prototype.display = function(){
  if(this.state === 'start'){
    fill(255);
    textAlign(CENTER);
    push();
    fill('blue');
    textSize(80);
    text(this.title , width/2, height/3);
    pop();
    text(this.text, (width/2), height/2);
  }else{
    fill(255);
    textAlign(CENTER);
    push();
    fill('blue');
    textSize(80);
    text(this.title , width/2, height/3);
    pop();
    text(winner +' side wins! \n '+ leftPaddleScore + ' | '+rightPaddleScore+'\n'+this.text , (width/2), height/2);
  }

}
