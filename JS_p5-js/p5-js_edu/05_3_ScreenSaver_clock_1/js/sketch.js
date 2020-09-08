console.log("Hello p5.js!!");

let font   = null;

function preload(){
	// Font, Sound
	font  = loadFont("./assets/misaki_gothic.ttf");
}

function setup(){
	console.log("setup!!");
	createCanvas(480, 320);
	background(33, 33, 33);
	frameRate(16);
}

function draw(){
	colorMode(RGB);
	background(33, 33, 33);
	colorMode(HSB);
	noStroke();

	let dObj = new Date();

	let hour = dObj.getHours();
	drawLine(85, hour, 24);

	let min = dObj.getMinutes();
	drawLine(160, min, 60);

	let sec = dObj.getSeconds();
	drawLine(220, sec, 60);

	let mil = floor(dObj.getMilliseconds() * 0.1);
	drawLine(280, mil, 100);
}

function drawLine(offY, num, total){

	let size = width / total;
	for(let i=0; i<total; i++){
		let x = i * size;
		let y = offY - size * 0.5;
		let h = 360 * i / total;
		fill(h, 100, 100);
		if(i == num){
			rect(x, y-size, size, size*2);
			textFont(font);
			textSize(32);
			textAlign(CENTER);
			text(num, x+size*0.5+2, y-size);
		}else{
			rect(x, y, size, size);
		}
	}
}