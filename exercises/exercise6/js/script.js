// Broken Basic OO Pong
// by Pippin Barr
//
// A broken primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
var ball; //fixed : corrected the spelling mistake in the word ball
var leftPaddle;
var rightPaddle;

// setup()
//
// Creates the ball and paddles
function setup() {

  createCanvas(640,480); //fixed : corrected the spelling mistake in the word createCanvas
  noStroke();
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,10,5); //fixed : reduced the velocities and speed to make the ball go slower
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-10,height/2,10,60,10,UP_ARROW,DOWN_ARROW);//fixed : changed the height attribute of the right paddle from 600 to 60
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,10,60,10,87,83); //fixed: closed the parentheses at the end and switch the W and S codes
} //fixed : closed the brackets of setup

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update(); //fixed : added the parentheses after update
  leftPaddle.update();
  rightPaddle.update();

  if (ball.isOffScreen() == true){ // fixed : corrected function isOffTheScreen for isOffScreen
    ball.reset();//fixed : added the ball. before the reset()
  }//fixed : closed the brackets of the if

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);
  push();
  fill(255); // fixed : added a fill for the ball and the handles
  pop();
  ball.display();
  leftPaddle.display();
  rightPaddle.display(); //fixed : closed the parentheses at the end
}
