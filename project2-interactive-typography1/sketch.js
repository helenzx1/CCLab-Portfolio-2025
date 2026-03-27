let font;
let points = [];
let word = "LOVE";
let t = 0;

function preload() {
  font = loadFont("font.ttf");
}

function setup() {
  createCanvas(600, 600);

  points = font.textToPoints(word, 40, 340, 180, {
    sampleFactor: 0.15
  });

  console.log(points);
}

function draw() {
  background(255, 245, 248);

  for (let i = 0; i < points.length; i++) {
    let p = points[i];

    let wave = sin(t + i * 0.1) * 3;

    let d = dist(mouseX, mouseY, p.x, p.y);
    let ripple = map(d, 0, 150, 15, 0, true);

    let angle = atan2(p.y - mouseY, p.x - mouseX);

    let x = p.x + cos(angle) * ripple;
    let y = p.y + sin(angle) * ripple + wave;

    let lineWidth = 6;
    let tilt = sin(t + i * 0.2) * 2;

    let r = 255;
    let g = map(sin(t + i * 0.05), -1, 1, 120, 200);
    let b = map(cos(t + i * 0.05), -1, 1, 160, 100);

    stroke(r, g, b, 180);
    strokeWeight(1.5);

    line(x - lineWidth, y + tilt, x + lineWidth, y - tilt);
  }

  t += 0.04;
}
