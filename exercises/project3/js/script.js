/*****************

Experiment with camera
Véronique Pesant

Eventually my goal is to create a drawing tool using the webcam.
It would preferably be used in front of a white background to make the
colors pop out more.
I would like to scan the pixels on the webcam and spot for example which
pixels are bright red, and then track these pixels and create a line as
the user moves the object around, using this same color,
allowing the user to draw.

In this second experiment, I explore the pixel array and what I can do with it,
based on a video by The Coding Train. Eventually, I want to use the pixel array to track
bright color pixels on the canvas and use their rgb value to draw.
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


// setup()
//
// Description of setup

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

function setup() {

  createCanvas(800, 600);
  pixelDensity(1);
  capture = createCapture(VIDEO);
  capture.size(width/capScale,height/capScale);
  if(gameStarted==true){
      background(0);
  }


  playBtn = new Button(imgPause, width-35, 35, 30, 30, 'playPause');
  cameraBtn = new Button(imgCamera, 35, 35, 30, 30, 'camera');
  titleScreen = new Panel('Pixel Paint', 'Press ENTER to start painting');

  for(var i=1; i<=colors.length; i++){

    arrColor.push(new Color((width/8)*i, height-30, 30, String(colors[i-1])));

  }

}

function draw(){

  capture.loadPixels();
  loadPixels();

  if(gameStarted == true){
    for(var i=0; i<arrColor.length; i++){
      arrColor[i].display();
      arrColor[i].handleHover();
    }
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
    push();
    translate(capture.width, 0);
    scale(-1.0,1.0);
    // image(capture, -20, 20);
    pop();

    push();
    rectMode(CENTER);
    noFill();
    stroke('white');
    rect(width/2, height/2, 650, 450);
    pop();
    playBtn.display();
    cameraBtn.display();

  }else{
    background(0);
    titleScreen.display();
  }
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

//Function to check if the Play button has been pressed
function buttonClicked(){

  var d = dist(mouseX, mouseY, playBtn.x, playBtn.y);
  if(d<playBtn.width/2){
    console.log('allo');

  }
}

//Function to handle Keyboard events
function keyPressed(){

  //if the script is playing, pause it, and vice versa
  if(keyCode == ENTER){
    gameStarted=true;
    background(0);

  }
}
