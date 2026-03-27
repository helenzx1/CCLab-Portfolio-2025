let grotesk;
let points = [];
let word = "ARC";
let fontSize = 220;
let overload = 0;

function preload() {
  grotesk = loadFont("front.ttf");
}

function setup() {
  createCanvas(600, 600);
  textFont(grotesk);
  colorMode(HSB, 360, 100, 100);

  points = grotesk.textToPoints(word, 75, 380, fontSize, {
    sampleFactor: 0.12
  });

  console.log(points);
}

function draw() {
  background(240, 35, 10);
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

    let archAmount = map(abs(dx), 0, 260, 10, 45, true);

    let dMouse = dist(mouseX, mouseY, points[i].x, points[i].y);
    let hover = map(dMouse, 0, 180, 1, 0, true);

    let pushX = map(abs(dx), 0, 260, 0, 20, true) * hover;

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

    fill((frameCount * 2 + i) % 360, 85, 100);
    ellipse(x, y, size, size);
  }
}
