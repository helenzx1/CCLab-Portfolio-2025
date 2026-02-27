let pts = [];
let mode = 0;
let words = ["ARC", "ARC", "ARC", "LOVE", "LOVE", "LOVE", "HURT", "HURT", "HURT"];
let t = 0;

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("sketch-holder");
  setupWord(words[mode]);
}

function draw() {
  background(20);

  if (mode === 0) {
    noFill();
    stroke(255, 150, 200);
    strokeWeight(1.5);

    for (let i = 0; i < pts.length; i++) {
      let p = pts[i];
      let breathe = sin(t + i * 0.03) * 3;
      let size = 6 + breathe;
      ellipse(p.x, p.y, size, size);
    }
  }

  else if (mode === 1) {
    stroke(100, 255, 200);
    strokeWeight(1.5);

    for (let i = 0; i < pts.length; i++) {
      let p = pts[i];
      let d = dist(mouseX, mouseY, p.x, p.y);
      let len = 12;
      if (d < 200) len = map(d, 0, 200, 2, 12);
      line(p.x, p.y, p.x + len, p.y - len);
    }
  }

  else if (mode === 2) {
    stroke(160);
    strokeWeight(1.5);

    for (let i = 0; i < pts.length; i++) {
      let p = pts[i];
      let jx = random(-1, 1);
      let jy = random(-1, 1);
      line(p.x + jx, p.y + jy, p.x + 6 + jx, p.y + 6 + jy);
    }
  }

  else if (mode === 3) {
    stroke(255, 100, 150);
    strokeWeight(2);

    for (let i = 0; i < pts.length; i++) {
      let p = pts[i];
      let breathe = sin(t + i * 0.01) * 6;
      let h = 8 + breathe;
      line(p.x, p.y - h, p.x, p.y + h);
    }
  }

  else if (mode === 4) {
    stroke(100, 200, 255);
    strokeWeight(2);

    for (let i = 0; i < pts.length; i++) {
      let p = pts[i];
      let wave = sin(t + i * 0.03) * 5;
      line(p.x - 5, p.y + wave, p.x + 5, p.y + wave);
    }
  }

  else if (mode === 5) {
    noStroke();

    for (let i = 0; i < pts.length; i++) {
      let p = pts[i];
      let a = map(sin(t * 2 + i * 0.2), -1, 1, 30, 255);
      fill(255, 220, 100, a);
      rect(p.x, p.y, 3, 3);
    }
  }

  else if (mode === 6) {
    stroke(220, 20, 60);
    strokeWeight(2);

    for (let i = 0; i < pts.length; i++) {
      let p = pts[i];
      let spin = sin(t + i * 0.02) * 4;
      let s = 4 + abs(spin) * 0.5;
      line(p.x - s, p.y, p.x + s, p.y);
      line(p.x, p.y - s, p.x, p.y + s);
    }
  }

  else if (mode === 7) {
    stroke(150, 180, 255);
    strokeWeight(2);

    for (let i = 0; i < pts.length; i++) {
      let p = pts[i];
      let d = dist(mouseX, mouseY, p.x, p.y);
      let len = 12;
      if (d < 150) len = map(d, 0, 150, 1, 12);
      line(p.x, p.y - len, p.x, p.y + len);
    }
  }

  else if (mode === 8) {
    stroke(120);
    strokeWeight(2);

    for (let i = 0; i < pts.length; i++) {
      let p = pts[i];
      let d = dist(mouseX, mouseY, p.x, p.y);
      if (d > 60) {
        line(p.x - 3, p.y, p.x + 3, p.y);
      }
    }
  }

  t += 0.03;
}

function setupWord(wordText) {
  pts = [];

  let pg = createGraphics(width, height);
  pg.background(255);
  pg.fill(0);
  pg.noStroke();
  pg.textSize(150);
  pg.textAlign(LEFT, CENTER);
  pg.text(wordText, 80, height / 2);

  let gap = 8;

  for (let x = 0; x < width; x += gap) {
    for (let y = 0; y < height; y += gap) {
      let c = pg.get(x, y);
      if (c[0] < 128) {
        pts.push({ x: x, y: y });
      }
    }
  }
}

function mousePressed() {
  mode++;
  if (mode > 8) mode = 0;
  setupWord(words[mode]);
}
