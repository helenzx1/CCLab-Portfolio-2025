let ghost = {
  x: 200,
  y: 150,
  size: 60,
  alpha: 100,
  dirX: 1,
  dirY: 1
};

let timer = 0;

function setup() {
  // create the canvas
  canvas = createCanvas(600, 600);
  // attach the canvas to the div in your HTML
  canvas.parent("sketch-container");
  frameRate(24);
  noCursor();
}

function draw() {
  background(10); 
  drawTVFrame(); 

  for (let x = 80; x < width - 80; x += 40) {
    for (let y = 60; y < height - 60; y += 40) {

      // glitch jitter offset
      let glitchOffset = random(-2, 2);

      // Flicker switching logic
      if ((x + y + frameCount * 2) % 100 < 50) {
        fill(120 + random(-30, 30), 255, 220 + random(-40, 40), 60);
      } else {
        fill(255, 100 + random(-50, 50), 200 + random(-30, 30), 60);
      }

      noStroke();
      rect(x + glitchOffset, y + glitchOffset, 30, 30);
    }
  }

  // Ghost Flashing Animation
  timer++;
  if (timer % 60 < 20) {
    ghost.alpha = 40;
  } else if (timer % 60 < 40) {
    ghost.alpha = 100;
  } else {
    ghost.alpha = 180;
  }

  // movement
  ghost.x += ghost.dirX * 1.2;
  ghost.y += ghost.dirY * 0.8;

  // boundary rebound
  if (ghost.x < 120 || ghost.x > width - 120) ghost.dirX *= -1;
  if (ghost.y < 100 || ghost.y > height - 100) ghost.dirY *= -1;

  // ghost shape
  noStroke();
  fill(255, ghost.alpha);
  ellipse(ghost.x, ghost.y, ghost.size, ghost.size * 1.2);
  fill(0, ghost.alpha + 50);
  ellipse(ghost.x - 10, ghost.y - 10, 8, 8);
  ellipse(ghost.x + 10, ghost.y - 10, 8, 8);

  // interference flicker
  if (random(1) < 0.03) {
    fill(255, random(100, 200));
    rect(0, random(height), width, 3);
  }
}

function drawTVFrame() {
  fill(70, 40, 20); 
  rect(0, 0, width, height, 20);

  fill(20);
  rect(60, 40, width - 120, height - 80, 10);

  fill(180);
  ellipse(width - 80, height - 30, 15, 15); 

  fill(255, 120, 80);
  ellipse(width - 50, height - 30, 12, 12);
}
