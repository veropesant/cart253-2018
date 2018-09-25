/*********************************************************

Exercise 2 - The Artful Dodger
Pippin Barr

Starter code for exercise 2.

*********************************************************/
//Compteur
var cpt=0;

//disabled state
var disabled = false;
var starDisabled = false;
var dodgeDisabled = false;

//life
var life=3;

//Variables used for the timer
var timeDelay = 5000;
var lastTime;

// The position and size of our avatar circle
var avatarX;
var avatarY;
var avatarSize = 50;

// The speed and velocity of our avatar circle
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;

// The position and size of the enemy meteor
var enemyX;
var enemyY;
var enemySize = 50;
// How much bigger the enemy circle gets with each successful dodge
var enemySizeIncrease = 10;

// The speed and velocity of our enemy meteor
var enemySpeed = 5;
var enemyVX = 5;
// How much bigger the enemy circle gets with each successful dodge
var enemySpeedIncrease = 0.5;

//The position of the star
var starX;
var starY;
var starVX;
var starSize = 40;

// How many dodges the player has made
var dodges = 0;

//Images
var bgImage;

// setup()
//
function preload() {
  bgImage = loadImage("assets/images/space-bg.jpg");
  meteorImage = loadImage("assets/images/meteor.png");
  spaceShipImage = loadImage("assets/images/spaceShip.png");
  starImage = loadImage("assets/images/etoile.png");
}
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(500,500);
  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  //Put the star at the far left of the canvas
  starX = 0;
  starY = random(0, height);

  // No stroke so it looks cleaner
  noStroke();
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // A pink background
  background(bgImage);
  textFont('Audiowide');
  textSize(24);
  fill(255, 255, 255);
  //Text to indicate number of DODGES
  if(dodges<=1){
    text(dodges + ' DODGE', 300, 30);
  }else{
    text(dodges + ' DODGES', 300, 30);
  }
  text('LIFE: '+ life , 30, 30);


  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed (which increases)
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radius


  console.log(disabled);
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    if(!disabled){

      // Tell the player they lost
      //console.log("damage");
      life -= 1;
      disabled = true;
      dodgeDisabled = true;
      // Reset the enemy's position
      if(life < 1){
        text("YOU LOSE!", width/2, height/2);
        reset();
      }
    }
  }
  else {
    disabled = false;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    text("YOU LOSE!", 20, 20);

    reset();

  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    if(!dodgeDisabled){
      dodges += 1;
    }

    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
  // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
    // Increase the enemy's speed and size to make the game harder
    enemySpeed = enemySpeed + enemySpeedIncrease;
    if(enemySize<=150){
      enemySize = enemySize + enemySizeIncrease;
    }
    avatarSize = random(10, 100);
    avatarSpeed = random(10, 20);
    console.log('enemySize: '+ enemySize);
    dodgeDisabled=false;

  }

  if(dodges==5 || dodges==10 || dodges==15){
    starSpeed = 10;
    starVX = 5;
    starX = starX + starVX;
    if(starX > width){
      starX=0;
      starSpeed=0;
    }
  }
  else{
    starX=0-starSize;
    starSpeed=0;
    if(dodges>=20){
      text('YOU WIN!', width/2, height/2);
      reset();
    }
  }

  if (dist(starX,starY,avatarX,avatarY) < starSize/2 + avatarSize/2){
    if(!starDisabled){
      life += 1;
      starDisabled = true;
    }
  }
  else{
    starDisabled = false;
  }

  // Display the current number of successful in the console
  //console.log(dodges);

  // Draw the player as a circle
  image(spaceShipImage,avatarX,avatarY,avatarSize,avatarSize);

  // Draw the enemy as a meteor
  image(meteorImage,enemyX,enemyY,enemySize,enemySize);

  // Draw the bonus star
  image(starImage, starX, starY, starSize, starSize);
}

function reset(){

  enemyX = 0;
  enemyY = random(0,height);
  enemySize = 50;
  enemySpeed = 5;

  avatarX = width/2;
  avatarY = height/2;
  avatarSize= random(100, 150);
  dodges = 0;
  life=3;

}
