//asteroid clone (core mechanics only)
//arrow keys to move + x to shoot

function gameMessageHandler(msg) {
}

var speed = 5;
var vx = speed;
var vy = speed;
var px, py;

function setup() {
  var canv = createCanvas(windowWidth, windowHeight);
  canv.parent("bgCanvas");

  px = Math.random(windowWidth);
  py = Math.random(windowHeight);  
}

function drawCircles(cx, cy, fillColor) {

  noStroke();
  fill(fillColor);

  for (var i = 0; i < windowWidth / 128.0; i++) {
    for (var j = 0; j < windowHeight / 128.0; j++) {
      var x = i * 128;
      var y = j * 128;
      var dx = cx - x;
      var dy = cy - y;
      var d = Math.sqrt(dx*dx + dy*dy);
      if (d < 1024) {
        ellipse(x, y, d/8, d/8);
      }
    }
  }
}

function draw() {
  background(255);
  fill(254, 190, 190);
  textAlign(RIGHT);
  textSize(12);

  drawCircles(px, py, color(0,255,0,255));
  drawCircles(mouseX, mouseY, color(0,0,255,155));

  drawSprites();

  update();
}

function update() {
  px += vx;
  py += vy;

  if (px < 0) {
    px = 0;
    vx = -vx;
  } else if (px > windowWidth) {
    px = windowWidth;
    vx = -vx;
  }

  if (py < 0) {
    py = 0;
    vy = -vy;
  } else if (py > windowHeight) {
    py = windowHeight;
    vy = -vy;
  }

  if (Math.random(20) == 1) {
    var theta = Math.random(100)/1000.0;
    vx = vx * Math.cos(theta) - vy * Math.sin(theta);
    vy = vx * Math.sin(theta) + vy * Math.cos(theta);
  }

}

function mouseClicked() {
  //alert("hi");
}