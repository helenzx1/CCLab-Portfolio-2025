//Scenes: 0 start, 1 game, 2 success, 3 fail
let scene = 0;
let files = [
  "/memory_core/",
  "/emotion_log/",
  "/city_map/",
  "/regret/",
  "/hope/",
  "/echo/",
  "/ocean_data/",
  "/species_log/",
  "/forest_loss/",
  "/pollution_map/",
  "/climate_stats/",
  "/earth_core_temp/"
];

let currentFile = "";
let progress = 0;
let message = "";
let msgAlpha = 0;
let glitchTime = 0;
let hasDeletedOnce = false;
let countdown = 15;
let lastSecond = 0;

let jamesImgDefault;
let jamesImgFail;
let jamesImgFail2;
let earthImg;
let earth1Img; 
let folderImg;
let bgm;

//Character Navigator
let player;

function preload() {
  soundFormats("mp3");
  jamesImgDefault = loadImage("James.PNG");
  jamesImgFail = loadImage("James1.PNG");
  jamesImgFail2 = loadImage("James2.PNG");
  earthImg = loadImage("earth.PNG");
  earth1Img = loadImage("earth1.PNG"); 
  folderImg = loadImage("folder.jpeg");
  bgm = loadSound("123.mp3");
}

function setup() {
  canvas = createCanvas(600, 400);  
  canvas.parent("sketch-container");

  textFont("monospace");
  textAlign(CENTER, CENTER);
  lastSecond = millis();
  currentFile = random(files);

  if (bgm) {
    bgm.setVolume(0.4);
    bgm.loop();
  }

  player = new Player();
}

function draw() {
  drawBackground();

  switch (scene) {
    case 0: drawStart(); break;
    case 1: drawGame(); break;
    case 2: drawSuccess(); break;
    case 3: drawFail(); break;
  }
}

function drawBackground() {
 
  if (scene === 2 && earth1Img) {
    let scale = Math.max(width / earth1Img.width, height / earth1Img.height);
    imageMode(CENTER);
    image(earth1Img, width / 2, height / 2, earth1Img.width * scale, earth1Img.height * scale);
    imageMode(CORNER);
  } 

  else if ((scene === 0 || scene === 3) && earthImg) {
    let scale = Math.max(width / earthImg.width, height / earthImg.height);
    imageMode(CENTER);
    image(earthImg, width / 2, height / 2, earthImg.width * scale, earthImg.height * scale);
    imageMode(CORNER);
  } else {
    for (let y = 0; y < height; y++) {
      let c = lerpColor(color(240, 248, 255), color(180, 220, 255), y / height);
      stroke(c);
      line(0, y, width, y);
    }
  }
}

function drawStart() {
  drawImg(width / 2, height - 110, false, 220);
  fill(255);
  textSize(28);
  text("It doesn’t matter", width / 2 - 155, height / 2 - 150);
  textSize(20);
  text("I have Plan B ", width / 2 - 210, height / 2 - 120);
  textSize(14);
  text("Press space to begin", width / 2 - 210, height / 2 - 90);

  drawSpeechBubble(width - 230, height / 2 - 20, "The world is ending...\nLet's back it up");
}

function drawGame() {
  let folderSize = 190;
  let folderX = folderSize / 2 + 20; 
  let folderY = height / 2;
  let hasInteractedWithFolder = false;
  if (dist(player.x, player.y, folderX, folderY) < (player.size / 2 + folderSize / 2)) {
    hasInteractedWithFolder = true;
  }
  player.move();
  drawImg(player.x, player.y, hasDeletedOnce, player.size);

  if (folderImg) {
    imageMode(CENTER);
    image(folderImg, folderX, folderY, folderSize, folderSize);
    imageMode(CORNER);
  }

  fill(80, 160, 255);
  textSize(18);
  text("COMPRESSING: Earth.zip", width / 2, 50);

  drawProgressBar();
  drawCountdown();

  let txt = glitchTime > 0 ? glitchText(currentFile) : currentFile;
  if (glitchTime > 0) glitchTime--;

  fill(60, 140, 220);
  textSize(20);
  text(txt, width / 2, height / 2 - 40);

  fill(100, 180, 255);
  textSize(14);
  text("← KEEP    → DELETE", width / 2, height - 50);

  let bubbleText = hasInteractedWithFolder ? "This file is huge!" : "I hope this works...";
  drawSpeechBubble(width - 180, height / 2 - 80, bubbleText);

  if (msgAlpha > 0) {
    fill(150, 220, 255, msgAlpha);
    textSize(14);
    text(message, width / 2, height / 2 + 30);
    msgAlpha -= 2;
  }

  fill(120, 200, 255);
  textSize(14);
  textAlign(LEFT, BOTTOM); 
  text("A (Left) | D (Right)", 20, height - 20); 
  textAlign(CENTER, CENTER);

  if (millis() - lastSecond > 1000) {
    countdown--;
    lastSecond = millis();
  }

  if (countdown <= 0) {
    scene = 3;
    fadeMusic(0.1);
  }

  if (progress >= 100) {
    if (hasDeletedOnce) {
      scene = 3;
      fadeMusic(0.1);
    } else {
      scene = 2;
      fadeMusic(0.6);
    }
  }
}

function drawSuccess() {
  drawImg(width / 2, height - 110, false, 220);
  fill(255);
  textSize(24);
  text("You saved the world again！！！", width / 2, height / 2 - 100);
  
  fill(255);
  textSize(14);
  text("Press R to restart", width / 2, height - 240);
}

function drawFail() {
  let failImg = jamesImgFail2 || jamesImgFail || jamesImgDefault;
  let displayHeight = failImg === jamesImgFail2 ? 280 : 220;
  let displayWidth = displayHeight * (failImg.width / failImg.height);

  imageMode(CENTER);
  image(failImg, width / 2, height - displayHeight / 2, displayWidth, displayHeight);
  imageMode(CORNER);

  fill(255);
  textSize(24);
  text("The rescue failed", width / 2, height / 2 - 120);

  fill(255);
  textSize(16);
  text("But it’s okay. Try again.", width / 2, height / 2 - 80);

  fill(255);
  textSize(14);
  text("Press R to retry your loop", width / 2, height - 240);

  drawSpeechBubble(width - 200, height / 2, "ughhh😭");
}

function drawImg(cx, cy, fail, maxHeight) {
  let img = fail ? (jamesImgFail || jamesImgDefault) : jamesImgDefault;
  if (!img) return;

  let ratio = img.width / img.height;
  let displayHeight = maxHeight;
  let displayWidth = displayHeight * ratio;

  imageMode(CENTER);
  image(img, cx, cy, displayWidth, displayHeight);
  imageMode(CORNER);
}

function drawProgressBar() {
  fill(240);
  rect(width / 2 - 150, 80, 300, 16, 10);

  fill(100, 200, 255);
  rect(width / 2 - 150, 80, map(progress, 0, 100, 0, 300), 16, 10);

  textSize(12);
  fill(100, 200, 255);
  text(progress.toFixed(0) + "%", width / 2, 105);
}

function drawCountdown() {
  fill(100, 180, 255, 220);
  textSize(14);
  text("TIME LEFT: " + countdown + "s", width / 2, height - 80);
}

function drawSpeechBubble(x, y, txt) {
  noStroke();
  fill(255);
  rect(x, y, 150, 50, 14);
  fill(60); 
  textSize(11);
  text(txt, x + 75, y + 25);
}

function keyPressed() {
  if (scene === 0 && key === " ") {
    resetGame();
    scene = 1;
    fadeMusic(0.4);
  }

  if (scene === 1) {
    if (keyCode === LEFT_ARROW) {
      progress += random(6, 10);
      message = "Preserved. Stability ++";
      msgAlpha = 255;
      glitchTime = 8;
      currentFile = random(files);
    }

    if (keyCode === RIGHT_ARROW) {
      hasDeletedOnce = true;
      progress += random(6, 10);
      message = "Deleted. Irreversible.";
      msgAlpha = 255;
      glitchTime = 8;
      currentFile = random(files);
    }
  }

  if (scene >= 2 && (key === "r" || key === "R")) {
    resetGame();
    scene = 0;
    fadeMusic(0.3);
  }
}

function glitchText(t) {
  return t
    .split("")
    .map(ch => (random() > 0.8 ? String.fromCharCode(random(33, 126)) : ch))
    .join("");
}

function resetGame() {
  progress = 0;
  countdown = 15;
  message = "";
  msgAlpha = 0;
  hasDeletedOnce = false;
  currentFile = random(files);
}

function fadeMusic(vol) {
  if (bgm && bgm.isPlaying()) bgm.amp(vol, 2);
}

class Player {
  constructor() {
    this.x = width - 80; 
    this.y = height - 120;
    this.size = 150;
    this.speed = 3;
  }

  move() {
    if (keyIsDown(65)) this.x -= this.speed; 
    if (keyIsDown(68)) this.x += this.speed;

    this.x = constrain(this.x, this.size / 2, width - this.size / 2);
    this.y = constrain(this.y, this.size / 2, height - this.size / 2);
  }
}
