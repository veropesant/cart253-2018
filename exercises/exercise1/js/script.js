/*****************

Exercice 1
Veronique Pesant

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// setup()
//
// Description of setup
//Only runs once, then stops.

function setup() {
  console.log('start');
  createCanvas(500, 500);
  noFill();
  background("#05002E");
  fill('#1522BF');
  ellipseMode(CENTER);
  noStroke();
  ellipse(250, 250, 400, 400);
  fill('#3045C7');
  ellipse(250, 250, 300, 300);

  noFill();
  stroke(226);
  strokeWeight(6);
  line(200, 150, 250, 220);
  // line(230, 200, 250, 160);
  line(250, 150, 250, 220);
  line(250, 150, 280, 150);
  line(250, 200, 280, 200);
  arc(280, 175, 50, 50, HALF_PI+PI, HALF_PI);

  noStroke();

  //Cheveux back
  fill('#BD8A1D');
  quad(180, 300, 320, 300, 320, 450, 180, 450);
  arc(250, 450, 140, 20, TWO_PI, PI);
  fill('#E8AE7B');
  ellipse(198, 330, 20, 20);
  stroke('gray');
  strokeWeight(4);
  line(190, 320, 195, 325);
  noStroke();
  fill('#22590A')
  ellipse(195, 335, 4, 4);
  fill('#694C10');
  quad(200, 350, 300, 350, 300, 408, 200, 408);
  //Face
  fill('#E8AE7B');
  quad(200, 300, 200, 350, 300, 350, 300, 300);
  ellipse(250, 350, 100, 70);
  fill('#E89D7F');
  ellipse(215, 340, 20, 20);
  ellipse(285, 340, 20, 20);
  fill('#2D2E02');
  ellipse(275, 320, 10, 10);
  ellipse(225, 320, 10, 10);
  stroke('#2D2E02');
  strokeWeight(1);
  line(275, 320, 285, 315);
  line(275, 320, 285, 320);
  line(225, 320, 215, 315);
  line(225, 320, 215, 320);
//Cou
  fill('#E8AE7B');
  noStroke();
  quad(240, 380, 260, 380, 260, 395, 240, 395);
  fill('#FF7349');
  arc(250, 410, 110, 30, PI, TWO_PI);
//Chandail
  quad(195, 410, 305, 410, 305, 500, 195, 500);
//Col
  quad(240, 390, 260, 390, 260, 400, 240, 400);
  arc(240, 395, 10, 10, HALF_PI, HALF_PI+PI);
  arc(260, 395, 10, 10, HALF_PI+PI, HALF_PI);
//Chat
  fill('#C74F32');
  quad(230, 430, 270, 430, 270, 440, 230, 440);
  arc(250, 440, 40, 10, TWO_PI, PI);
  arc(250, 430, 40, 10, PI, TWO_PI);
  triangle(230, 430, 235, 420, 242, 430);
  triangle(260, 430, 265, 420, 270, 430);
  stroke('#C74F32');
  line(270, 432, 275, 430);
  line(270, 434, 275, 434);
  line(270, 436, 275, 438);

  line(230, 432, 225, 430);
  line(230, 434, 225, 434);
  line(230, 436, 225, 438);
  fill('#FF7349');
  ellipse(240, 435, 4, 4);
  ellipse(260, 435, 4, 4);

//Bouche
  fill('#FF7465');
  noStroke();
  arc(245, 365, 10, 10, PI, TWO_PI);
  arc(255, 365, 10, 10, PI, TWO_PI);
  fill('#FF8B7C');
  arc(250, 365, 20, 20, TWO_PI, PI);
//Cheveux
  fill('#BD8A1D');
  arc(250, 300, 140, 90, PI, TWO_PI);
  //toupet gauche
  arc(235, 300, 70, 20, TWO_PI, PI);
  //toupet droit
  arc(295, 300, 50, 15, TWO_PI, PI);


}


// draw()
//
// Description of draw()
//Runs over and over again.

function draw() {

}
