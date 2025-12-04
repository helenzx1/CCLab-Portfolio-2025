let musicTypes = ["K-pop", "Relax", "Rock", "Pop", "Electronic"];
let musicCount = [8, 15, 6, 15, 9];
let cdColors = [];
let angle = 0;

function setup() {
  // create the canvas
  canvas = createCanvas(600, 600);
  // attach the canvas to the div in your HTML
  canvas.parent("sketch-container");

  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  textSize(16);

  // CD Colors
  cdColors = [
    color(255, 182, 193), 
    color(173, 216, 230), 
    color(255, 218, 185), 
    color(193, 255, 193), 
    color(216, 191, 216)
  ];
}

function draw() {
  background(10);
  translate(width / 2, height / 2 - 30);
  angle += 0.3;

  let radius = 150;

  for (let i = 0; i < musicTypes.length; i++) {
    push();
    let theta = angle + i * (360 / musicTypes.length);
    let x = radius * cos(theta);
    let y = radius * sin(theta);

    let scaleFactor = 1.1;
    if (musicTypes[i] === "Electronic") scaleFactor = 1.3;
    if (musicTypes[i] === "Rock") scaleFactor = 0.9;
    if (musicTypes[i] === "Relax" || musicTypes[i] === "Pop") scaleFactor = 1.5;

    drawCD(x, y, cdColors[i], -angle * 2, scaleFactor);
    pop();
  }

  drawLegend();
  drawTitle();
}

function drawCD(x, y, c, rot, s) {
  push();
  translate(x, y);
  rotate(rot);
  scale(s);

  // CD surface
  for (let r = 45; r > 0; r -= 2) {
    let inter = map(r, 45, 0, 0, 1);
    let col = lerpColor(color(255), c, inter);
    fill(col);
    noStroke();
    ellipse(0, 0, r * 2, r * 2);
  }

  // center
  fill(40);
  ellipse(0, 0, 20, 20);

  noFill();
  stroke(255, 150);
  strokeWeight(1);
  arc(0, 0, 70, 70, 200, 250);
  arc(0, 0, 55, 55, 20, 70);
  pop();
}

function drawLegend() {
  push();
  translate(-width / 2 + 50, height / 2 - 130);
  textAlign(LEFT, CENTER);
  textSize(13);
  noStroke();

  for (let i = 0; i < musicTypes.length; i++) {
    fill(cdColors[i]);
    ellipse(0, i * 25, 14, 14);
    fill(255);
    text(musicTypes[i] + "  " + musicCount[i] + " times", 25, i * 25);
  }
  pop();
}

function drawTitle() {
  resetMatrix();
  fill(255);
  textSize(25);
  textAlign(CENTER);
  text("I listened to the type of music on the subway", width / 2, height - 25);
}
