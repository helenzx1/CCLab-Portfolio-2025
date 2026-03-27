// ------------------------------------
// 1. 全局变量
// ------------------------------------

// ml5 的 FaceMesh 模型
let faceMesh;

// 摄像头
let video;

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
  // 创建全屏画布
  createCanvas(windowWidth, windowHeight);

  // 创建额外图层，专门画火焰
  fireLayer = createGraphics(windowWidth, windowHeight);

  // 打开摄像头
  video = createCapture(VIDEO);

  // 摄像头大小和画布一样大
  video.size(windowWidth, windowHeight);

  // 隐藏原本 HTML 的 video
  // 因为我们要自己画到 p5 canvas 上
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

  // 清空火焰按钮
  clearButton = createButton("Clear Fire");
  clearButton.position(20, 55);
  clearButton.mousePressed(clearFire);

  // 保存图片按钮
  saveButton = createButton("Save Photo");
  saveButton.position(110, 55);
  saveButton.mousePressed(savePhoto);
}


// ------------------------------------
// 5. draw()
// 每一帧都会运行
// ------------------------------------
function draw() {
  // 清空背景
  background(255);

  // 画镜像摄像头
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
// 这样看起来更像自拍镜子
// ------------------------------------
function drawMirroredVideo() {
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
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
// 重点：这里不要再写 width - x
// 因为你已经用了 flipped:true
// ------------------------------------
function drawHorns(points) {
  // FaceMesh 眉毛附近的点
  let leftBrow = getPoint(points, 105);
  let rightBrow = getPoint(points, 334);

  if (!leftBrow || !rightBrow) {
    return;
  }

  // 这里直接用点位原本的 x
  // 不要再写 width - leftBrow.x
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
// 重点：嘴巴中心也不要再写 width - x
// ------------------------------------
function emitFireWhenMouthOpens(points) {
  // 嘴巴相关点位
  let leftMouth = getPoint(points, 61);
  let rightMouth = getPoint(points, 291);
  let topLip = getPoint(points, 13);
  let bottomLip = getPoint(points, 14);

  // 用脸高做参考，让判断更稳
  let topFace = getPoint(points, 10);
  let bottomFace = getPoint(points, 152);

  if (!leftMouth || !rightMouth || !topLip || !bottomLip || !topFace || !bottomFace) {
    return;
  }

  // 嘴巴宽度：左右嘴角距离
  let mouthWidth = dist(
    leftMouth.x, leftMouth.y,
    rightMouth.x, rightMouth.y
  );

  // 嘴巴张开高度：上下嘴唇距离
  let mouthOpen = abs(bottomLip.y - topLip.y);

  // 脸高：防止离摄像头远近变化太大
  let faceHeight = abs(bottomFace.y - topFace.y);

  // 嘴巴张开比例
  let mouthRatio = mouthOpen / faceHeight;

  // 门槛调低：只要稍微张开一点就喷火
  let openThreshold = 0.025;

  if (mouthRatio > openThreshold) {
    // 嘴巴中心
    // 这里也直接用原本的 x
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
    // 位置
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
  // 每一帧先清空火焰图层
  fireLayer.clear();
  fireLayer.noStroke();

  // 倒着循环，删除粒子更安全
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
// 点击按钮后调用
// ------------------------------------
function clearFire() {
  fire = [];
}


// ------------------------------------
// 16. 保存当前画面
// 点击按钮后调用
// ------------------------------------
function savePhoto() {
  saveCanvas("face_fire_filter", "png");
}


// ------------------------------------
// 17. 浏览器窗口变化时更新尺寸
// 防止下面留白
// ------------------------------------
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  fireLayer = createGraphics(windowWidth, windowHeight);
  video.size(windowWidth, windowHeight);
}
