let grotesk;
let points = [];
let word = "ARC";
let fontSize = 220;
let overload = 0;

function preload() {
  grotesk = loadFont("front.ttf");
}

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("sketch-container");

  points = grotesk.textToPoints(word, 75, 380, fontSize, {
    sampleFactor: 0.12
  });

  console.log(points);
}

function draw() {
  background(20);
  noStroke();

  let cx = width / 2;
  let breathe = sin(frameCount * 0.05);

  if (mouseIsPressed) {
    overload += 0.5;
  } else {
    overload = max(0, overload - 0.3);
  }

  for (let i = 0; i < points.length; i++) {
    let dx = points[i].x - cx;

    // 越靠左右两边，往上拱得越明显
    let archAmount = map(abs(dx), 0, 260, 10, 45, true);

    // 鼠标越近，反应越明显
    let dMouse = dist(mouseX, mouseY, points[i].x, points[i].y);
    let hover = map(dMouse, 0, 180, 1, 0, true);

    // 左右张开的效果
    let pushX = map(abs(dx), 0, 260, 0, 20, true) * hover;

    // 抖动，像你 POWER 那个写法
    let jitterX = random(-overload, overload);
    let jitterY = random(-overload, overload);

    let x;
    if (dx > 0) {
      x = points[i].x + pushX + jitterX;
    } else {
      x = points[i].x - pushX + jitterX;
    }

    let y = points[i].y - archAmount * hover - breathe * 8 * hover + jitterY;

    let size = 5 + hover * 4 + overload * 0.1;

    fill((frameCount * 2 + i) % 255, 200, 255);
    ellipse(x, y, size);
  }
}
