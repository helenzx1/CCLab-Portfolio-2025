let font;
let points = [];
let word = "HURT";
let fontSize = 180;
let overload = 0;
let t = 0;

function preload() {
  font = loadFont("font.ttf");
}

function setup() {
  createCanvas(600, 600);

  points = font.textToPoints(word, 35, 340, fontSize, {
    sampleFactor: 0.18
  });

  console.log(points);
}

function draw() {
  background(15);

  if (mouseIsPressed) {
    overload += 0.6;
  } else {
    overload = max(0, overload - 0.35);
  }

  for (let i = 0; i < points.length; i++) {
    let p = points[i];

    let shakeX = random(-overload, overload);
    let shakeY = random(-overload, overload);

    let d = dist(mouseX, mouseY, p.x, p.y);
    let force = map(d, 0, 150, 18, 0, true);

    let angle = atan2(p.y - mouseY, p.x - mouseX);

    let x = p.x + cos(angle) * force + shakeX;
    let y = p.y + sin(angle) * force + shakeY;

    let slash = sin(t + i * 0.25) * 8;
    let lineLength = 10 + overload * 0.2;

    let r = 255;
    let g = map(sin(t + i * 0.08), -1, 1, 20, 90);
    let b = map(cos(t + i * 0.08), -1, 1, 20, 70);

    stroke(r, g, b, 200);
    strokeWeight(1.5);

    line(
      x - lineLength + slash,
      y - lineLength,
      x + lineLength - slash,
      y + lineLength
    );
  }

  t += 0.08;
}
