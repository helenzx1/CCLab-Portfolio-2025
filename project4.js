//Store trash positions and types
let trash = [];
let canvas;

function setup() {
  // create the canvas
  canvas = createCanvas(400, 600);
  // attach the canvas to the div in your HTML
  canvas.parent("sketch-container");

  background(255);

  //Generate 20 random trash pieces
  for (let a = 0; a < 20; a++) {
    trash.push({
      x: random(width),
      y: random(height),
      t: int(random(3))
    });
  }
}

function draw() {
  background(240);

  //Trash
  for (let t of trash) {
    drawTrash(t.x, t.y, t.t);
  }

  drawBody(200, 300, 1.0);
  drawCatHead(200, 155, 1);
  drawBoot(160, 430, 0.9);
  drawBoot(240, 430, 0.9);

  //sunglasses
  fill(0);
  rect(190, 145, 20, 5);
}

function drawTrash(x, y, type) {
  push();
  translate(x, y);
  noStroke();

  //Bottle
  if (type === 0) {
    fill(100, 180, 255, 180);
    rect(-5, -15, 10, 25, 3);
    fill(80, 120, 200);
    rect(-3, -20, 6, 5);

    //Can
  } else if (type == 1) {
    fill(180, 80, 60, 200);
    ellipse(0, 0, 20, 15);
    fill(120, 50, 40);
    ellipse(0, -3, 20, 8);

    //Paper
  } else {
    fill(200, 200, 200, 180);
    quad(-5, -3, 5, -5, 3, 5, -4, 4);
  }

  pop();
}

function drawBody(x, y, s) {
  push();
  translate(x, y);
  scale(s);

  //body
  for (let a = -3; a < 3; a++) {
    if (a % 2 === 0) {
      fill(200, 120, 20);
    } else {
      fill(150, 80, 10);
    }
    rect(a * 20, -80, 20, 160);
  }

  // Left arm
  strokeWeight(18);
  for (let a = -10; a <= 10; a += 8) {
    if ((a / 8) % 2 === 0) {
      stroke(200, 120, 20);
    } else {
      stroke(150, 80, 10);
    }
    line(-60 + a, -60, -90 + a, 30);
  }

  // Left hand
  noStroke();
  fill(173, 227, 136);
  ellipse(-95, 40, 40, 40);

  //Right arm
  strokeWeight(18);
  for (let a = -10; a <= 10; a += 8) {
    if ((a / 8) % 2 === 0) {
      stroke(200, 120, 20);
    } else {
      stroke(150, 80, 10);
    }
    noFill();
    beginShape();
    vertex(60 + a, -60);
    vertex(100 + a, -20);
    vertex(70 + a, 20);
    endShape();
  }

  //Right hand
  noStroke();
  fill(173, 227, 136);
  ellipse(70, 30, 40, 40);

  pop();
}

function drawCatHead(x, y, s) {
  push();
  translate(x, y);
  scale(s);

  //head
  fill(255, 60, 160);
  noStroke();
  ellipse(0, 0, 170, 150);

  //Cat ears
  fill(255, 60, 160);
  triangle(-60, -40, -80, -105, -25, -60);
  triangle(60, -40, 80, -105, 25, -60);

  //Heart-shaped eyes (dark gray)
  fill(30, 30, 30);
  drawHeart(-35, -20, 50);
  drawHeart(35, -20, 50);

  //Blush
  fill(230, 50, 120, 100);
  ellipse(-45, 35, 55, 40);
  ellipse(45, 35, 55, 40);

  //Mouth
  let rx = 100 * 0.18;
  let ry = 140 * 0.18;
  let cx = 0;
  let cy = 35;

  fill(100, 150, 255);
  stroke(100, 150, 255);
  strokeWeight(2);

  beginShape();
  //Upper part of the mouth
  for (let a = 0; a <= PI; a += 0.05) {
    let x1 = cx + cos(a) * rx;
    let y1 = cy + sin(a) * ry;
    vertex(x1, y1);
  }
  //Lower part
  for (let i = 200 * 0.18; i >= 0; i -= 5 * 0.18) {
    let x2 = cx - rx + i;
    let y2 = cy - sin(i / (40 * 0.18) * TWO_PI) * (15 * 0.18);
    vertex(x2, y2);
  }
  endShape(CLOSE);

  pop();
}

function drawHeart(x, y, size) {
  beginShape();
  vertex(x, y);

  bezierVertex(
    x - size / 2, y - size / 2,
    x - size, y + size / 3,
    x, y + size
  );

  bezierVertex(
    x + size, y + size / 3,
    x + size / 2, y - size / 2,
    x, y
  );
  endShape(CLOSE);
}

function drawBoot(x, y, s) {
  push();
  translate(x, y);
  scale(s);

  //boot shaft
  fill(34, 139, 34);
  rect(-25, -60, 50, 40, 5);
  ellipse(0, -20, 60, 40);
  fill(22, 107, 22);
  rect(-30, -10, 60, 10, 3);

  pop();
}
