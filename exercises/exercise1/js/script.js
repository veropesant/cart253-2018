 // Pippin Barr
//
// Starter code for exercise 1.
// It moves two pictures around on the canvas.
// One moves linearly down the screen.
// One moves toward the mouse cursor.


// The image of a cappy face
var cappyImage;
// The current position of the cappy face
var cappyImageX;
var cappyImageY;

// The image of a mario face
var marioImage;
// The current position of the mario face
var marioImageX;
var marioImageY;

// The transparent image of "felt" that wipes down the canvas
var feltTextureImage;
// The current position of the transparent image of "felt"
var feltTextureImageX;
var feltTextureImageY;

// The jumping yoshu image tht goes across the canvas
var yoshiImage;
// The current position of the yoshi image
var yoshiImageX;
var yoshiImageY;


// preload()
//
// Load the two images we're using before the program starts

function preload() {
  cappyImage = loadImage("assets/images/cappy.png");
  feltTextureImage = loadImage("assets/images/green-grass-texture.png");
  yoshiImage = loadImage("assets/images/Yoshi.png");
  marioImage = loadImage("assets/images/mario.png");
}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the cappy image at the centre of the canvas
  cappyImageX = width/2;
  cappyImageY = height/2;
  // Start the Mario image at the centre of the canvas
  marioImageX = width/2;
  marioImageY = height/2;

  // Start the felt image perfectly off screen above the canvas
  feltTextureImageX = width/2;
  feltTextureImageY = 0 - feltTextureImage.height/2;

  // Start the felt image perfectly off screen on the left of the canvas
  yoshiImageX = 0-yoshiImage.width;
  yoshiImageY = 0+(yoshiImage.height/2);

  // We'll use imageMode CENTER for this script
  imageMode(CENTER);
}


// draw()
//
// Moves the felt image linearly
// Moves the cappy face toward the current mouse location

function draw() {

  // Move the felt image down by increasing its y position
  feltTextureImageY += 1;
  if(yoshiImageX>640+yoshiImage.width){
    console.log(yoshiImageY);
    yoshiImageX=0-yoshiImage.width;
    yoshiImageY=yoshiImageY+100;
  }
  else {
    yoshiImageX += 1;
  }


  // Display the felt image and the Yoshi image
  image(feltTextureImage,feltTextureImageX,feltTextureImageY);
  image(yoshiImage,yoshiImageX,yoshiImageY);

  // Move the cappy by moving it 1/10th of its current distance from the mouse

  // Calculate the distance in X and in Y
  var xDistanceCappy = mouseX - cappyImageX;
  var yDistanceCappy = mouseY - cappyImageY;
  var xDistanceMario = mouseX - marioImageX;
  var yDistanceMario = mouseY - marioImageY;
  // Add 1/10th of the x and y distance to the cappy's current (x,y) location
  marioImageX = marioImageX + xDistanceMario/40;
  marioImageY = marioImageY + yDistanceMario/40;
  // Add 1/10th of the x and y distance to the cappy's current (x,y) location
  cappyImageX = cappyImageX + xDistanceCappy/10;
  cappyImageY = cappyImageY + yDistanceCappy/10;


  // Display the cappy image
  image(marioImage,marioImageX,marioImageY);
  image(cappyImage,cappyImageX,cappyImageY);

}
