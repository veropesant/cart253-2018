/******************************************************

Game - Chaser
Pippin Barr

A simple game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/

// Track whether the game is over
var gameOver = false;

// Player position, size, velocity
var playerX;
var playerY;
var playerRadius = 25;
var playerVX = 0;
var playerVY = 0;
var playerMaxSpeed = 2;
// Player health
var playerHealth;
var playerMaxHealth = 255;
var playerHealthLoss=0.5;
// Player fill color
var playerFill = 50;

// Prey position, size, velocity
var preyX;
var preyY;
var preyRadius = 25;
var preyVX;
var preyVY;
var preyMaxSpeed = 4;
var txPrey;
var tyPrey;
// Prey health
var preyHealth;
var preyMaxHealth = 100;
// Prey fill color
var preyFill = 200;


//Boost position, size, velocity
var boostX;
var boostY;
var boostRadius = 10;
var boostVX;
var boostVY;
var boostMaxSpeed = 4;
var boostHealth;
var boostMaxHealth=100;
var boostFill=0;
var txBoost;
var tyBoost;

//Projectile size, speed, health
var projectileX;
var projectileY;
var projectileVX;
var projectileVY;
var projectileSpeed;
var projectileMaxSpeed = 4;
var projectileFill = 0;
var projectileNb = 3;
var projectileRadius = 5;
var projectileIsAlive=false;

//Obstacle variables
var obstacleX;
var obstacleY;
var obstacleVX;
var obstacleVY;
var obstacleSpeed;
var obstacleMaxSpeed= 2;
var obstacleWidth;
var obstacleHeight;
var obstacleActivated=true;

// Amount of health obtained per frame of "eating" the prey
var eatHealth = 10;
// Number of prey eaten during the game
var preyEaten = 0;

//Text variables
var smallText = 12;
var mediumText = 24;
var bigText = 36;
var base = 'Arial';

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500,500);
  txPrey = random(0,1000);
  tyPrey = random(0,1000);
  txBoost = random(0,1000);
  tyBoost = random(0,1000);

  noStroke();

  setupPrey();
  setupPlayer();
  setupText();
  setupBoost();
  setupProjectile();
  setupObstacle();

}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width/5;
  preyY = height/2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}

//setupBoost for later
//
//Initialises boost VX,  position, etc. for when I need to display it
function setupBoost(){
  boostX = random(0, width);
  boostY = random(0, height);
  boostVX = -boostMaxSpeed;
  boostVY = boostMaxSpeed;
  boostHealth = boostMaxHealth;
}

//setup projectile for later
//
//Initialises projectile VX,  position, etc. for when I need to display it
function setupProjectile(){
  projectileX = -5;
  projectileY = -5;
  projectileVX = 0;
  projectileVY = 0;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  playerHealth = playerMaxHealth;
}
function setupText(){
  textSize(smallText);
  textFont(base);
}
function setupObstacle(){
  obstacleX = 0;
  obstacleY = 0;
  obstacleVX = obstacleMaxSpeed;
  obstacleVY = 0;
  obstacleWidth = 5;
  obstacleHeight = height;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  background(100,100,200);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();
    checkContactPlayerObstacle();
    checkContactProjectileObstacle();

    drawPrey();
    drawPlayer();
    drawProjectile();
    drawInfoText();
  }
  else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  if(keyIsDown(SHIFT)){
    playerMaxSpeed=5;
    playerHealthLoss=2;
  }else{
    playerMaxSpeed=2;
    playerHealthLoss=0.5;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }
  else {
    playerVY = 0;
  }

  //Sprint in the direction pressed, for as long as the key id pressed
}

//Enter button restarts the game only if it's over
function keyPressed(){
  if(keyCode==ENTER){
    if(gameOver==true){
      restartGame();
    }
  }
  if(key==' '){
    //If you press space while pressing an arrow,
    //a projectile will be thrown in the direction of
    //the arrow you're pressing
    projectileX = playerX;
    projectileY = playerY;
    projectileIsAlive=true;
    if(keyIsDown(LEFT_ARROW)){

      projectileVX = -projectileMaxSpeed;
      projectileVY = 0;

    }else if(keyIsDown(UP_ARROW)){

      projectileVY = -projectileMaxSpeed;
      projectileVX = 0;

    }else if (keyIsDown(RIGHT_ARROW)) {

      projectileVX = projectileMaxSpeed;
      projectileVY = 0;

    }else if (keyIsDown(DOWN_ARROW)) {

      projectileVY = projectileMaxSpeed;
      projectileVX = 0;

    }
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX += playerVX;
  playerY += playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    playerX += width;
  }
  else if (playerX > width) {
    playerX -= width;
  }

  if (playerY < 0) {
    playerY += height;
  }
  else if (playerY > height) {
    playerY -= height;
  }
}

//Make the temporary boost move
function moveBoost(){
  // Change the prey's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the prey
  // will change direction on 5% of frames
  boostVX = map(noise(txBoost), 0, 1, -boostMaxSpeed, boostMaxSpeed);
  boostVY = map(noise(tyBoost), 0, 1, -boostMaxSpeed, boostMaxSpeed);
  boostX += boostVX;
  boostY += boostVY;

  // Screen wrapping
  if (boostX < 0) {
    boostX += width;
  }
  else if (boostX > width) {
    boostX -= width;
  }

  if (boostY < 0) {
    boostY += height;
  }
  else if (boostY > height) {
    boostY -= height;
  }
  tyBoost+=0.01;
  txBoost+=0.01;
}

// updateHealth()
//
// Reduce the player's health (every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health, constrain to reasonable range
  playerHealth = constrain(playerHealth - playerHealthLoss,0,playerMaxHealth);
  // Check if the player is dead
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  var d = dist(playerX,playerY,preyX,preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = constrain(playerHealth + eatHealth,0,playerMaxHealth);
    // Reduce the prey health
    preyHealth = constrain(preyHealth - eatHealth,0,preyMaxHealth);

    // Check if the prey died
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0,width);
      preyY = random(0,height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten++;
    }
  }
  if(preyEaten>=2){
    drawBoost();
    drawObstacle();
  }
}

//Check boost
//
//Checks if the player has eaten the boost
function checkBoost(){
  var dBoost = dist(playerX, playerY, boostX, boostY);
  if(dBoost < playerRadius + boostRadius){
    playerHealth = playerMaxHealth;
    boostHealth = 0;
  }
}

//Check Contact Player obstacle
//
//Checks if the player touches the bar, then loses health
function checkContactPlayerObstacle(){

  if(obstacleVX!=0){
    if(playerX-obstacleX < 1){
      if(obstacleActivated == true){
        console.log('obstacleActivated '+ obstacleActivated);
        console.log('OUCH');
        playerHealth=0;
        obstacleActivated = false;
      }
    }
  }
  if(obstacleVY!=0){
    if(playerY-obstacleY < 1){
      if(obstacleActivated == true){
        console.log('OUCH');
        playerHealth=0;
        obstacleActivated = false;
      }
    }
  }

}

//Check contact between projectile and obstacle
//
//If the projectile hits the bar, the bar is
//deactivated until it reaches the end of the canvas
function checkContactProjectileObstacle(){
  if(projectileIsAlive==true){
    if(obstacleVX!=0){
      if(projectileX-obstacleX<1){
        console.log('Projectile'+projectileX);
        console.log('PEW');
        console.log('obstacleActivated '+ obstacleActivated);
        obstacleActivated=false;
      }
    }
    if(obstacleVY!=0){
      if(projectileY-obstacleY < 1){
        obstacleActivated = false;
      }
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Change the prey's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the prey
  // will change direction on 5% of frames
  preyVX = map(noise(txPrey), 0, 1, -preyMaxSpeed, preyMaxSpeed);
  preyVY = map(noise(tyPrey), 0, 1, -preyMaxSpeed, preyMaxSpeed);
  preyX += preyVX;
  preyY += preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX += width;
  }
  else if (preyX > width) {
    preyX -= width;
  }

  if (preyY < 0) {
    preyY += height;
  }
  else if (preyY > height) {
    preyY -= height;
  }
  tyPrey+=0.01;
  txPrey+=0.01;
}

function moveProjectile(){
  projectileX+=projectileVX;
  projectileY+=projectileVY;
  console.log(projectileX);
}

function moveObstacle(){
  obstacleX+=obstacleVX;
  obstacleY+=obstacleVY;
  if(obstacleX>width){
    obstacleX= -5;
    obstacleVX=0;
    obstacleY= 0;
    setTimeout(function(){
      obstacleX= 0;
      obstacleActivated = true;
      obstacleWidth = width;
      obstacleHeight = 5;
      obstacleVY = obstacleMaxSpeed;
    }, 5000)

  }
  if(obstacleY > height) {
    obstacleVY=0;
    obstacleX = 0;
    obstacleY = -5;
    setTimeout(function(){
      obstacleY = 0;
      obstacleActivated = true;
      obstacleHeight = height;
      obstacleWidth = 5;
      obstacleVX = obstacleMaxSpeed;
    }, 5000)
  }
}

//Draws the text that displays the game's info such as number of prey eaten
function drawInfoText(){
  fill(0);
  textAlign(LEFT);
  text('Prey eaten: '+preyEaten, 30, 30);
}
// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  noStroke();
  fill(preyFill,preyHealth);
  ellipse(preyX,preyY,preyRadius*2);
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha based on health
function drawPlayer() {
  noStroke();
  fill(playerFill,playerHealth);
  ellipse(playerX,playerY,playerRadius*2);
}

function drawBoost(){
  if(boostHealth>0){
    moveBoost();
    checkBoost();
    ellipse(boostX, boostY, boostRadius*2);
  }

}
//Draws a projectile when the player presses the space bar
function drawProjectile(){
  moveProjectile();
  fill(0);
  ellipse(projectileX, projectileY, projectileRadius*2);
}

//Draws an obstacle that crosses the canvas
function drawObstacle(){
  moveObstacle();
  rectMode(CORNER);
  fill(0);
  rect(obstacleX, obstacleY, obstacleWidth, obstacleHeight);
}




// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  textSize(32);
  textAlign(CENTER,CENTER);
  fill(0);
  var gameOverText = "GAME OVER\n";
  gameOverText += "You ate " + preyEaten + " prey\n";
  gameOverText += "before you died.\n";
  gameOverText += "Press ENTER to play again.";
  text(gameOverText,width/2,height/2);
}

function restartGame(){
  console.log('Restart');
  gameOver=false;
  preyEaten=0;
  playerHealth=playerMaxHealth;
  preyHealth=preyMaxHealth;
  boostHealth=boostMaxHealth;
  obstacleVX = 0;
  obstacleVY = 0;
  obstacleActivated=true;
  projectileIsAlive=false;

  setupPrey();
  setupPlayer();
  setupText();
  setupBoost();
  setupProjectile();
  setupObstacle();
}
