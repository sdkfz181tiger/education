//==========
// p5.js

const palette = ["#F4F1DE", "#E07A5F", "#3D405B", "#81B29A", "#F2CC8F"];

let cX, cY;
let t = 0;

function setup(){
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	frameRate(8);

	cX = width / 2;
	cY = height / 2;
}

function draw(){
	//background(0);

	noStroke();
	fill(11, 22, 66, 33)
	rect(0, 0, width, height);

	let p = floor(random(palette.length));
	stroke(palette[p]);
	strokeWeight(1);
	strokeCap(SQUARE);

	let x = random(width);
	let y = random(height);
	let s = random(20, 40);
	let r = random(360);
	snowFlake(x, y, s, r);
}

function snowFlake(x, y, w, r){

	for(let i=0; i<12; i++){
		if(i%2==0){
			blanchLong(x, y, w, i*30+r);
		}else{
			blanchShort(x, y, w*3/5, i*30+r);
		}
	}
}

function blanchLong(x, y, w, r){
	push();
	translate(x, y);
	rotate(r);
	line(0, 0, w, 0);
	line(w*0.5, 0, w*0.6, w*0.2);
	line(w*0.5, 0, w*0.6, w*-0.2);
	line(w*0.7, 0, w*0.8, w*0.15);
	line(w*0.7, 0, w*0.8, w*-0.15);
	line(w*0.9, 0, w*1.0, w*0.1);
	line(w*0.9, 0, w*1.0, w*-0.1);
	pop();
}

function blanchShort(x, y, w, r){
	push();
	translate(x, y);
	rotate(r);
	line(0, 0, w, 0);
	line(w*0.5, 0, w*0.6, w*0.2);
	line(w*0.5, 0, w*0.6, w*-0.2);
	line(w*0.6, 0, w*0.7, w*0.2);
	line(w*0.6, 0, w*0.7, w*-0.2);
	line(w*0.7, 0, w*0.8, w*0.2);
	line(w*0.7, 0, w*0.8, w*-0.2);
	pop();
}

