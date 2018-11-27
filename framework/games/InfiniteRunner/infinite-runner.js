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

let entityLimit = 18;
let baseSpeed = -40;

let playerWidth = windowWidth * 0.05;
let playerHeight = windowHeight * 0.1;
let playerOffset = 50;

let mass = 0.5;
let gravity = createVector(0, 30 * mass);

let jumpCount = 0;
let radius = playerWidth / 2;

var position;
var speed; // Used for jumping
var accel; // Gravity simulation

let resetY = windowHeight - playerHeight - 30;

function newPlayer() {
    accel = createVector(0, 0);
    speed = createVector(0, 0);
    position = createVector(windowWidth * 0.35,
        windowHeight - playerHeight - playerOffset);
    jumpCount = 0;
}

function jump() {
    if (jumpCount < 2) {
        jumpCount += 1;
        var jumpForce = jumpCount == 1 ? -90 : -80;
        accel = createVector(0, jumpForce);
    }
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
        jumpCount = 0;
    }
    position.x = windowWidth * 0.35;

    //Move rewards & obstacles
    let ospd = createVector(baseSpeed + (-0.01 * score), 0);
    for (let i = 0; i < envObst.length; i++)
    {
        let v = createVector(envObst[i][0], envObst[i][1]);
        v.add(ospd);
        if (v.x <= 0)
        {
            envObst.splice(i, 1);
        } else {
            envObst[i][0] = v.x;
            envObst[i][1] = v.y;
        }
    }


    display();
}

function display() {
    rectMode(CORNER);
    stroke(69, 0, 132);
    strokeWeight(1);
    fill(203, 182, 119);
    rect(position.x, position.y, playerWidth, playerHeight, 5);

    strokeWeight(3);
    let len = envObst.length;
    for (let i=0;i<len;i++) {
        fill(randomInt(225, 1), randomInt(100, 50), randomInt(100,50));
        ellipse(envObst[i][0], envObst[i][1], radius, radius);
    }

}

var envObst; // Array of obstacles
var environmentRewards; // Array of rewards
var delay;

var score = 0;
var highScore = 0;
var gameSpeed = 10;

function newGame() {
    envObst = [];
    environmentRewards = [];
    score = 0;
    gameSpeed = 20; //TODO was 10
    delay = 0;
    newPlayer();
}

function setup() {
    var canv = createCanvas(windowWidth, windowHeight);
    canv.parent("bgCanvas");

    //Setup New Game
    frameRate(gameSpeed);
    newGame();
    console.log("PW,PH: %d, %d", playerWidth, playerHeight);
}

function onClick(elementID, id) {
    if (elementID == "jump") {
        jump();
    }
}

function checkCollisions() {
    let x = position.x;
    let y = position.y;

    for (let i = 0; i < envObst.length; i++)
    {
        let ox = envObst[i][0] - x;
        let oy = envObst[i][1] - y;
        if (ox >= 0 && oy >= 0 && ox < playerWidth + radius && oy < playerHeight + radius) {
            envObst.splice(i, 1);
            endGame();
        }
    }

}

//Player never actually moves, obstacles approach from right
function generateEnvironment() {
    //Depends on score, generate obstacles/rewards
    if (delay <= 0) {

        let objX = windowWidth * 1.1;
        let objY = randomInt(playerHeight * 2, windowHeight - (2*playerHeight));

        if (Math.random() >= 0.40) {
            // obstacle (more probable to spawn)
            envObst.push( [objX, objY] );
            if (Math.random() >= 0.70) {
                objX = randomInt(30, objX);
                objY = randomInt(40, objY/3);
                envObst.push( [objX, objY] );
            }
        } else {
            // reward
            environmentRewards.push( [objX, objY] );
        }
        delay = 30 - (score * 0.01);
    }
    delay -= 1;
}

function draw() {
    background(51);
    drawScoreboard();
    changeSpeed();

    update(); // Player update

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
    frameRate(gameSpeed);
}

function displayGround() {
    rectMode(CORNER);
    stroke(0, 0, 0);
    strokeWeight(2);
    fill(0, 0, 0);
    rect(0, windowHeight - playerOffset + 22, windowWidth * 2, 100);
}

function randomInt(range, offset) {
    return Math.floor(Math.random() * range) + offset;
}

function endGame() {
    highScore = highScore < score ? score : highScore;
    score = 0;

}
