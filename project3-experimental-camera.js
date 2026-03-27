// ------------------------------------
// 1. 全局变量
// ------------------------------------

// ml5 的 FaceMesh 模型
let faceMesh;

// 摄像头
let video;

// 摄像头原始尺寸
let camW = 640;
let camH = 480;

// 存检测到的人脸结果
let faces = [];

// 火焰粒子数组
let fire = [];

// createGraphics() 做出来的额外图层
let fireLayer;

// DOM 元素
let instructionText;
let clearButton;
let saveButton;


// ------------------------------------
// 2. preload()
// 先加载 FaceMesh 模型
// ------------------------------------
function preload() {
  faceMesh = ml5.faceMesh({
    maxFaces: 1,
    flipped: true
  });
}


// ------------------------------------
// 3. gotFaces()
// 每次模型检测到脸，就会把结果传进来
// ------------------------------------
function gotFaces(results) {
  faces = results;
}


// ------------------------------------
// 4. setup()
// 只运行一次，负责初始化
// ------------------------------------
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);

  // 如果 html 里有 sketch-container，就把画布放进去
  if (document.getElementById("sketch-container")) {
    canvas.parent("sketch-container");
  }

  // 创建额外图层，专门画火焰
  fireLayer = createGraphics(windowWidth, windowHeight);

  // 打开摄像头
  video = createCapture(VIDEO, function () {
    // 摄像头准备好后，记录真实宽高
    camW = video.elt.videoWidth || 640;
    camH = video.elt.videoHeight || 480;

    // 保持摄像头原始比例，不强行拉满窗口
    video.size(camW, camH);
  });

  // 隐藏原本 HTML 的 video
  video.hide();

  // 开始检测人脸
  faceMesh.detectStart(video, gotFaces);

  // -----------------------------
  // DOM interaction
  // -----------------------------

  // 说明文字
  instructionText = createP("Open your mouth to breathe fire");
  instructionText.position(20, 10);
  instructionText.style("margin", "0");
  instructionText.style("padding", "8px 12px");
  instructionText.style("font-family", "Arial");
  instructionText.style("font-size", "18px");
  instructionText.style("color", "#7a0026");
  instructionText.style("background", "rgba(255,255,255,0.75)");
  instructionText.style("border-radius", "10px");
  instructionText.style("z-index", "10");

  // 清空火焰按钮
  clearButton = createButton("Clear Fire");
  clearButton.position(20, 55);
  clearButton.mousePressed(clearFire);
  clearButton.style("z-index", "10");

  // 保存图片按钮
  saveButton = createButton("Save Photo");
  saveButton.position(110, 55);
  saveButton.mousePressed(savePhoto);
  saveButton.style("z-index", "10");
}


// ------------------------------------
// 5. draw()
// 每一帧都会运行
// ------------------------------------
function draw() {
  // 清空背景
  background(255);

  // 画镜像摄像头（不变形版本）
  drawMirroredVideo();

  // 取第一张脸的点位
  let points = getFacePoints();

  // 如果有检测到脸，才继续
  if (points) {
    drawHorns(points);
    emitFireWhenMouthOpens(points);
  }

  // 更新并绘制火焰
  updateAndDrawFire();

  // 把火焰图层贴回主画布
  image(fireLayer, 0, 0);
}


// ------------------------------------
// 6. 画镜像摄像头
// 不变形：保持原始宽高比
// cover 模式：铺满屏幕但不拉伸，可能裁掉一点边缘
// ------------------------------------
function drawMirroredVideo() {
  if (!video || !video.elt || !video.elt.videoWidth || !video.elt.videoHeight) {
    return;
  }

  let vw = video.elt.videoWidth;
  let vh = video.elt.videoHeight;

  let videoRatio = vw / vh;
  let canvasRatio = width / height;

  let drawW, drawH, offsetX, offsetY;

  // cover：铺满但不变形
  if (videoRatio > canvasRatio) {
    // 视频更宽，按高度铺满，左右裁切
    drawH = height;
    drawW = height * videoRatio;
    offsetX = (width - drawW) / 2;
    offsetY = 0;
  } else {
    // 视频更高，按宽度铺满，上下裁切
    drawW = width;
    drawH = width / videoRatio;
    offsetX = 0;
    offsetY = (height - drawH) / 2;
  }

  push();
  translate(width, 0);
  scale(-1, 1);

  // 注意：镜像后 x 的写法不能直接用 offsetX
  image(video, -offsetX - drawW, offsetY, drawW, drawH);

  pop();
}


// ------------------------------------
// 7. 读取 FaceMesh 点位
// 把结果整理成比较好用的格式
// ------------------------------------
function getFacePoints() {
  // 如果没有检测到脸，就返回 null
  if (!faces || faces.length === 0) {
    return null;
  }

  let face = faces[0];

  // ml5 常见格式：face.keypoints
  if (face.keypoints && face.keypoints.length > 0) {
    return face.keypoints.map(function (pt) {
      return {
        x: pt.x,
        y: pt.y
      };
    });
  }

  // 备用：如果返回的是数组格式
  if (Array.isArray(face)) {
    return face.map(function (pt) {
      return {
        x: pt[0],
        y: pt[1]
      };
    });
  }

  return null;
}


// ------------------------------------
// 8. 安全获取某一个点
// ------------------------------------
function getPoint(points, index) {
  if (!points || !points[index]) {
    return null;
  }
  return points[index];
}


// ------------------------------------
// 9. 画恶魔角
// 不要再写 width - x
// 因为你已经用了 flipped:true
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

  fill(120, 0, 0);
  noStroke();

  // 左边角
  triangle(
    x1 - 18, y1 - 70,
    x1 + 18, y1 - 70,
    x1, y1 - 190
  );

  // 右边角
  triangle(
    x2 - 18, y2 - 70,
    x2 + 18, y2 - 70,
    x2, y2 - 190
  );
}


// ------------------------------------
// 10. 判断嘴巴是否张开
// 只要稍微张开一点就喷火
// ------------------------------------
function emitFireWhenMouthOpens(points) {
  let leftMouth = getPoint(points, 61);
  let rightMouth = getPoint(points, 291);
  let topLip = getPoint(points, 13);
  let bottomLip = getPoint(points, 14);

  let topFace = getPoint(points, 10);
  let bottomFace = getPoint(points, 152);

  if (!leftMouth || !rightMouth || !topLip || !bottomLip || !topFace || !bottomFace) {
    return;
  }

  // 嘴巴宽度
  let mouthWidth = dist(
    leftMouth.x, leftMouth.y,
    rightMouth.x, rightMouth.y
  );

  // 嘴巴张开高度
  let mouthOpen = abs(bottomLip.y - topLip.y);

  // 脸高
  let faceHeight = abs(bottomFace.y - topFace.y);

  // 嘴巴张开比例
  let mouthRatio = mouthOpen / faceHeight;

  // 门槛调低：只要稍微张开一点就喷火
  let openThreshold = 0.025;

  if (mouthRatio > openThreshold) {
    // 嘴巴中心
    let centerX = (leftMouth.x + rightMouth.x) / 2;
    let centerY = (topLip.y + bottomLip.y) / 2 + 8;

    // 张得越大，喷得越多
    let amount = floor(
      map(
        constrain(mouthRatio, openThreshold, 0.18),
        openThreshold,
        0.18,
        3,
        9
      )
    );

    // 嘴巴越宽，火焰散开的范围越大
    let spread = mouthWidth * 0.22;

    for (let i = 0; i < amount; i++) {
      fire.push(
        makeFireParticle(
          centerX + random(-spread, spread),
          centerY + random(-5, 5),
          mouthWidth,
          mouthRatio
        )
      );
    }
  }
}


// ------------------------------------
// 11. 创建一个火焰粒子
// ------------------------------------
function makeFireParticle(x, y, mouthWidth, mouthRatio) {
  return {
    x: x,
    y: y,

    // 粒子大小
    size: random(mouthWidth * 0.12, mouthWidth * 0.26) + random(4, 8),

    // 左右轻微散开
    vx: random(-2.0, 2.0),

    // 向上速度
    vy: random(-4.8, -2.0) - mouthRatio * 10,

    // 透明度
    alpha: 255,

    // 每一帧缩小一点
    shrink: random(0.08, 0.16),

    // 一部分是主火焰，一部分是小火花
    isSpark: random() < 0.38
  };
}


// ------------------------------------
// 12. 更新并绘制火焰
// ------------------------------------
function updateAndDrawFire() {
  fireLayer.clear();
  fireLayer.noStroke();

  for (let i = fire.length - 1; i >= 0; i--) {
    let p = fire[i];

    // 更新位置
    p.x += p.vx;
    p.y += p.vy;

    // 继续往上飘一点
    p.vy -= 0.02;

    // 左右速度慢慢减弱
    p.vx *= 0.98;

    // 透明度减少
    if (p.isSpark) {
      p.alpha -= 12;
    } else {
      p.alpha -= 8;
    }

    // 粒子慢慢变小
    p.size -= p.shrink;

    // 根据类型画不同效果
    if (p.isSpark) {
      drawSpark(p);
    } else {
      drawSingleFlame(p);
    }

    // 太小或者太透明就删除
    if (p.alpha <= 0 || p.size <= 1) {
      fire.splice(i, 1);
    }
  }

  // 限制数量，避免太卡
  if (fire.length > 500) {
    fire.splice(0, fire.length - 500);
  }
}


// ------------------------------------
// 13. 画主火焰
// 用三层椭圆做出火苗效果
// ------------------------------------
function drawSingleFlame(p) {
  let outerW = p.size * 0.9;
  let outerH = p.size * 2.3;

  // 外层：深红橙
  fireLayer.fill(255, 60, 0, p.alpha * 0.40);
  fireLayer.ellipse(p.x, p.y, outerW, outerH);

  // 中层：亮橙色
  fireLayer.fill(255, 145, 0, p.alpha * 0.68);
  fireLayer.ellipse(
    p.x,
    p.y - outerH * 0.16,
    outerW * 0.68,
    outerH * 0.72
  );

  // 内层：亮黄色
  fireLayer.fill(255, 235, 140, p.alpha * 0.92);
  fireLayer.ellipse(
    p.x,
    p.y - outerH * 0.30,
    outerW * 0.35,
    outerH * 0.42
  );
}


// ------------------------------------
// 14. 画小火花
// 比主火焰更小、更亮
// ------------------------------------
function drawSpark(p) {
  // 内层亮点
  fireLayer.fill(255, 235, 160, p.alpha);
  fireLayer.ellipse(p.x, p.y, p.size * 0.42, p.size * 0.42);

  // 外层淡橙色光
  fireLayer.fill(255, 150, 0, p.alpha * 0.45);
  fireLayer.ellipse(p.x, p.y, p.size * 0.95, p.size * 0.95);
}


// ------------------------------------
// 15. 清空火焰
// ------------------------------------
function clearFire() {
  fire = [];
}


// ------------------------------------
// 16. 保存当前画面
// ------------------------------------
function savePhoto() {
  saveCanvas("face_fire_filter", "png");
}


// ------------------------------------
// 17. 浏览器窗口变化时更新尺寸
// 不要再 video.size(windowWidth, windowHeight)
// 不然会再次拉伸变形
// ------------------------------------
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  fireLayer = createGraphics(windowWidth, windowHeight);
}
