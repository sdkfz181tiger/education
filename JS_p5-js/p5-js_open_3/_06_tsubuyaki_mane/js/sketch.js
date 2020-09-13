//==========
// p5.js

let t = 0;

setup=()=>{
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	frameRate(32);
	noFill();
	stroke(255);
}

draw=()=>{
	//background(0);

	let cX = width / 2;
	let cY = height / 2;

	fill(33, 33, 33, 99)
	square(0, 0, width, height);

	t += 1.5;
	for(let r=0; r<360*4; r+=10){
		let s = sin(t);
		let x = cos(t+r)*r*0.1*s+cX;
		let y = sin(t+r)*r*0.1*s+cY;
		circle(x, y, 2);
	}
}

/*
t = 0 //#つぶやきProcessing
draw = _ => {
  createCanvas(W = 600, W)
  background(w = W / 2)
  t += .02
  strokeWeight(7)
  C = constrain
  for (y = W; y -= 40;)
    for (x = W; x -= 40;)
      for (i = 4; i--; line(x, y, C(cos(p) * 80 + x, x - 20, x + 20), C(sin(p) * 80 + y, y - 20, y + 20))) p = TAU / 4 * i + (t - dist(x, y, w, w) / w)
}
*/