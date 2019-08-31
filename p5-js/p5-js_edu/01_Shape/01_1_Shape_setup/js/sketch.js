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

// = 課題 =
// 1, 色の三原色を教える
// 2, ドラえもん or アンパンマン etc...

console.log("Hello p5.js!!");

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
