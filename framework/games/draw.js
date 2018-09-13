
function gameMessageHandler(msg) {
  console.log("message received: " + msg);
  whiteBackground = !whiteBackground;
}

var touchX = 0, touchY = 0, lastTouchX = 0, lastTouchY = 0;

function touchMove(x, y, id) {
    touchX = x * windowWidth;
    touchY = y * windowHeight;
}


function setup() {
    var canv = createCanvas(windowWidth, windowHeight);
    canv.parent("bgCanvas");
    background(0,0,0);
}

var currentColor = 0;

function draw() {
    colorMode(RGB, 255);
    fill(0,0,0,10.0);
    rect(0, 0, windowWidth, windowHeight);
    colorMode(HSB, 255);
    stroke(currentColor, 255, 255);
    strokeWeight(10.0);
    currentColor = (currentColor + 1) % 255;
    line(lastTouchX, lastTouchY, touchX, touchY);
    lastTouchX = touchX;
    lastTouchY = touchY;
}
