
function setup() {
  // create the canvas
  canvas = createCanvas(400, 400);
  // attach the canvas to the div in your HTML
  canvas.parent("sketch-container");
function setup() {
  createCanvas(400, 400);
  noStroke();
  fill(120, 140, 160);
  rect(0, 0, 400, 400/5); 

  fill(140, 160, 170);
  rect(0, 400/5, 500, 400/5); 

  fill(170, 150, 130);
  rect(0, 2*400/5, 500, 400/5); 

  fill(200, 160, 120);
  rect(0, 3*400/5, 500, 400/5); 

  fill(245, 170, 95);
  rect(0, 4*400/5, 500, 400/5); 
}

function draw() {
//background（mountain）
fill(40, 90, 60);
triangle(0, 300, 0, 90, 200, 300);

fill(100, 150, 130, );  
triangle(0, 300, 140, 110, 250, 300);
  

fill(20, 120, 80);
triangle(150, 300, 250, 180, 350, 300);

fill(40, 90, 60);
triangle(250, 300, 350, 200, 450, 300);
  
fill(100, 150, 130);  
triangle(450,300,140 + 450, 110,250 + 450, 300);
  

//River
fill(30, 144, 255, 180); 
stroke(139, 69, 19);      
strokeWeight(1);
beginShape();
vertex(0, 350);
vertex(0, 310);
vertex(170, 400);
vertex(60, 400);
endShape(CLOSE);
blendMode(BLEND);
  
  
//ROCK
  fill(100, 100, 100);
  noStroke();
  
  ellipse(10, 310, 15, 10);
  ellipse(30, 320, 12, 8);
  ellipse(50, 315, 18, 12);

  ellipse(10, 370, 20, 14);
  ellipse(30, 380, 16, 10);
  ellipse(50, 385, 14, 9);

  ellipse(130, 360, 18, 12);
  ellipse(170, 390, 20, 14);
  ellipse(140, 370, 20, 10);
  ellipse(150, 380, 12, 8);
  
  


//bamboo
  drawBamboo(120, 300, 100);
  drawBamboo(150, 300, 120);
  drawBamboo(65, 300, 120);
  drawBamboo(380, 300, 90); 
  drawBamboo(430, 300, 95);
  drawBamboo(460, 300, 130);
  drawBamboo(490, 300, 105);
  drawBamboo(520, 300, 115);
  drawBamboo(550, 300, 100);
  
  fill(139, 69, 19);
  rect(250, 330, 80, 15);
  rect(250, 330, 10, 40);
  rect(320, 330, 10, 40);

  rect(180, 340, 40, 12);   
  rect(180, 352, 7, 25);    
  rect(213, 352, 7, 25);
//bowl
  fill(0, 0, 0);
  ellipse(290, 330, 20, 6);

//FOOD
fill(255, 140, 0);
ellipse(285, 330, 4, 3);
ellipse(295, 330, 4, 3);
ellipse(290, 330, 4, 3);
ellipse(297.5, 330, 2.5, 2);


//House
fill(30);
rect(200, 180, 200, 120); 
fill(35);
rect(200, 240, 200, 60); 

fill(20);
quad(190,180,410,180,350,120, 250,120);

fill(40);
rect(190, 175, 220, 8); 

//door
fill(60, 40, 20);
rect(290, 230, 40, 70);
fill(50, 30, 15);
rect(290, 225, 40, 5); 
stroke(80, 50, 30);
line(300, 230, 300, 300); 
line(310, 230, 310, 300);
line(320, 230, 320, 300);
noStroke();

//windows
fill(255, 220, 120);
rect(220, 200, 40, 30); 
rect(340, 200, 40, 30); 
stroke(60); 
line(240, 200, 240, 230); 
line(360, 200, 360, 230);

//Light
fill(255, 220, 100); 
ellipse(220, 220, 20, 30);  
ellipse(380, 220, 20, 30);

stroke(100);
line(220, 205, 220, 184);  
line(380, 205, 380, 184);
noStroke();


fill(255, 220, 100, 80);
noStroke();
ellipse(220, 220, 50, 50);
ellipse(380, 220, 50, 50);
//Cloud
fill(230, 255, 255);
noStroke();
ellipse(80, 70, 80, 25);
ellipse(110, 60, 60, 20);
ellipse(95, 55, 70, 22);
  
fill(230, 255, 255);
ellipse(420, 50, 90, 30);
ellipse(450, 65, 70, 18);
ellipse(435, 45, 75, 25);
    }
  

function drawBamboo(x, y, h) {
  let w = 12; 
  fill(60, 160, 80);
  noStroke();
  rect(x - w/3, y - h, w, h);

  stroke(40, 120, 60);
  strokeWeight(2);
  line(x - w/2, y - h*0.2, x + w/2, y - h*0.2);
  line(x - w/2, y - h*0.4, x + w/2, y - h*0.4);
  line(x - w/2, y - h*0.6, x + w/2, y - h*0.6);
  line(x - w/2, y - h*0.8, x + w/2, y - h*0.8);

  noStroke();
  drawLeaf(x + 10, y - h*0.3, PI/6, 30, 8,               color(40,140,70));
  drawLeaf(x - 12, y - h*0.5, -PI/4, 35, 10,             color(30,120,60));
  drawLeaf(x + 8, y - h*0.7, PI/6, 28, 7,                 color(25,100,50));
  drawLeaf(x + 6, y - h*0.65, PI/3, 28, 7,               color(20,100,10));
}

function drawLeaf(x, y, angle, leafW, leafH, c) {
  push();
  translate(x, y);
  rotate(angle);
  fill(c);
  ellipse(0, 0, leafW, leafH);
  pop();
  
  
}
