//class Panel
//A class to create a start panel before the game starts
//and an end panel when the game ends, and to define what
//goes in it: start button, explanation, final score, winner etc.

//Panel constructor
//
//Sets the properties with the arguments received
function Panel(state, text1,text2,text3, title){
  this.state = state;
  this.text1 = text1;
  this.text2 = text2;
  this.text3 = text3;
  this.title = title;
  this.subtitle = '-remastered-';
}


Panel.prototype.display = function(){
  if(this.state === 'start'){
    fill(255);
    textAlign(CENTER);
    //main title
    push();
    fill(redColor);
    textFont('Monoton');
    textSize(80);
    text(this.title , width/2, height/3.5);
    pop();

    //subtitle
    push();
    fill(leftBlue);
    textSize(30);
    textFont('Unica One');
    text(this.subtitle, width/2, height/2.5);
    pop();

    //background rectangle
    push();
    fill(redColor);
    noStroke();
    rectMode(CENTER);
    rect(width/2, height/1.42, 150, 50, 20);
    pop();

    //text in the rectangle (ENTER)
    push();
    fill('white');
    textSize(30);
    textFont('Monoton');
    text(this.text2, width/2, height/1.37);
    pop();

    //text around the rectangle
    push();
    fill(leftBlue);
    textSize(15);
    text(this.text1, width/2, height/1.56);
    text(this.text3, width/2, height/1.27);
    pop();

  }else{
    fill(255);
    textAlign(CENTER);

    //title
    push();
    fill(redColor);
    textFont('Monoton');
    textSize(80);
    text(this.title , width/2, height/3);
    pop();

    //result text
    push();
    fill(leftBlue);
    textSize(15);
    text(winner +' side wins! \n '+ leftPaddle.score + ' | '+rightPaddle.score, width/2, height/2);
    pop();

    //background rextangle
    push();
    fill(redColor);
    noStroke();
    rectMode(CENTER);
    rect(width/2, height/1.42, 150, 50, 20);
    pop();

    //text in the rectangle (ENTER)
    push();
    fill('white');
    textSize(30);
    textFont('Monoton');
    text(this.text2, width/2, height/1.37);
    pop();

    //text around the rectangle
    push();
    fill(leftBlue);
    textSize(15);
    text(this.text1, width/2, height/1.56);
    text(this.text3, width/2, height/1.27);
    pop();
  }

}
