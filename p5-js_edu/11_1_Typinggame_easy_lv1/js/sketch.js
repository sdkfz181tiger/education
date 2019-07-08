console.log("Hello p5.js!!");

let str  = "Apple";

function setup(){
	console.log("setup!!");
	createCanvas(480, 320);
}

function draw(){
	background(33);
	
	fill(255);
	noStroke();
	textSize(32);
	textAlign(CENTER);
	text(str, 240, 180);
}

function keyTyped(){
	console.log("keyTyped:" + key);
	str = str.trim();
	let answer = str.charAt(0);
	if(answer.toLowerCase() == key || answer.toUpperCase() == key){
		str = str.slice(1);
	}
}