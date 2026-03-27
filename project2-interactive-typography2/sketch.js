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
    sampleFactor: 0.16
  });

  console.log(points);
}

function draw() {
  background(12);
  strokeCap(SQUARE);

  for (let i = 0; i < points.length; i++) {
    let p = points[i];

    // 鼠标影响（拉扯）
    let d = dist(mouseX, mouseY, p.x, p.y);
    let pull = map(d, 0, 140, 16, 0, true);

    let angle = atan2(p.y - mouseY, p.x - mouseX);

    // 轻微抖动（一直有，不用点击）
    let jitterX = random(-1.5, 1.5);
    let jitterY = random(-1.5, 1.5);

    let x = p.x + cos(angle) * pull + jitterX;
    let y = p.y + sin(angle) * pull + jitterY;

    // 斜线方向（轻微变化）
    let slashAngle = PI / 4 + sin(t + i * 0.12) * 0.3;
    let len = 7;

    let x1 = x - cos(slashAngle) * len;
    let y1 = y - sin(slashAngle) * len;
    let x2 = x + cos(slashAngle) * len;
    let y2 = y + sin(slashAngle) * len;

    // 颜色（稳定偏红）
    let r = 255;
    let g = map(sin(t + i * 0.05), -1, 1, 50, 90);
    let b = map(cos(t + i * 0.05), -1, 1, 40, 70);

    stroke(r, g, b, 200);
    strokeWeight(1.3);

    line(x1, y1, x2, y2);
  }

  t += 0.05;
}
