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
var pixels = [];
var slider;
var maxPixels=20;

// setup()
//
// Description of setup

function setup() {
  createCanvas(640,480);
  pixelDensity(1);
  capture = createCapture(VIDEO);
  capture.size(width/capScale, height/capScale);
  for(var i=0; i<maxPixels; i++){
    pixels[i] = new Particle(random(width), random(height));
  }
  slider = createSlider(0, 255, 127);
  background(0);
}

function draw(){
  capture.loadPixels();
  for(var i=0; i<pixels.length; i++){
    pixels[i].update();
    pixels[i].show();
  }

}
