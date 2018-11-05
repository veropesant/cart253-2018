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
var meanBall;
var leftPaddle;
var rightPaddle;
var rightPaddleScore=0;
var leftPaddleScore=0;
var gameOver=true;
var maxScore=10;
var startPanel;
var endPanel;
var startPanelActive = false;
var endPanelActive = false;
var winner = '';
var leftProjectile = [];
var rightProjectile = [];
var rightProjectileActive = false;
var leftProjectileActive = false;
var nbRightProjectile = 5;
var nbLeftProjectile = 5;

// setup()
//
// Creates the ball and paddles
function setup() {
    createCanvas(640,480);
    // Create a ball
    ball = new Ball(width/2,height/2,5,5,10,5);

    //Create a MeanBall
    meanBall = new MeanBall(width/2, height/2, 5, 5, 15, 5, 'red');

    // Create the right paddle with UP and DOWN as controls and left arrow as shoot key
    rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW,37,'blue');
    // Create the left paddle with W and S as controls and D as shoot key
    // Keycodes 83 and 87 are W and S respectively
    leftPaddle = new Paddle(0,height/2,10,60,10,83,87,68,'green');

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
        if(rightProjectileActive==true){
          for(var i=0; i<rightProjectile.length; i++){
            rightProjectile[i].display();
            rightProjectile[i].update();
          }
        }
        if(leftProjectileActive==true){
          for(var i=0; i<leftProjectile.length; i++){
            leftProjectile[i].display();
            leftProjectile[i].update();
          }
        }


        text(leftPaddleScore, 50, 20);
        text(rightPaddleScore, width-50, 20);
    }
    else if(endPanelActive==true){
        endPanel.display();
    }else{
        startPanel.display();
        startPanelActive = true;
    }

    //If more than 4 points have been scored in total, the mean ball appears
    if((leftPaddleScore+rightPaddleScore)>=2){
      meanBall.display();
      meanBall.update();
      meanBall.handleCollision(leftPaddle);
      meanBall.handleCollision(rightPaddle);
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
    leftPaddle.w=0;
    leftPaddle.h=0;
    rightPaddle.w=0;
    rightPaddle.h=0;
    meanBall.size=0;
    meanBall.vx=0;
    meanBall.vy=0;
    endPanelActive = true;
}

function reset(){
  //reset ball
    ball.vx=5;
    ball.vy=5;

    //reset the paddles
    leftPaddle.speed = 10;
    rightPaddle.speed = 10;
    leftPaddle.h=60;
    leftPaddle.w=10;
    rightPaddle.h=60;
    rightPaddle.w=10;
    leftPaddle.y=height/2;
    rightPaddle.y=height/2;

    //reset mean ball
    meanBall.size = 15;
    meanBall.vx = 5;
    meanBall.vy = 5;
    meanBall.x = width/2;
    meanBall.y = height/2;

    //reset projectile arrays and origin number
    rightProjectile=[];
    leftProjectile=[];
    nbRightProjectile=5;
    nbLeftProjectile=5;

    //reset score
    leftPaddleScore=0;
    rightPaddleScore=0;

    //set the game state and endpanel state to false
    gameOver = false;
    endPanelActive = false;

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

    if(gameOver==false){
      if(keyCode===rightPaddle.shootKey){
        if(nbRightProjectile>0){
          rightProjectileActive=true;
          rightProjectile.push(new Projectile(rightPaddle.x, rightPaddle.y+rightPaddle.h/2-5,10,-5,0,5,rightPaddle.color));
          nbRightProjectile--;
        }


      }
      else if(keyCode===leftPaddle.shootKey){
        if(nbLeftProjectile>0){
          leftProjectileActive=true;
          leftProjectile.push(new Projectile(leftPaddle.x, leftPaddle.y+leftPaddle.h/2-5,10,5,0,5,leftPaddle.color));
          nbLeftProjectile--;
        }

      }
    }
}
