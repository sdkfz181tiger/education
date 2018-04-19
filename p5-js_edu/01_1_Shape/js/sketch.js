console.log("Hello p5.js!!");

// p5.js
// https://p5js.org/
// Reference
// https://p5js.org/reference/

function setup(){

    // Canvas
    createCanvas(480, 320);
    background(200, 200, 200);

    // Face
    stroke(33, 33, 33);
    strokeWeight(4);
    ellipse(240, 160, 140, 140);

    // Eye
    noStroke();
    fill(33, 33, 33);
    ellipse(220, 140, 20, 40);

    noStroke();
    fill(33, 33, 33);
    ellipse(260, 140, 20, 40);

    // Mouse
    angleMode(DEGREES);
    stroke(33, 33, 33);
    strokeWeight(4);
    noFill();
    arc(240, 180, 80, 40, 10, 170);
}
