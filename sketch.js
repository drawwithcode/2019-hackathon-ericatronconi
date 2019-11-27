var myImage;
var mySong;

function preload() {
  myImage = loadImage("./assets/tg1_logo.png");
  mySong = loadSound("./assets/TG1_new.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  strokeWeight(10)
  noFill();
  colorMode(HSB);
  strokeCap(ROUND);

  radius = height * 1 / 3;
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
  background(0);

  imageMode(CENTER);
  image(myImage, windowWidth / 2, windowHeight / 2, myImage.width / 2, myImage.height / 2);

  var myText = 'right arrow to start, left arrow to restart';
  fill("white");
  noStroke();
  textFont("Oswald");
  textStyle('Regular');
  textAlign(TOP, CORNER);

  textSize(20);
  text(myText, 20, 30);

  magnitude = radius / 8;
  angle = baseAngle;

  var spectrum = fft.analyze();


  beginShape();
  translate(windowWidth / 2, windowHeight / 2);
  for (var i = 0; i < number; i++) {

    spec = spectrum[i * 4];
    size = sq(map(spec, 0, 255, 0, 1));

    level = amplitude.getLevel();

    x1 = sin(angle) * radius;
    y1 = cos(angle) * radius;

    modifier = (1 + size / 2) * (1 + level / 2) + rec;

    x2 = x1 * modifier;
    y2 = y1 * modifier;

    strokeWeight((level + 1) * 6);

    stroke(i * (360 / number), 360, 360);
    line(x1, y1, x2, y2);
    angle += TWO_PI / number;
  }
  endShape();
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    mySong.play();
    fft = new p5.FFT();
    amplitude.setInput(mySong);
  } else if (keyCode == LEFT_ARROW) {
    mySong.playMode('restart');
    mySong.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
