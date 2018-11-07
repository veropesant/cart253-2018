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

//base
var gameOver=true;
var maxScore=20;
var winner = '';
var maxHealth=3;

//Panels
var startPanel;
var endPanel;
var startPanelActive = false;
var endPanelActive = false;

//Projectiles
var leftProjectile = [];
var rightProjectile = [];
var rightProjectileActive = false;
var leftProjectileActive = false;
var nbRightProjectile = 10;
var nbLeftProjectile = 10;

//update text for health
var updateText = '';
var updateTextX = 0;
var updateTextY = 0;

//sounds
var popSound;
var dramaticSound;
var dramaticSoundActive=true;
var pewSound;
var boostSound;

var healthImage;
var healthRightPositionX=520;
var healthRightPositionY=30;
var healthLeftPositionX= 90;
var healthLeftPositionY=30;

var boost;

//preload()
//
//Preload the sounds and images needed in the game;
function preload(){
  //preload the sounds and music
  popSound = new Audio('assets/sounds/pop.mp3');
  dramaticSound = new Audio('assets/sounds/dun_dun.mp3');
  pewSound = new Audio('assets/sounds/pew.mp3');
  boostSound = new Audio('assets/sounds/star.mp3');
  healthImage = loadImage('assets/images/health.png');
}

// setup()
//
// Creates the ball and paddles
function setup() {

    createCanvas(640,480);
    // Create a ball
    ball = new Ball(width/2,height/2,5,5,15,5);

    //Create a MeanBall
    meanBall = new MeanBall(width/2, height/2, 5, 5, 20, 5, '#FE424D');

    // Create the right paddle with UP and DOWN as controls and left arrow as shoot key
    rightPaddle = new Paddle(width-10,height/2-50,10,100,10,DOWN_ARROW,UP_ARROW,37,'#1AA6B7', 3, 'right');
    // Create the left paddle with W and S as controls and D as shoot key
    // Keycodes 83 and 87 are W and S respectively
    leftPaddle = new Paddle(0,height/2-50,10,100,10,83,87,68,'#022D41', 3, 'left');

    startPanel = new Panel('start','Press','ENTER','to start', 'PONG GAME');
    endPanel = new Panel('end','Press','ENTER','to restart', 'GAME OVER');
    boost = new Boost(width/2, height/2, 7, 7, 30);

}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
    background('#8DD6F3');
    textFont('Righteous');

    if(gameOver == false){
        push();
        fill('#9BDDF3');
        textFont('Monoton');
        textSize(200);
        text(leftPaddle.score, width/4, height/1.55);
        text(rightPaddle.score, width/1.37, height/1.55);
        rect(width/2, 0, 5, height);
        pop();

        leftPaddle.handleHealth('left');
        rightPaddle.handleHealth('right');

        leftPaddle.handleInput();
        rightPaddle.handleInput();
        handleEndGame();

        ball.update();
        leftPaddle.update();
        rightPaddle.update();

        if (ball.isOffScreen()) {
            ball.reset();
        }

        ball.handleCollision(leftPaddle, 'left');
        ball.handleCollision(rightPaddle, 'right');

        ball.display();
        leftPaddle.display();
        rightPaddle.display();
        if(leftPaddle.h<100 && rightPaddle.h<100){
          boost.active=true;
        }
        if(boost.active==true){
          boostSound.play();
          boost.display();
          boost.update();
          boost.handleCollision(rightPaddle);
          boost.handleCollision(leftPaddle);
        }
        else{
          boostSound.pause();
          boostSound.currentTime=0;
        }


        if(rightProjectileActive==true){
          for(var i=0; i<rightProjectile.length; i++){
            rightProjectile[i].display();
            rightProjectile[i].update();
            if(rightProjectile[i].isHurting===true){
              rightProjectile[i].handleCollision(leftPaddle, rightPaddle);
            }
          }
        }
        if(leftProjectileActive==true){
          for(var i=0; i<leftProjectile.length; i++){
            leftProjectile[i].display();
            leftProjectile[i].update();
            if(leftProjectile[i].isHurting===true){
              leftProjectile[i].handleCollision(rightPaddle, leftPaddle);
            }

          }
        }
        push();
        textSize(40);
        text(updateText, updateTextX, updateTextY);
        pop();
        for(var i=0; i<=leftPaddle.health-1; i++){
          image(healthImage, healthLeftPositionX+i*50, healthLeftPositionY);
        }
        for(var i=0; i<=rightPaddle.health-1; i++){
          image(healthImage, healthRightPositionX-i*50, healthRightPositionY);
        }

    }
    else if(endPanelActive==true){
        endPanel.display();
    }else{
        startPanel.display();
        startPanelActive = true;
    }

    //If more than 4 points have been scored in total, the mean ball appears
    if((leftPaddle.score+rightPaddle.score)>=2){

      if(meanBall.active==true){
        if(dramaticSoundActive==true){
          dramaticSound.play();
        }
        meanBall.display();
        meanBall.update();
        meanBall.handleCollision(leftPaddle, 'right', 'left');
        meanBall.handleCollision(rightPaddle, 'left', 'right');
      }
      setTimeout(function(){
        dramaticSoundActive=false;
      },2000);

    }

}

//< >
function handleEndGame(){
    if(leftPaddle.score>=maxScore || rightPaddle.score>=maxScore){
        gameOver=true;
        if(leftPaddle.score>rightPaddle.score){
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
    meanBall.active=false;
    dramaticSoundActive=false;
    endPanelActive = true;
    boost.active=false;
    boostSound.currentTime=0;
    boostSound.pause();

}

function reset(){
  //reset ball
    ball.vx=5;
    ball.vy=5;

    //reset the paddles
    leftPaddle.speed = 10;
    rightPaddle.speed = 10;
    leftPaddle.h=100;
    leftPaddle.w=10;
    rightPaddle.h=100;
    rightPaddle.w=10;
    leftPaddle.y=height/2-50;
    rightPaddle.y=height/2-50;
    leftPaddle.health=3;
    rightPaddle.health=3;

    //reset mean ball
    meanBall.size = 20;
    meanBall.vx = 5;
    meanBall.vy = 5;
    meanBall.x = width/2;
    meanBall.y = height/2;
    meanBall.active=true;

    //reset projectile arrays and origin number
    rightProjectile=[];
    leftProjectile=[];
    nbRightProjectile=5;
    nbLeftProjectile=5;

    //reset boost
    boost.x=width/2;
    boost.y=width/2;
    boost.active=false;

    //reset score
    leftPaddle.score=0;
    rightPaddle.score=0;

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
          pewSound.currentTime=0;
          pewSound.play();
          rightProjectile.push(new Projectile(rightPaddle.x-10, rightPaddle.y+rightPaddle.h/2-5,10,-5,0,5,rightPaddle.color,true));
          pewSound.play();
          nbRightProjectile--;
        }


      }
      else if(keyCode===leftPaddle.shootKey){
        if(nbLeftProjectile>0){
          leftProjectileActive=true;
          pewSound.currentTime=0;
          pewSound.play();
          leftProjectile.push(new Projectile(leftPaddle.x+10, leftPaddle.y+leftPaddle.h/2-5,10,5,0,5,leftPaddle.color,true));
          nbLeftProjectile--;
        }

      }
    }
}
