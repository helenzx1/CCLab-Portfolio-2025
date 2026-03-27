let font;
let points = [];
let word = "HURT";
let fontSize = 180;
let overload = 0;

function preload() {
  font = loadFont("front.ttf");
}

function setup() {
  createCanvas(600, 600);

  points = font.textToPoints(word, 35, 340, fontSize, {
    sampleFactor: 0.2
  });

  console.log(points);
}

function draw() {
  background(10);

  if (mouseIsPressed) {
    overload += 0.8;
  } else {
    overload = max(0, overload - 0.4);
  }

  for (let i = 0; i < points.length; i++) {
    let p = points[i];

    let d = dist(mouseX, mouseY, p.x, p.y);
    let explode = map(d, 0, 120, 20, 0, true);

    let angle = atan2(p.y - mouseY, p.x - mouseX);

    let x = p.x + cos(angle) * explode + random(-overload, overload);
    let y = p.y + sin(angle) * explode + random(-overload, overload);

    let spike = map(sin(frameCount * 0.15 + i), -1, 1, 4, 14) + overload * 0.2;

    let r = 255;
    let g = random(20, 60);
    let b = random(20, 60);

    stroke(r, g, b, 220);
    strokeWeight(1.2);

    // 第一条尖线
    line(x - spike, y - spike, x + spike, y + spike);

    // 第二条反方向尖线
    line(x - spike, y + spike, x + spike, y - spike);
  }
}
