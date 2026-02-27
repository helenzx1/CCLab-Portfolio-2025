

let grotesk;
let particles = [];
let word = "ARC";

function preload() {
  grotesk = loadFont("front.ttf"); 
}

function setup() {
  createCanvas(600, 600);
  textFont(grotesk);
  colorMode(HSB, 360, 100, 100, 100); 

  let pts = grotesk.textToPoints(word, 75, 380, 220, {
    sampleFactor: 0.12
  });

  for (let p of pts) {
    particles.push(new ArcParticle(p.x, p.y));
  }
}

function draw() {

  background(240, 35, 10);

  let cx = width / 2;
  let cy = height / 2 + 40;

  let breathe = sin(frameCount * 0.05);
  let pressBoost = mouseIsPressed ? 1.6 : 1.0;

  noStroke();

  for (let pt of particles) {
    pt.update(cx, cy, breathe, pressBoost);
    pt.show();
  }
}

class ArcParticle {
  constructor(x, y) {
    this.ox = x;
    this.oy = y;

    this.x = x;
    this.y = y;

    this.phase = random(TWO_PI);

   
    this.baseSize = random(8, 14);

  
    this.hueOffset = random(360);
  }

  update(cx, cy, breathe, pressBoost) {
    let drift = sin(frameCount * 0.03 + this.phase) * 6;

    let dMouse = dist(mouseX, mouseY, this.ox, this.oy);
    let hover = map(dMouse, 0, 180, 1, 0, true);

    let dxFromCenter = this.ox - cx;
    let archLift = abs(dxFromCenter) / 260;
    archLift = constrain(archLift, 0, 1);

    let liftStrength = (40 + 30 * breathe) * hover * pressBoost;

    let targetY = this.oy - liftStrength * (0.3 + 0.7 * archLift);

    let pushOut =
      map(abs(dxFromCenter), 0, 260, 0, 22, true) * hover * pressBoost;
    let targetX = this.ox + (dxFromCenter > 0 ? pushOut : -pushOut);

    targetX += drift * 0.7;
    targetY += drift * 0.25;

    this.x = lerp(this.x, targetX, 0.12);
    this.y = lerp(this.y, targetY, 0.12);

    // hover + 
    this.size = this.baseSize + hover * 6 + breathe * 2;
  }

  show() {
    // 🌈 
    let hue = (this.hueOffset + frameCount * 1.5) % 360;

    fill(hue, 85, 100, 90);
    ellipse(this.x, this.y, this.size, this.size);
  }
}
