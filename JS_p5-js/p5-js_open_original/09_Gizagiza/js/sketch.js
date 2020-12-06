//==========
// p5.js

const palette = ["#A7C957", "#F2E8CF", "#386641", "#6A994E", "#BC4749"];

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	noLoop();
	noStroke();
}

function draw(){
	background(33);

	let size = 80;
	let rows = height / size;
	let cols = width / size;

	for(let r=0; r<rows; r++){
		let i = floor(random(palette.length));
		fill(palette[i]);
		for(let c=0; c<cols; c++){
			let x = c * size;
			let y = r * size;
			triangle(x, y, x+size*0.5, y-size*0.5, x+size, y);
			triangle(x-size*0.5, y, x, y+size*0.5, x+size*0.5, y);
		}
	}
}
