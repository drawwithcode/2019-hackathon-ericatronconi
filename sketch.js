var myImage;
var mySong;


function preload(){
myImage = loadImage("./assets/tg1_logo.png");
mySong = loadSound("./assets/TG1_new.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  strokeWeight(10)
	noFill();
	colorMode(HSB);
	strokeCap(ROUND);

radius = height*1/3;
number = 100;
baseAngle = 0;
angle = baseAngle;

	frameRate(120);


  fft = new p5.FFT();
  amplitude = new p5.Amplitude();
	amplitude.setInput(mySong);
  rec = 0;


}

function draw() {
  imageMode(CENTER);
  image(myImage, windowWidth/2, windowHeight/2, myImage.width/2, myImage.height/2);

  var myText = 'press right arrow to start, then press left arrow to restart';
  drawingContext.font = "italic 30px Open Sans";
  fill(255);
noStroke();
  drawingContext.textAlign = "top";
  text(myText, 20, 50);

push();
  magnitude = radius/8;
	angle = baseAngle;

	var spectrum = fft.analyze();

	beginShape();
translate(windowWidth/2, windowHeight/2);
	for(var i = 0; i < number; i++){

		spec = spectrum[i*4];
		size = sq(map(spec, 0, 255, 0, 1));

		level = amplitude.getLevel();

		x1 = sin(angle)*radius;
		y1 = cos(angle)*radius;

		modifier = (1 + size/2)*(1+level/2) + rec;

		x2 = x1 * modifier;
		y2 = y1 * modifier;

		strokeWeight((level+1)*6);

		stroke(i*(360/number), 360, 360);
		line(x1, y1, x2, y2);
		angle += TWO_PI/number;
	}
	endShape();
  pop();


}

function keyPressed() {
  if(keyCode == RIGHT_ARROW) {
    mySong.play();
    fft = new p5.FFT();
			amplitude.setInput(mySong);
  } else if(keyCode == LEFT_ARROW) {
    redraw();
    mySong.playMode('restart');
    mySong.play();


  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
