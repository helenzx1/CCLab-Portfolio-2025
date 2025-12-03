
function setup() {
  // create the canvas
  canvas = createCanvas(400, 400);
  // attach the canvas to the div in your HTML
  canvas.parent("sketch-container");
  
  background(128,128,128);
  randomizeAll(); 

  highlightLeftX = eyeLeft.x;
  highlightLeftY = eyeLeft.y;
  highlightRightX = eyeRight.x;
  highlightRightY = eyeRight.y;

  loop(); 
}


let highlightSize; 
let blushColor; 
let eyeLeft = {x:150, y: 200, r: 10};
let eyeRight = {x:250, y: 200, r: 10};


let highlightLeftX, highlightLeftY;
let highlightRightX, highlightRightY;


function draw() {
  // Ears
  fill(255);
  stroke(100);
  strokeWeight(1);
  rectMode(CENTER);
  
  push();
  translate(80, 130);
  rotate(-0.5);
  rect(0, 0, 100, 130, 15);
  pop();
  
  push();
  translate(320, 130);
  rotate(0.5);
  rect(0, 0, 100, 130, 15);
  pop();
  
  rectMode(CORNER);
  noStroke();

  // Head
  fill(255);
  ellipse(200, 210, 300, 260);

  // Spots
  fill(0);
  ellipse(260, 125, 55, 40);
  ellipse(280, 180, 16, 13);
  ellipse(85, 140, 25, 20);
  ellipse(60, 115, 22, 18);
  ellipse(330, 110, 28, 22);
  ellipse(350, 160, 18, 14);
  ellipse(80, 250, 35, 30);
  ellipse(100, 280, 20, 15);
  ellipse(330, 240, 25, 20);
  ellipse(300, 270, 30, 25);

  // Eyes
  fill(0);
  ellipse(eyeLeft.x, eyeLeft.y, 35, 35);
  ellipse(eyeRight.x, eyeRight.y, 35, 35);

  // Pupils
  fill(0);
  ellipse(eyeLeft.x, eyeLeft.y, 12, 12);
  ellipse(eyeRight.x, eyeRight.y, 12, 12);


  fill(255);
  updateHighlight(eyeLeft, "left");
  updateHighlight(eyeRight, "right");

  // Mouth
  fill(50);
  ellipse(200, 230, 20, 18);
  stroke(50);
  strokeWeight(2);
  noFill();
  arc(200, 250, 40, 20, 0, PI);
  strokeWeight(1);

  // Blush
  fill(blushColor);
  noStroke();
  ellipse(120, 250, 60, 40);
  ellipse(280, 250, 60, 40);
}

//hightlight(follow)
function updateHighlight(eye, side) {
  let dx = mouseX - eye.x;
  let dy = mouseY - eye.y;
  let distMouse = sqrt(dx*dx + dy*dy);

  if (distMouse > eye.r - highlightSize/2) {
    let ratio = (eye.r - highlightSize/2) / distMouse;
    dx *= ratio;
    dy *= ratio;
  }

  let finalX = eye.x + dx;
  let finalY = eye.y + dy;

  if (side === "left") {
    highlightLeftX = lerp(highlightLeftX, finalX, 0.15);
    highlightLeftY = lerp(highlightLeftY, finalY, 0.15);
    ellipse(highlightLeftX, highlightLeftY, highlightSize, highlightSize);
  } else {
    highlightRightX = lerp(highlightRightX, finalX, 0.15);
    highlightRightY = lerp(highlightRightY, finalY, 0.15);
    ellipse(highlightRightX, highlightRightY, highlightSize, highlightSize);
  }
}


function mousePressed() {
  randomizeAll();
}


function randomizeAll() {
  highlightSize = random(5, 15);

  let r = random(200, 255);
  let g = random(120, 180); 
  let b = random(120, 180);
  let alpha = random(50, 100);
  blushColor = color(r, g, b, alpha);

  }
    
