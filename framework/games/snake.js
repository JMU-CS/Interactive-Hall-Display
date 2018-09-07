function gameMessageHandler(msg) {

}

var score = 0;
var highScore = 0;

var foodX;
var foodY;

function setup() {
  var canv = createCanvas(windowWidth, windowHeight);
  canv.parent("bgCanvas");

  //Setup New Game
  frameRate(10); //TODO Change speed based on score?
  generateFood();
  newGame();
}

//TODO Player Movement...
/**
function touchMove(x, y) {
    touchX = x * windowWidth;
    touchY = y * windowHeight;
}**/

//Used for testing
function mousePressed() {
  dir = "up";
}

function draw() {
  background(51);

  drawScoreboard();

  moveSnake();
  displaySnake();
  displayFood();
  checkEatFood();
}

/* SCOREBOARD */
function drawScoreboard() {
  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  stroke(118, 22, 167);
  strokeWeight(2);
  fill(255, 204 , 0, 150);
  rect(150, 100, 230, 90);

  fill(118, 22, 167);
  strokeWeight(0);
  textSize(25);
  text( "Score: " + score, 120, 75);

  fill(118, 22, 167);
  textSize(25);
  text( "High Score: " + highScore, 150, 120);
}

/* FOOD */
function generateFood() {
  foodX = Math.floor(Math.random() * (windowWidth - 10)) + 10;
  foodY = Math.floor(Math.random() * (windowHeight - 10)) + 10;
}

function displayFood() {
  strokeWeight(0);
  fill(118,22,167);
  rect(foodX, foodY, 25, 25);
}


/* SNAKE */
var len,dir;
var xpos, ypos;

function newGame() {
  len = 1;
  dir = "right";
  //snake starting location
  xpos = [400];
  ypos = [300];
}

function displaySnake() {
  rectMode(CENTER);
  var i;
  for (i = 0; i < len; i++) {
    stroke(179, 140, 198);
    strokeWeight(2);
    fill(255, 204 , 0);
    rect(xpos[i], ypos[i], 25, 25);
  }
}

function increaseSnakeSize() {
  xpos[len] = xpos[len-1]+25;
  ypos[len] = ypos[len-1]+25;
  len++;
}

function moveSnake() {
  var i;
  for(i = len-1; i > 0; i=i-1) {
    xpos[i] = xpos[i-1];
    ypos[i] = ypos[i-1];
  }
  if(dir == "up") {
    ypos[0] = ypos[0] - 25;
  }
  if(dir == "down") {
    ypos[0] = ypos[0] + 25;
  }
  if(dir == "right") {
    xpos[0] = xpos[0] + 25;
  }
  if(dir == "left") {
    xpos[0] = xpos[0] - 25;
  }
  //Wrap on screen
  xpos[0] = (xpos[0] + windowWidth) % windowWidth;
  ypos[0] = (ypos[0] + windowHeight) % windowHeight;

  //Reset Snake
  if(checkCollide() == true ) {
    len = 1;
    xpos = [400];
    ypos = [300];
    score = 0;
  }
}

function checkEatFood() {
  if(dist(foodX, foodY, xpos[0], ypos[0]) < 25 ) {
    generateFood();
    increaseSnakeSize();
    score++;
    if(highScore < score) {
      highScore = score;
    }
  }
}

function checkCollide() {
  var i;
  for(i = 1; i < len; i++) {
    if(dist(xpos[0], ypos[0], xpos[i], ypos[i]) < 25) {
      return true;
    }
  }
  return false;
}
