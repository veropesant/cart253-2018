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

In this first experiment, I simply try to use the webcam and spot the colors
of the pixels, because that's something I've never worked with previously.

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

        var rectWidth = map(pixBri, 0, 255, 0, capScale);

        fill(255);
        rectMode(CENTER);
        rect(x*capScale, y*capScale, rectWidth, rectWidth);

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
