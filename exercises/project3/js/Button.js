

function Button(src, x, y, w, h){
  this.src=src;
  this.x=x;
  this.y=y;
  this.w=w;
  this.h=h;
  this.play='play';
}

Button.prototype.display = function(){
  imageMode(CENTER);
  push();
  image(imgPlayCon,this.x, this.y, this.w+5, this.h+5);
  pop();
  image(this.src, this.x, this.y, this.w, this.h);
}

Button.prototype.clicked = function(){
  var d = dist(mouseX, mouseY, this.x, this.y);

  if(d < this.w/2){
    if(this.play=='play'){
      this.play='pause';
      console.log('allo');
      this.src=imgPlay;
      play=false;
    }else{
      this.play='play';
      this.src=imgPause;
      play=true;
    }
  }

}
