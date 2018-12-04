/*****************

Experiment with camera
Véronique Pesant

In the end, I created an abstract painting tool that uses the camera and light.
Using a bright light in a dark room, the player is able to create patterns
on the canvas.
There's a possibility to stop the recording of the camera to create effects in
the painting, or simply because you are satisfied with the result and don't want
to ruin it.

You can also choose bewtween a variety of colors to draw with.

And finally, you can take a screenshot of your work with the camera button and
it's going to download on your computer.

I'm quite proud of my project! Even though there's so many things I could still
add to make it more interesting...but still! Pretty nice to play with :)
******************/

//Variables
var capture;
var capScale = 16;
var arrPixels = [];
var play=true;
var pixBri;

var colors = ['white', 'green', 'blue', 'red', 'yellow', 'orange', 'purple'];
var arrColor = [];

var inUseCol = 'white';

//Images
var imgPlay;
var imgPlayCon;
var imgPause;
var playBtn;
var pauseBtn;
var cameraBtn;

var imgMouse;
var imgMouseCam;
var imgBulb;

var imgCamera;

//Fonts
var mainFont;

//Panels
var titleScreen;

//Game state
var gameStarted=false;


// preload()
//
// Loads the necessary images and font

function preload(){

  imgPlay = loadImage('assets/images/play.png');
  imgPlayCon = loadImage('assets/images/playContour.png');
  imgPause = loadImage('assets/images/pause.png');

  imgMouse = loadImage('assets/images/mouse.png');
  imgMouseCam = loadImage('assets/images/mouseCam.png');
  imgBulb = loadImage('assets/images/bulb.png');

  imgCamera = loadImage('assets/images/camera.png');

  mainFont = loadFont('assets/fonts/Pixellari.ttf');

}


// setup()
//
// Creates the canvas and the main elements to go on it.
function setup() {

  createCanvas(800, 600);
  pixelDensity(1);
  capture = createCapture(VIDEO);
  capture.size(width/capScale,height/capScale);

  //if the game is started, we don't want the background to draw on each
  //frame so we put it in the setup function instead of the draw
  if(gameStarted==true){
      background(0);
  }

  //creating the main buttons
  playBtn = new Button(imgPause, width-35, 35, 30, 30, 'playPause');
  cameraBtn = new Button(imgCamera, 35, 35, 30, 30, 'camera');
  titleScreen = new Panel('Pixel Paint', 'Press ENTER to start painting');

  //a foor loop to fill the array that contains the color palette
  for(var i=1; i<=colors.length; i++){

    arrColor.push(new Color((width/8)*i, height-30, 30, String(colors[i-1])));

  }

}

function draw(){

  //loading the pixels of the webcam
  capture.loadPixels();
  loadPixels();

//verifies that the game is started to draw the "in-game" elements
  if(gameStarted == true){

    // display the color palette previously set up
    for(var i=0; i<arrColor.length; i++){
      arrColor[i].display();
      arrColor[i].handleHover();
    }

    //if play equals true, then the bright
    //pixels detected by the camera will be displayed as paint
    //but if play equals false (the player pressed pause), then
    //the capture stops and the pixels are not painted
    if(play==true){
      for(var y=0; y < capture.height; y++){
        for(var x=0; x < capture.width; x++){
            var index = (capture.width-(x + 1)+y * capture.width)*4;

            //color value
            var red = capture.pixels[index];
            var green = capture.pixels[index+1];
            var blue = capture.pixels[index+2];

            pixBri = (red+green+blue)/3;
            if(y*capScale>75 && y*capScale<height-90 && x*capScale>75 && x*capScale<width-80){
              if(pixBri>200){
                noStroke();
                fill(inUseCol);
                rect(x*capScale, y*capScale, 20, 20);
              }
            }


        }
      }

    }
    //mirroring the camera image because for some reason,
    //the drawing and the actual capture were mirrored.
    push();
    translate(capture.width, 0);
    scale(-1.0,1.0);
    // image(capture, -20, 20);
    pop();

    push();
    rectMode(CENTER);
    noFill();
    //stroke on the area where the player draws
    stroke('white');
    rect(width/2, height/2, 650, 450);
    pop();

    //displaying the play/pause and screenshot
    playBtn.display();
    cameraBtn.display();

  }else{ //if the game is not started, the title screen is displayed
    background(0);
    titleScreen.display();
  }

  //hiding the camera image
  capture.hide();

}

//Function to handle Mouse click event
function mousePressed(){
  for(var i=0; i<arrColor.length; i++){
    arrColor[i].click=false;
    arrColor[i].size=30;
    arrColor[i].strokeCol='black';
    arrColor[i].clicked();
  }

  playBtn.clicked();
  cameraBtn.clicked();
}


//Function to handle Keyboard events
function keyPressed(){

  //When the title screen is displayed,
  //press ENTER to start drawing.
  if(keyCode == ENTER){
    gameStarted=true;
    background(0);

  }
}
