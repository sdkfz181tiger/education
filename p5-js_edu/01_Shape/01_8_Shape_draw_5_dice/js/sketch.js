console.log("Hello p5.js!!");

let rdm = 0;

function setup(){
	console.log("setup!!");
	createCanvas(480, 320);
	frameRate(6);
}

function draw(){
	console.log("draw!!");
	background(33, 33, 33);

	fill(255, 255, 255);
	noStroke();

	rdm = floor(random(0, 6)) + 1;

	textSize(64);
	textAlign(CENTER);
	text(rdm, 240, 90);

	let size = 100;
	let cX = width * 0.5;
	let cY = height * 0.5 + 30;
	let x = cX - size * 0.5;
	let y = cY - size * 0.5;
	square(x, y, size, 10);

	if(rdm == 1){
		fill(255, 33, 33);
		circle(cX, cY, 30);
	}else if(rdm == 2){
		fill(33, 33, 33);
		circle(cX-20, cY-20, 20);
		circle(cX+20, cY+20, 20);
	}else if(rdm == 3){
		fill(33, 33, 33);
		circle(cX, cY, 20);
		circle(cX-20, cY-20, 20);
		circle(cX+20, cY+20, 20);
	}else if(rdm == 4){
		fill(33, 33, 33);
		circle(cX-20, cY-20, 20);
		circle(cX+20, cY+20, 20);
		circle(cX+20, cY-20, 20);
		circle(cX-20, cY+20, 20);
	}else if(rdm == 5){
		fill(33, 33, 33);
		circle(cX, cY, 20);
		circle(cX-20, cY-20, 20);
		circle(cX+20, cY+20, 20);
		circle(cX+20, cY-20, 20);
		circle(cX-20, cY+20, 20);
	}else{
		fill(33, 33, 33);
		circle(cX-20, cY-24, 20);
		circle(cX+20, cY-24, 20);
		circle(cX+20, cY, 20);
		circle(cX-20, cY, 20);
		circle(cX+20, cY+24, 20);
		circle(cX-20, cY+24, 20);
	}
}

function mousePressed(){
	noLoop();
}