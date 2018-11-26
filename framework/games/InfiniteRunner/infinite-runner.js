
//function githubAccount() {
//  return "nickrhalvorsen";
//}
//
//function userpic() {
//  return "halvorsenn.jpeg"
//}
//
//function graddate() {
//  return "JMU '19";
//}

function gameMessageHandler(msg) {

}

// Always right facing
var xpos, ypos;
var jumpDelay; // Frame between consecutive jumps
var environmentObstacles; // Array of obstacles
var environmentRewards; // Array of rewards

var score = 0;
var highScore = 0;
var snakeSize = 40;
var gameSpeed = 9;

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

function touchStart(x, y, id) {
  // On touch, just jump?
  jump();
}

function jump() {
  ypos = ypos + 20;
  jumpDelay = 300;
}

function jumpDecay() {
  if (jumpDelay > 0) {
    ypos = ypos - (20 - jumpDelay / 20);
  }
  jumpDelay = jumpDelay > 0 ? jumpDelay - 1 : 0;
}

function checkCollisions() {
  // Check xpos,ypos against obstacles
  // Check xpos,ypos against 
}

function draw() {
  background(51);
  drawScoreboard();
  changeSpeed();
  displayPlayer();
  generateEnvironment();
  checkCollisions();
  jumpDecay();
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

function newGame() {
  xpos = windowWidth / 2;
  ypos = windowHeight - 20;
  jumpDelay = 0;
}

function displayPlayer() {
  rectMode(CENTER);
  stroke(69, 0 132);
  strokeWeight(1);
  fill(203, 182, 119);
  rect(xpos, ypos, 5, 5, 5);
}

//Player never actually moves, obstacles approach from right

function generateEnvironment() {
  //Depends on score, generate obstacles/rewards

}
