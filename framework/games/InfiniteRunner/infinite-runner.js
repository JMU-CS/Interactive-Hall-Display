function githubAccount() {
    return "zareskjj";
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

let entityLimit = 12;
let baseSpeed = -20;

let playerWidth = windowWidth * 0.05;
let playerHeight = windowHeight * 0.1;
let playerOffset = 50;

let mass = 0.4;
let gravity = createVector(0, 9.81 * mass);

let jumpCount = 0;
let radius = playerWidth / 2;

var position;
var speed; // Used for jumping
var accel; // Gravity simulation

var gameSpeed = 30;

let resetY = windowHeight - playerHeight - 30;

var envObst; // Array of obstacles
var environmentRewards; // Array of rewards
var delay;

var score = 0;
var highScore = 0;
var prevScore = 0;

let freeze = 0;

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
        var jumpForce = jumpCount == 1 ? -40 : -30;
        accel = createVector(0, jumpForce);
    }
}

function applyForce(force) {
    var f = p5.Vector.div(force, mass);
    accel.add(f);
}

function update() {
    if (freeze <= 0) {
        applyForce(gravity);
        speed.add(accel);
        position.add(speed);
        if (position.y >= resetY) {
            position.y = resetY;
            speed = createVector(0, 0);
            accel = createVector(0, 0);
            jumpCount = 0;
        }
        position.x = windowWidth * 0.35;

        //Move rewards & obstacles
        let ospd = createVector(baseSpeed + (-0.01 * score), 0);
        for (let i = 0; i < envObst.length; i++) {
            let v = createVector(envObst[i][0], envObst[i][1]);
            v.add(ospd);
            if (v.x <= 0) {
                envObst.splice(i, 1);
                score += 1;
            } else {
                envObst[i][0] = v.x;
                envObst[i][1] = v.y;
            }
        }

        display();
    } else {
        freeze -= 1;
        gameOverMessage();
        console.log("Freeze frame %d", freeze)
    }
}

function display() {
    rectMode(CORNER);
    stroke(69, 0, 132);
    strokeWeight(1);
    fill(203, 182, 119);
    rect(position.x, position.y, playerWidth, playerHeight, 5);

    strokeWeight(3);
    let len = envObst.length;
    for (let i = 0; i < len; i++) {
        fill(envObst[i][2], envObst[i][3], envObst[i][4]);
        ellipse(envObst[i][0], envObst[i][1], radius, radius);
    }

}

function newGame() {
    envObst = [];
    environmentRewards = [];
    score = 0;
    gameSpeed = 30;
    frameRate(gameSpeed);
    delay = 0;
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
    let x = position.x;
    let y = position.y;

    for (let i = 0; i < envObst.length; i++) {
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
        let objY = randomInt(playerHeight * 3, 2*windowHeight/3);
        let r, g, b;
        r = randomInt(225, 1);
        g = randomInt(100, 50);
        b = randomInt(100, 50);

        if (Math.random() >= 0.40) {
            // obstacle (more probable to spawn)
            envObst.push([objX,objY,r,g,b]);
            if (Math.random() >= 0.70) {
                objX = randomInt(30, objX);
                objY = randomInt(40, objY / 3);

                envObst.push( [objX, objY, r, g, b] );
            }
        } else {
            // reward
            environmentRewards.push( [objX, objY, r, g, b] );
        }
        delay = 30 - (score * 0.01);
    }
    delay -= 1;
}

function draw() {
    background(51);
    drawScoreboard();

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
    rect(100,windowHeight/2, 200, 90);

    fill(69, 0, 132);
    strokeWeight(0);
    textSize(25);
    text("Score: " + score, 105, windowHeight/2 - 15);

    fill(69, 0, 132);
    textSize(25);
    text("High Score: " + highScore, 105, windowHeight/2 + 15);
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
    prevScore = score;
    freeze = Math.floor(gameSpeed * 1.5);
    newGame();
    highScore = highScore < prevScore ? prevScore : highScore;
}

function gameOverMessage() {
    if (freeze == 0) {
        freeze = -1;
    } else {
        fill(255, 80, 80);
        let x,y;
        x = windowWidth/2;
        y = windowHeight/2;
        if (highScore < prevScore) {
            text("New High Score!", x,y-20);
        } else {
            text("Game Over!", x, y-20 );
        }
        text("Score: " + prevScore, x, y+20);
    }
}
