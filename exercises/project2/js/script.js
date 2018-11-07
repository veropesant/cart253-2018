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

//base variables
var gameOver=true;
var maxScore=20;
var winner = '';
var maxHealth=3;
var maxHeight=100;
var yellow = '#FFBA21';
var redColor = '#FE424D';
var bgBlue = '#8DD6F3';
var scoreBlue = '#9BDDF3';
var leftBlue = '#022D41';
var rightBlue = '#1AA6B7';

//Panels variables
var startPanel;
var endPanel;
var startPanelActive = false;
var endPanelActive = false;

//Projectiles variables
var leftProjectile = [];
var rightProjectile = [];
var rightProjectileActive = false;
var leftProjectileActive = false;
var nbRightProjectile = 10;
var nbLeftProjectile = 10;

//update text for health variables
var updateText = '';
var updateTextX = 0;
var updateTextY = 0;

//sounds variables
var popSound;
var dramaticSound;
var dramaticSoundActive=true;
var pewSound;
var boostSound;

//health variables
var healthImage;
var healthRightPositionX=520;
var healthRightPositionY=30;
var healthLeftPositionX= 90;
var healthLeftPositionY=30;


//boost variables
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
    rightPaddle = new Paddle(width-10,height/2-50,10,maxHeight,10,DOWN_ARROW,UP_ARROW,37, rightBlue, maxHealth, 'right');
    // Create the left paddle with W and S as controls and D as shoot key
    // Keycodes 83 and 87 are W and S respectively
    leftPaddle = new Paddle(0,height/2-50,10,maxHeight,10,83,87,68, leftBlue, maxHealth, 'left');

    startPanel = new Panel('start','Press','ENTER','to start', 'PONG GAME');
    endPanel = new Panel('end','Press','ENTER','to restart', 'GAME OVER');
    boost = new Boost(width/2, height/2, 7, 7, 30);

}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
    background(bgBlue);
    textFont('Righteous');

    //check is the game is started
    if(gameOver == false){
        //displays the scores in the background
        push();
        fill(scoreBlue);
        textFont('Monoton');
        textSize(200);
        text(leftPaddle.score, width/4, height/1.55);
        text(rightPaddle.score, width/1.37, height/1.55);
        rect(width/2, 0, 5, height);
        pop();

        //calls the base functions to make the different elements work
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

        //checks if both of the paddles lost height before activating the boost
        if(leftPaddle.h<100 && rightPaddle.h<100){
          boost.active=true;
        }
        //when boost activated, calls its base functions
        if(boost.active==true){
          boostSound.play();
          boost.display();
          boost.update();
          boost.handleCollision(rightPaddle);
          boost.handleCollision(leftPaddle);
        }
        else{//if the boost is not active, don't play the sound of the boost and set it back to the beginning
          boostSound.pause();
          boostSound.currentTime=0;
        }

        //goes through the array of projectile created to make
        //them appaear on the screen and handle its collision
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
        //displays the right amount of heart on the screen
        //depending on each paddles' health
        for(var i=0; i<=leftPaddle.health-1; i++){
          image(healthImage, healthLeftPositionX+i*50, healthLeftPositionY);
        }
        for(var i=0; i<=rightPaddle.health-1; i++){
          image(healthImage, healthRightPositionX-i*50, healthRightPositionY);
        }

    }
    //if the game has ended, dislpay the Start screen or Game Over screen
    //depending on which one is activated
    //to allow the player to start the game
    else if(endPanelActive==true){
        endPanel.display();
    }else{
        startPanel.display();
        startPanelActive = true;
    }

    //If more than 4 points have been scored in total,
    //the mean ball appears her sound plays
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
      //make the dramatic sound deactivate after 2 seconds so
      //that it doesn't replay indefinitely
      setTimeout(function(){
        dramaticSoundActive=false;
      },2000);

    }

}

//checks if any of the players reached the max score
//if yes, the game is over
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
//stops everything on the screen so that the game doesn't
//continue in the background
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
//set all the necessary proporties back to their
//initial state to reset the game
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

//handles the different keyboard events
function keyPressed(){
  //when the start panel is active, ENTER starts the game
    if(startPanelActive == true){
        if(keyCode===ENTER){
          console.log('start');
          gameOver=false;
          startPanelActive=false;
          startPanel=null;
        }
    //when the end panel is active, ENTER resets the game
    }else if(endPanelActive == true){
        if(keyCode===ENTER){
          reset();
        }
    }
    //if the game has started, those different keys are active
    if(gameOver==false){
      //if the player on the right presses the arrow left, a projectile is created
      if(keyCode===rightPaddle.shootKey){
        if(nbRightProjectile>0){
          rightProjectileActive=true;
          pewSound.currentTime=0;
          //pushing the projectile in the left projectile array and plays the shoot sound
          pewSound.play();
          rightProjectile.push(new Projectile(rightPaddle.x-10, rightPaddle.y+rightPaddle.h/2-5,10,-5,0,5,rightPaddle.color,true));
          pewSound.play();
          nbRightProjectile--;
        }


      }
      //if the player on the left presses the D, a projectile is created
      else if(keyCode===leftPaddle.shootKey){
        if(nbLeftProjectile>0){
          leftProjectileActive=true;
          pewSound.currentTime=0;
          //pushing the projectile in the right projectile array and plays the shoot sound
          pewSound.play();
          leftProjectile.push(new Projectile(leftPaddle.x+10, leftPaddle.y+leftPaddle.h/2-5,10,5,0,5,leftPaddle.color,true));
          nbLeftProjectile--;
        }

      }
    }
}
