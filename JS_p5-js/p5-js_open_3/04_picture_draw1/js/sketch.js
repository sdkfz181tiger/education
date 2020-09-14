//==========
// p5.js

const size = 5;

let rows, cols;
let img, deg, scale, offX;

function preload(){

	img = loadImage("images/pic1.jpg");
}

function setup(){
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	noLoop();
	background(33);
	stroke(255);
	strokeWeight(0.5);
	noFill(255);

	rows = height / size;
	cols = width / size;

	deg = 0;
	scale = (width<height)?width/img.width:height/img.height;
	offX = width/2 - img.width*scale/2;

	let iWidth = img.width * scale;
	let iHeight = img.height * scale;

	background(11);
	//image(img, offX, 0, iWidth, iHeight);

	stroke(33, 33, 33, 33);
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let tX = c*size;
			let tY = r*size;
			let pX = (tX-offX)/scale;
			let pY = tY/scale;
			let color = img.get(pX, pY);
			let avg = (color[0] + color[1] + color[2])/3;
			if(avg < 50) continue;
			fill(color);
			noStroke();
			circle(tX, tY, size/2);
			noFill();
			stroke(color);
			drawSnake(tX, tY, 10);
		}
	}
}

function draw(){
	
}

function drawSnake(x, y, n){
	push();
	translate(x, y);
	for(let i=0; i<n; i++){
		let d = (random()<0.5)?90:-90;
		stepNext(d);
	}
	pop();
}

function stepNext(d){
	let f = (d<0)?-90:0;
	translate(size, 0);
	rotate(d);
	arc(0, 0, size, size, f, f+90);
	//line(0, 0, size/8, 0);
}

