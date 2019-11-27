var myImage;
var mySong;

function preload(){
myImage = loadImage("./assets/tg1_logo.png");
mySong1 = loadSound("./assets/TG1_bumper.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  imageMode(CENTER);
  image(myImage, windowWidth/2, windowHeight/2, myImage.width/2, myImage.height/2);
}

function keyPressed() {
  if(keyCode == RIGHT_ARROW) {
    mySong.play();
  } else if(keyCode == LEFT_ARROW) {
    mySong.playMode('restart');
    mySong.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
