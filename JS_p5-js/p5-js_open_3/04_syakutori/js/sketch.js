//==========
// p5.js


let size, rows, cols, x, y;
let deg, img;

function preload(){

	img = loadImage("images/dali.jpg");
}

function setup(){
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	noLoop();
	background(33);
	stroke(255);
	noFill(255);

	size = 10;
	rows = height / size;
	cols = width / size;
	x = size * floor(cols/2);
	y = size * floor(rows/2);
	deg = 0;

	background(11);

	let scale = (width<height)?width/img.width:height/img.height;
	let iWidth = img.width * scale;
	let iHeight = img.height * scale;
	console.log(scale);
	image(img, 0, 0, iWidth, iHeight);

	stroke(33, 33, 33, 33);
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			circle(c*size, r*size, size);
		}
	}
}

function draw(){
	
	stroke(255);
	push();
	translate(x, y);
	for(let i=0; i<100; i++){
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

