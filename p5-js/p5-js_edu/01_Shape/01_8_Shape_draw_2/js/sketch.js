//==========
// p5.js
// -> https://p5js.org/
// References(使い方)
// -> https://p5js.org/reference/
// Examples(使用例)
// -> https://p5js.org/examples/

//==========
// p5.play
// -> http://p5play.molleindustria.org/
// References(使い方)
// -> http://p5play.molleindustria.org/docs/classes/Sprite.html
// Examples(使用例)
// -> http://p5play.molleindustria.org/examples/index.html

console.log("Hello p5.js!!");

// Global
let x = 0;
let y = 0;

function setup(){

    // Canvas
    createCanvas(480, 320);
    background(200, 200, 200);
    frameRate(32);
}

function draw(){

    background(200, 200, 200);

    drawFace(x, y);

    x += 1;
    y += 1;

    if(480 < x){
        x = 0;
    }

    if(320 < y){
        y = 0;
    }
}

function drawFace(x, y){

    // Face
    stroke(33, 33, 33);
    strokeWeight(4);
    fill(255, 255, 255);
    ellipse(x, y, 140, 140);

    // Eye
    noStroke();
    fill(33, 33, 33);
    ellipse(x-20, y-20, 20, 40);

    noStroke();
    fill(33, 33, 33);
    ellipse(x+20, y-20, 20, 40);

    // Mouse
    angleMode(DEGREES);
    stroke(33, 33, 33);
    strokeWeight(4);
    noFill();
    arc(x, y+20, 80, 40, 10, 170);
}
