//==========
// p5.js

const DEG_TO_RAD = Math.PI / 180;
const palette = ["#A7C957", "#F2E8CF", "#386641", "#6A994E", "#BC4749"];

let offX;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	frameRate(32);

	noStroke();
	fill("#A7C957");

	offX = 0;
}

function draw(){
	background(33);

	offX += 3;
	//if(360 < offX) offX -= 360;

	let pad  = 40;
	let size = 30;
	let rows = height / pad;
	let cols = width / pad;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = c * pad;
			let y = r * pad;
			let d = Math.sqrt(x*x+y*y);
			let radian = DEG_TO_RAD * ((offX+d)/width*720);
			let radius = Math.cos(radian) * size;
			if(radius < 0){
				fill("#A7C957");
			}else{
				fill("#F2E8CF");
			}
			circle(x, y, radius);
		}
	}
}
