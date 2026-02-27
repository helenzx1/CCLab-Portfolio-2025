let font;                 // 定义一个变量 font，用来存字体对象
let points = [];          // 定义数组 points，用来存“LOVE”轮廓采样出来的点
let word = "LOVE";        // 要显示/生成的文字
let t = 0;                // 时间变量（让动画动起来），每帧都会增加

function preload() {      
  font = loadFont("font.ttf");  // 在程序开始前加载字体文件，避免字体没加载就用导致报错
}

function setup() {
  let canvas = createCanvas(600, 600); 
  
  // 下面这一段是“防御性代码”
  // 目的：如果网页里有 id="sketch-container" 的容器，就把画布放进去
  // 如果没有这个容器，就不执行 parent()，避免 appendChild 报错
  if (document.getElementById("sketch-container")) {
    canvas.parent("sketch-container");
  }

  points = font.textToPoints(word, 40, 340, 180, {
    sampleFactor: 0.15 
  });
}

function draw() {
  background(255, 245, 248); 
  
  for (let i = 0; i < points.length; i++) {
    let p = points[i];       
    let wave = sin(t + i * 0.1) * 3;
    
    let d = dist(mouseX, mouseY, p.x, p.y); 
    
    let ripple = map(d, 0, 150, 15, 0, true);
    
    let angle = atan2(p.y - mouseY, p.x - mouseX);
    
    let nx = p.x + cos(angle) * ripple;
    let ny = p.y + sin(angle) * ripple + wave;


    let lineWidth = 6;       
    

    let r = 255;
    
    // g：随时间变化，在 120~200 之间摆动
    // sin(...) 输出 -1~1，被 map 成 120~200
    let g = map(sin(t + i * 0.05), -1, 1, 120, 200);
    
    // b：随时间变化，在 160~100 之间摆动（范围偏暖）
    // cos(...) 输出 -1~1，被 map 成 160~100
    let b = map(cos(t + i * 0.05), -1, 1, 160, 100);
    
    // 设置描边颜色：带透明度 180（0~255）
    // 透明度让线条叠加更柔和
    stroke(r, g, b, 180);
    
    strokeWeight(1.5);      // 线条粗细
    
    // tilt：轻微倾斜量
    // 让线条两端一高一低，就会看起来像“纤维/水波”而不是死水平线
    let tilt = sin(t + i * 0.2) * 2;
    
    // 画线：从 (nx - lineWidth, ny + tilt) 到 (nx + lineWidth, ny - tilt)
    // 这样两端的 y 不一样 → 线就轻微倾斜
    line(nx - lineWidth, ny + tilt, nx + lineWidth, ny - tilt);
  }

  t += 0.04; 
}