console.log("Hello p5.js!!");

// p5.js
// https://p5js.org/
// Reference
// https://p5js.org/reference/

function setup(){

    // Canvas
    createCanvas(480, 320);
    background(200, 200, 200);

    // For
    for(let i=0; i<5; i++){
        drawFace(240 + 50*i, 160);
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
