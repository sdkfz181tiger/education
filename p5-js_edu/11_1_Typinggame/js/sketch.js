console.log("Hello p5.js!!");

const C_LOW  = 100;
const C_HIGH = 255;

let str = "ABCDEFG";

let index = 0;

function preload(){
	console.log("preload!!");
}

function setup(){
	console.log("setup!!");
	createCanvas(480, 320);

	fill(C_HIGH);
	noStroke();

	textSize(32);
	textAlign(CENTER);

	index = 0;
}

function draw(){
	background(33);

	let padding = 22;
	let sX = width * 0.5 - (str.length-1) * padding * 0.5; 
	let sY = height * 0.5;
	for(let i=0; i<str.length; i++){
		let x = sX + i * padding;
		let y = sY;
		let c = str.charAt(i);
		let color = (index < i) ? C_LOW:C_HIGH;
		fill(color);
		text(c, x, y);
	}
}