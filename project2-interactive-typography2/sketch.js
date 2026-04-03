let font;
let points = [];
let word = "HURT";
let fontSize = 180;
let t = 0;

function preload() {
  font = loadFont("front.ttf");
}

function setup() {
  createCanvas(600, 600);

  points = font.textToPoints(word, 35, 340, fontSize, {
    sampleFactor: 0.18
  });

  console.log(points);
}

function draw() {
  background(12);
  noStroke();

  for (let i = 0; i < points.length; i++) {
    let p = points[i];


    let d = dist(mouseX, mouseY, p.x, p.y);
    let spikeLen = map(d, 0, 140, 20, 6, true);


    let angle = atan2(p.y - mouseY, p.x - mouseX);

    let jitterX = random(-1.2, 1.2);
    let jitterY = random(-1.2, 1.2);

    let x = p.x + jitterX;
    let y = p.y + jitterY;

    let x1 = x;
    let y1 = y;

    let x2 = x + cos(angle + 0.3) * spikeLen;
    let y2 = y + sin(angle + 0.3) * spikeLen;

    let x3 = x + cos(angle - 0.3) * spikeLen;
    let y3 = y + sin(angle - 0.3) * spikeLen;


    let r = 255;
    let g = map(sin(t + i * 0.05), -1, 1, 40, 90);
    let b = map(cos(t + i * 0.05), -1, 1, 30, 70);

    fill(r, g, b, 220);

    triangle(x1, y1, x2, y2, x3, y3);
  }

  t += 0.05;
}
