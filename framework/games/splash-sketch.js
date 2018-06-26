//asteroid clone (core mechanics only)
//arrow keys to move + x to shoot
var whiteBackground = false;

function gameMessageHandler(msg) {
  console.log("message received: " + msg);
  whiteBackground = !whiteBackground;
}

class Sparkler {
    constructor() {
        this.speed = Math.random()*5+1;
        var theta = Math.random() * 2 * Math.PI;
        this.vx = Math.cos(theta) * this.speed;
        this.vy = Math.sin(theta) * this.speed;
        this.px = Math.random()*windowWidth;
        this.py = Math.random()*windowHeight;
        this.color = Math.random()*255;
        this.color_speed = (Math.random() - 0.5);
    }

    update() {
        this.px += this.vx;
        this.py += this.vy;
      
        if (this.px < 0) {
            this.px = 0;
            this.vx = -this.vx;
        } else if (this.px > windowWidth) {
            this.px = windowWidth;
            this.vx = -this.vx;
        }
      
        if (this.py < 0) {
            this.py = 0;
            this.vy = -this.vy;
        } else if (this.py > windowHeight) {
            this.py = windowHeight;
            this.vy = -this.vy;
        }
      
        if (Math.random(20) == 1) {
          var theta = Math.random()/10.0;
          this.vx = this.vx * Math.cos(theta) - this.vy * Math.sin(theta);
          this.vy = this.vx * Math.sin(theta) + this.vy * Math.cos(theta);
        }
        this.color += this.color_speed;
        if (this.color < 0) this.color += 255;
        if (this.color > 255) this.color -= 255;
      }

      drawAt(x, y) {
        drawCircles(x, y, color(Math.round(this.color), 255, 255));
      }

      draw() {
        this.drawAt(this.px, this.py);
      }

}

var sparklers = [];
var mouseSparkler = new Sparkler();

function setup() {
  var canv = createCanvas(windowWidth, windowHeight);
  canv.parent("bgCanvas");
  
  colorMode(HSB, 255);
  for (var i = 0; i < 3; i++) {
    sparklers.push(new Sparkler());
  }
}

function drawCircles(cx, cy, fillColor) {

  noStroke();
  fill(fillColor);

  for (var i = 0; i < windowWidth / 64.0; i++) {
    for (var j = 0; j < windowHeight / 64.0; j++) {
      var x = i * 64;
      var y = j * 64;
      var dx = cx - x;
      var dy = cy - y;
      var d = Math.sqrt(dx*dx + dy*dy);
      if (d < 512) {
        ellipse(x, y, d/8, d/8);
      }
    }
  }
}

function draw() {
  if (whiteBackground) 
    background(255,0,255);
  else 
    background(255,255,0);
  fill(254, 190, 190);
  textAlign(RIGHT);
  textSize(12);

  for (var i = 0; i < sparklers.length; i++) {
      sparklers[i].draw();
  }

  mouseSparkler.drawAt(mouseX, mouseY);

  drawSprites();

  update();
}

function update() {
  
    for (var i = 0; i < sparklers.length; i++) {
      sparklers[i].update();
    }
    mouseSparkler.update();

}

function mouseClicked() {
  //alert("hi");
}