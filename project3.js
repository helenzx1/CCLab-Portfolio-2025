
let stars = [];
let showOrbit = false;
let canvas;

function setup() {
  // create the canvas
  canvas = createCanvas(600, 600);

  // attach the canvas to the div in your HTML
  canvas.parent("sketch-container");

  // Create stars only once
  for (let i = 0; i < 120; i++) {
    stars.push({
      x: random(width),
      y: random(height / 2),
      size: random(1, 3),
      bright: random(0.7, 1.0),
      twinkle: random(0.02, 0.08)
    });
  }
}

function draw() {
  let simulatedHour = (frameCount / 30) % 24;
  let realSecond = second();

  setSkyColor(simulatedHour);

  if (showOrbit) drawOrbit();

  drawSunMoon(simulatedHour);

  if (isNight(simulatedHour)) drawStars(simulatedHour);

  drawSea(realSecond, simulatedHour);

  drawTimeText(simulatedHour);
}


// Night is 7pm - 6am
function isNight(hour) {
  return hour >= 19 || hour < 6;
}


function setSkyColor(hour) {
  let skyColor;

  if (hour >= 5 && hour < 7) {
    let t = map(hour, 5, 7, 0, 1);
    skyColor = lerpColor(color(255, 107, 107), color(135, 206, 235), t);
  }
  else if (hour >= 7 && hour < 17) {
    let t = map(hour, 7, 17, 0, 1);
    skyColor = lerpColor(color(135, 206, 235), color(173, 216, 230), t);
  }
  else if (hour >= 17 && hour < 19) {
    let t = map(hour, 17, 19, 0, 1);
    skyColor = lerpColor(color(255, 165, 0), color(70, 130, 180), t);
  }
  else {
    let t = hour >= 19 ? map(hour, 19, 24, 0, 1)
                       : map(hour, 0, 5, 1, 0);
    skyColor = lerpColor(color(70, 130, 180), color(0, 0, 50), t);
  }

  background(skyColor);
}


function drawSunMoon(hour) {
  let angle;
  let radius = 200;
  let centerX = width / 2 - 100;
  let centerY = height / 2 + 100;

  if (!isNight(hour)) {
    let t = map(hour, 5, 17, 0, 1);
    angle = lerp(-PI, 0, t);
  }
  else {
    let t = (hour >= 19)
      ? map(hour, 19, 24, 0, 0.416)
      : map(hour, 0, 5, 0.416, 1);
    angle = lerp(0, -PI, t);
  }

  let posX = centerX + cos(angle) * radius;
  let posY = centerY + sin(angle) * radius;

  noStroke();

  if (!isNight(hour)) {
    fill(255, 230, 100);
    ellipse(posX, posY, 100, 100);
    fill(255, 180, 0);
    ellipse(posX, posY, 80, 80);
    fill(255, 200, 0);
    ellipse(posX, posY, 60, 60);
  } else {
    fill(255);
    ellipse(posX, posY, 60, 60);
    fill(0, 0, 50);
    ellipse(posX + 8, posY - 8, 60, 60);
  }
}
function drawStars(hour) {
  let nightBright = (hour > 21 || hour < 3) ? 1.0 : 0.7;

  noStroke();
  for (let star of stars) {
    let flicker = 150 + sin(frameCount * star.twinkle) * 100;
    fill(255, 250, 205, flicker * star.bright * nightBright);
    ellipse(star.x, star.y, star.size * 2, star.size * 2);
  }
}


function drawSea(realSecond, simulatedHour) {
  let seaLevel = height - map(simulatedHour, 0, 24, 50, height / 2);
  let waveOffset = sin(realSecond * 0.5) * 15;

  noStroke();
  fill(0, 100, 200);
  rect(0, seaLevel + waveOffset, width, height - (seaLevel + waveOffset));

  noFill();
  stroke(0, 150, 255);
  strokeWeight(3);
  beginShape();
  for (let x = 0; x <= width; x += 10) {
    let waveY = seaLevel + waveOffset + sin((x * 0.02) + (realSecond * 0.5)) * 15;
    vertex(x, waveY);
  }
  endShape();
}


function drawTimeText(simulatedHour) {
  noStroke();
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);

  text(nf(floor(simulatedHour), 2) + ":00", 20, 40);
}

function drawOrbit() {
  let radius = 200;
  let centerX = width / 2 - 100;
  let centerY = height / 2 + 100;

  noFill();
  stroke(255, 100);
  strokeWeight(1);
  ellipse(centerX, centerY, radius * 2, radius * 0.8);
}
