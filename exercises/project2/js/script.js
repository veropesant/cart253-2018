// Basic OO Pong
// by Pippin Barr
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;
var rightPaddleScore=0;
var leftPaddleScore=0;
var gameOver=true;
var maxScore=5;
var startPanel;
var endPanel;
var startPanelActive = false;
var endPanelActive = false;
var winner = '';

// setup()
//
// Creates the ball and paddles
function setup() {
    createCanvas(640,480);
    // Create a ball
    ball = new Ball(width/2,height/2,5,5,10,5);
    // Create the right paddle with UP and DOWN as controls
    rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW);
    // Create the left paddle with W and S as controls
    // Keycodes 83 and 87 are W and S respectively
    leftPaddle = new Paddle(0,height/2,10,60,10,83,87);

    startPanel = new Panel('start','Press ENTER to start', 'PONG GAME');
    endPanel = new Panel('end','Press ENTER to restart', 'GAME OVER');
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
    background(0);
    if(gameOver == false){
      console.log('go');
        leftPaddle.handleInput();
        rightPaddle.handleInput();
        handleEndGame();

        ball.update();
        leftPaddle.update();
        rightPaddle.update();

        if (ball.isOffScreen()) {
            ball.reset();
        }

        ball.handleCollision(leftPaddle);
        ball.handleCollision(rightPaddle);

        ball.display();
        leftPaddle.display();
        rightPaddle.display();

        text(leftPaddleScore, 50, 20);
        text(rightPaddleScore, width-50, 20);
    }
    else if(endPanelActive==true){
        endPanel.display();
    }else{
        startPanel.display();
        startPanelActive = true;
    }

}

//< >
function handleEndGame(){
    if(leftPaddleScore>=maxScore || rightPaddleScore>=maxScore){
        gameOver=true;
        if(leftPaddleScore>rightPaddleScore){
            winner = 'Left';
            endGame();
        }else{
            winner = 'Right';
            endGame();
        }
    }
}

function endGame(){
    ball.vx = 0;
    ball.vy = 0;
    leftPaddle.speed = 0;
    rightPaddle.speed = 0;
    endPanelActive = true;
}

function reset(){
    ball.vx=5;
    ball.vy=5;
    leftPaddle.speed = 10;
    rightPaddle.speed = 10;
    leftPaddleScore=0;
    rightPaddleScore=0;
    gameOver = false;
    endPanelActive = false;
    console.log('restart');
    console.log(endPanelActive);

}

function keyPressed(){
    if(startPanelActive == true){
        if(keyCode===ENTER){
          console.log('start');
          gameOver=false;
          startPanelActive=false;
          startPanel=null;
        }
    }else if(endPanelActive == true){
        if(keyCode===ENTER){
          reset();
        }
    }
}