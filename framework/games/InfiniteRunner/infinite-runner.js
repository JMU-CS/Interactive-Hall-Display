function githubAccount() {
    return "nickrhalvorsen";
}
//
//function userpic() {
//  return "halvorsenn.jpeg"
//}
//
function graddate() {
    return "JMU '19";
}

function gameMessageHandler(msg) {

}

let mass = 8;

var position;
var speed; // Used for jumping
var accel; // Gravity simulation
let playerWidth = windowWidth * 0.05;
let playerHeight = windowHeight * 0.1;
let gravity = createVector(0, mass);

let resetY = windowHeight - playerHeight - 30;

function newPlayer() {
    accel = createVector(0, 0);
    speed = createVector(0, 0);
    position = createVector(windowWidth * 0.35,
        windowHeight - playerHeight - 30);
}

function jump() {
    accel = createVector(0, -6.5);
}

function applyForce(force) {
    var f = p5.Vector.div(force, mass);
    accel.add(f);
}

function update() {
    applyForce(gravity);
    speed.add(accel);
    position.add(speed);
    if (position.y >= resetY) {
        position.y = resetY;
        speed = createVector(0,0);
        accel = createVector(0,0);
    }
    position.x = windowWidth * 0.35;
    display();
}

function display() {
    rectMode(CENTER);
    stroke(69, 0, 132);
    strokeWeight(1);
    fill(203, 182, 119);
    rect(position.x, position.y, playerWidth, playerHeight, 5);
}

var environmentObstacles; // Array of obstacles
var environmentRewards; // Array of rewards

var score = 0;
var highScore = 0;
var gameSpeed = 10;

function newGame() {
    environmentObstacles = [];
    environmentRewards = [];
    score = 0;
    gameSpeed = 10;
    newPlayer();
}

function setup() {
    var canv = createCanvas(windowWidth, windowHeight);
    canv.parent("bgCanvas");

    //Setup New Game
    frameRate(gameSpeed);
    newGame();
}

function onClick(elementID, id) {
    if (elementID == "jump") {
        jump();
    }
}

function checkCollisions() {

}

function draw() {
    background(51);
    drawScoreboard();
    changeSpeed();

    update();

    displayGround();
    generateEnvironment();
    checkCollisions();
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
    text("Score: " + score, 110, 85);

    fill(69, 0, 132);
    textSize(25);
    text("High Score: " + highScore, 143, 120);
}

/*Change speed based on score*/
function changeSpeed() {
    if (score >= 5 && score < 10) {
        gameSpeed = 10;
    } else if (score > 10 && score < 15) {
        gameSpeed = 12;
    } else if (score >= 15) {
        gameSpeed = 13;
    }
    frameRate(gameSpeed);
}

function displayGround() {
    rectMode(CENTER);
    stroke(0, 0, 0);
    strokeWeight(2);
    fill(0, 0, 0);
    rect(0, windowHeight - 40, windowWidth * 2, 45, 0);
}

//Player never actually moves, obstacles approach from right
function generateEnvironment() {
    //Depends on score, generate obstacles/rewards
}
