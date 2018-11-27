//constructor for Particle

function Particle(x,y){
  this.x=x;
  this.y=y;
  this.size=random(5, 20);
}

Particle.prototype.update =  function(){
    this.x += random(-10, 10);
    this.y += random(-10, 10);
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
}

Particle.prototype.show = function(){
  noStroke();
  var pixelX= floor(this.x/capScale);
  var pixelY= floor(this.y/capScale);
  var col = capture.get(pixelX, pixelY);
  console.log(col);
  fill(col[0], col[1], col[2], slider);
  ellipse(this.x, this.y, this.size, this.size);
}
