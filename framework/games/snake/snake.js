
function githubAccount() {
  return "nickrhalvorsen";
}

function userpic() {
  return "halvorsenn.jpeg"
}

function graddate() {
  return "JMU '19";
}

function gameMessageHandler(msg) {

}

var score = 0;
var highScore = 0;
var snakeSize = 40;
var gameSpeed = 9;

var foodX;
var foodY;
var touchX;
var touchY;

function setup() {
  var canv = createCanvas(windowWidth, windowHeight);
  canv.parent("bgCanvas");

  //Setup New Game
  frameRate(gameSpeed);
  generateFood();
  newGame();
}

function onClick(elementID, id) {
  if(elementID === "up" && dir !== "down") {
    dir = "up";
  } else if (elementID === "down" && dir !== "up") {
    dir = "down";
  } else if (elementID === "left" && dir !== "right") {
    dir = "left";
  } else if (elementID === "right" && dir !== "left") {
    dir = "right";
  }
}

function touchStart(x, y, id) {
  // not used anymore
}

function draw() {
  background(51);

  drawScoreboard();
  changeSpeed();

  moveSnake();
  displayFood();
  displaySnake();
  checkEatFood();
}

/* SCOREBOARD */
function drawScoreboard() {
  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  stroke(69, 0, 132);
  strokeWeight(2);
  fill(203, 182, 119);
  rect(150, 100, 230, 90);

  fill(69, 0, 132);
  strokeWeight(0);
  textSize(25);
  text( "Score: " + score, 110, 85);

  fill(69, 0, 132);
  textSize(25);
  text( "High Score: " + highScore, 143, 120);
}

/*Change speed based on score*/
function changeSpeed() {
  if(score >= 5 && score < 10) {
    gameSpeed = 10;
  } else if(score > 10 && score < 15) {
    gameSpeed = 12;
  } else if(score >= 15) {
    gameSpeed = 13;
  }
  frameRate(gameSpeed);
}

/* FOOD */
function generateFood() {
  foodX = Math.floor(Math.random() * (windowWidth - 10)) + 10;
  foodY = Math.floor(Math.random() * (windowHeight - 10)) + 10;
}

function displayFood() {
  strokeWeight(1);
  stroke(0, 0, 0);
  fill(198,0,0);
  rect(foodX, foodY, 35, 35, 20);

  strokeWeight(2);
  line(foodX, foodY-10, foodX+5, foodY-20);
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
    stroke(69, 0, 132);
    strokeWeight(2);
    fill(203, 182, 119);
    rect(xpos[i], ypos[i], snakeSize, snakeSize, 5);
    if(i == 0) {
      fill(51);
      ellipse(xpos[i]+8, ypos[i]-8, 6, 6);
    }
  }
}

function increaseSnakeSize() {
  xpos[len] = xpos[len-1]+snakeSize;
  ypos[len] = ypos[len-1]+snakeSize;
  len++;
}

function moveSnake() {
  var i;
  for(i = len-1; i > 0; i=i-1) {
    xpos[i] = xpos[i-1];
    ypos[i] = ypos[i-1];
  }
  if(dir == "up") {
    ypos[0] = ypos[0] - snakeSize;
  }
  if(dir == "down") {
    ypos[0] = ypos[0] + snakeSize;
  }
  if(dir == "right") {
    xpos[0] = xpos[0] + snakeSize;
  }
  if(dir == "left") {
    xpos[0] = xpos[0] - snakeSize;
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
    gameSpeed = 9;
  }
}

function checkEatFood() {
  if(dist(foodX, foodY, xpos[0], ypos[0]) < snakeSize ) {
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
    if(dist(xpos[0], ypos[0], xpos[i], ypos[i]) < snakeSize) {
      return true;
    }
  }
  return false;
}
