//==========
// p5.js

w=400;
c=w/2;
t=0;

setup=()=>{
	createCanvas(w,w);
	//angleMode(DEGREES);
	frameRate(32);
	noFill();
	stroke(255);
}

draw=()=>{
	background(0);

	//fill(33, 33, 33, 33)
	//square(0, 0, w, w);

	t += 0.1;
	for(r=0; r<TAU*9; r+=0.1){
		let s = sin(t+r*0.3) + 9;
		let x = cos(r+t)*r*s+c;
		let y = sin(r+t)*r*s+c;
		circle(x, y, sin(r) * 9);
	}
}