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

// setup()
//
// Description of setup

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  capture = createCapture(VIDEO);
  capture.size(width/capScale,height/capScale);
}

function draw(){
  background(51);
  capture.loadPixels();
  loadPixels();
  // console.log(capture.pixels);


  for(var y=0; y < capture.height; y++){
    for(var x=0; x < capture.width; x++){
        var index = (x + y * capture.width)*4;
        //color value
        var red = capture.pixels[index];
        var green = capture.pixels[index+1];
        var blue = capture.pixels[index+2];

        pixBri = (red+green+blue)/3;
        console.log(pixBri);

        if(pixBri>200){
          red = 255;
          blue = 255;
          green = 255;
          ellipse(x*capScale, y*capScale, 10, 10);
        }


    }
  }



  // image(capture, 0, 0);
  // capture.hide();


}

function keyPressed(){
  //if the script is playing, pause it, and vice versa
  if(keyCode == ENTER){
    if(play==true){
      play=false;
      console.log('paused');
    }else{
      play=true;
    }

  }
}
