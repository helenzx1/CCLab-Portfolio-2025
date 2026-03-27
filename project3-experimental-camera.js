// ------------------------------------
// Global variables
// ------------------------------------
let faceMesh;
let video;
let faces = [];

let fireParticles = [];
let fireLayer;

let instructionText;
let clearButton;
let saveButton;


// ------------------------------------
// preload()
// ------------------------------------
function preload() {
  faceMesh = ml5.faceMesh({
    maxFaces: 1,
    flipped: true
  });
}


// ------------------------------------
// FaceMesh callback
// ------------------------------------
function gotFaces(results) {
  faces = results;
}


// ------------------------------------
// setup()
// ------------------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);

  // extra graphics layer for fire
  fireLayer = createGraphics(windowWidth, windowHeight);

  // camera
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();

  // start facemesh
  faceMesh.detectStart(video, gotFaces);

  // DOM text
  instructionText = createP("Open your mouth to breathe fire");
  instructionText.position(20, 10);
  instructionText.style("margin", "0");
  instructionText.style("padding", "8px 12px");
  instructionText.style("font-family", "Arial");
  instructionText.style("font-size", "18px");
  instructionText.style("color", "#7a0026");
  instructionText.style("background", "rgba(255,255,255,0.75)");
  instructionText.style("border-radius", "10px");

  // clear button
  clearButton = createButton("Clear Fire");
  clearButton.position(20, 55);
  clearButton.mousePressed(clearFire);

  // save button
  saveButton = createButton("Save Photo");
  saveButton.position(110, 55);
  saveButton.mousePressed(savePhoto);
}


// ------------------------------------
// draw()
// ------------------------------------
function draw() {
  background(255);

  drawMirroredVideo();

  let points = getFacePoints();

  if (points) {
    drawHorns(points);
    emitFireWhenMouthOpens(points);
  }

  updateAndDrawFire();

  image(fireLayer, 0, 0);
}


// ------------------------------------
// draw mirrored video
// ------------------------------------
function drawMirroredVideo() {
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  pop();
}


// ------------------------------------
// get face points
// ------------------------------------
function getFacePoints() {
  if (!faces || faces.length === 0) {
    return null;
  }

  let face = faces[0];

  // common ml5 facemesh format
  if (face.keypoints && face.keypoints.length > 0) {
    let converted = [];
    for (let i = 0; i < face.keypoints.length; i++) {
      converted.push({
        x: face.keypoints[i].x,
        y: face.keypoints[i].y
      });
    }
    return converted;
  }

  // fallback array format
  if (Array.isArray(face)) {
    let converted = [];
    for (let i = 0; i < face.length; i++) {
      converted.push({
        x: face[i][0],
        y: face[i][1]
      });
    }
    return converted;
  }

  return null;
}


// ------------------------------------
// safe point getter
// ------------------------------------
function getPoint(points, index) {
  if (!points) {
    return null;
  }

  if (!points[index]) {
    return null;
  }

  return points[index];
}


// ------------------------------------
// draw devil horns
// ------------------------------------
function drawHorns(points) {
  let leftBrow = getPoint(points, 105);
  let rightBrow = getPoint(points, 334);

  if (!leftBrow || !rightBrow) {
    return;
  }

  let x1 = leftBrow.x;
  let y1 = leftBrow.y;

  let x2 = rightBrow.x;
  let y2 = rightBrow.y;

  noStroke();
  fill(120, 0, 0);

  // left horn
  triangle(
    x1 - 18, y1 - 70,
    x1 + 18, y1 - 70,
    x1, y1 - 190
  );

  // right horn
  triangle(
    x2 - 18, y2 - 70,
    x2 + 18, y2 - 70,
    x2, y2 - 190
  );
}


// ------------------------------------
// emit fire when mouth opens
// ------------------------------------
function emitFireWhenMouthOpens(points) {
  let leftMouth = getPoint(points, 61);
  let rightMouth = getPoint(points, 291);
  let topLip = getPoint(points, 13);
  let bottomLip = getPoint(points, 14);

  let topFace = getPoint(points, 10);
  let bottomFace = getPoint(points, 152);

  if (
    !leftMouth ||
    !rightMouth ||
    !topLip ||
    !bottomLip ||
    !topFace ||
    !bottomFace
  ) {
    return;
  }

  let mouthWidth = dist(
    leftMouth.x, leftMouth.y,
    rightMouth.x, rightMouth.y
  );

  let mouthOpen = abs(bottomLip.y - topLip.y);
  let faceHeight = abs(bottomFace.y - topFace.y);
  let mouthRatio = mouthOpen / faceHeight;

  let openThreshold = 0.025;

  if (mouthRatio > openThreshold) {
    let centerX = (leftMouth.x + rightMouth.x) / 2;
    let centerY = (topLip.y + bottomLip.y) / 2 + 8;

    let amount = floor(
      map(
        constrain(mouthRatio, openThreshold, 0.18),
        openThreshold,
        0.18,
        3,
        9
      )
    );

    let spread = mouthWidth * 0.22;

    for (let i = 0; i < amount; i++) {
      let particle = makeFireParticle(
        centerX + random(-spread, spread),
        centerY + random(-5, 5),
        mouthWidth,
        mouthRatio
      );
      fireParticles.push(particle);
    }
  }
}


// ------------------------------------
// make one fire particle
// ------------------------------------
function makeFireParticle(x, y, mouthWidth, mouthRatio) {
  return {
    x: x,
    y: y,
    size: random(mouthWidth * 0.12, mouthWidth * 0.26) + random(4, 8),
    vx: random(-2.0, 2.0),
    vy: random(-4.8, -2.0) - mouthRatio * 10,
    alpha: 255,
    shrink: random(0.08, 0.16),
    isSpark: random() < 0.38
  };
}


// ------------------------------------
// update and draw fire
// ------------------------------------
function updateAndDrawFire() {
  fireLayer.clear();
  fireLayer.noStroke();

  for (let i = fireParticles.length - 1; i >= 0; i--) {
    let p = fireParticles[i];

    p.x += p.vx;
    p.y += p.vy;

    p.vy -= 0.02;
    p.vx *= 0.98;

    if (p.isSpark) {
      p.alpha -= 12;
    } else {
      p.alpha -= 8;
    }

    p.size -= p.shrink;

    if (p.isSpark) {
      drawSpark(p);
    } else {
      drawSingleFlame(p);
    }

    if (p.alpha <= 0 || p.size <= 1) {
      fireParticles.splice(i, 1);
    }
  }

  if (fireParticles.length > 500) {
    fireParticles.splice(0, fireParticles.length - 500);
  }
}


// ------------------------------------
// draw one flame
// ------------------------------------
function drawSingleFlame(p) {
  let outerW = p.size * 0.9;
  let outerH = p.size * 2.3;

  fireLayer.fill(255, 60, 0, p.alpha * 0.40);
  fireLayer.ellipse(p.x, p.y, outerW, outerH);

  fireLayer.fill(255, 145, 0, p.alpha * 0.68);
  fireLayer.ellipse(
    p.x,
    p.y - outerH * 0.16,
    outerW * 0.68,
    outerH * 0.72
  );

  fireLayer.fill(255, 235, 140, p.alpha * 0.92);
  fireLayer.ellipse(
    p.x,
    p.y - outerH * 0.30,
    outerW * 0.35,
    outerH * 0.42
  );
}


// ------------------------------------
// draw spark
// ------------------------------------
function drawSpark(p) {
  fireLayer.fill(255, 235, 160, p.alpha);
  fireLayer.ellipse(p.x, p.y, p.size * 0.42, p.size * 0.42);

  fireLayer.fill(255, 150, 0, p.alpha * 0.45);
  fireLayer.ellipse(p.x, p.y, p.size * 0.95, p.size * 0.95);
}


// ------------------------------------
// clear fire
// ------------------------------------
function clearFire() {
  fireParticles = [];
}


// ------------------------------------
// save image
// ------------------------------------
function savePhoto() {
  saveCanvas("face_fire_filter", "png");
}


// ------------------------------------
// resize
// ------------------------------------
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  fireLayer = createGraphics(windowWidth, windowHeight);

  if (video) {
    video.size(windowWidth, windowHeight);
  }
}
