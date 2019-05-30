console.log("Hello p5.js!!");

let num = 0;

function setup(){
	console.log("setup!!");
	createCanvas(480, 320);
	frameRate(32);
}

function draw(){
	console.log("draw!!");

	num += 2;
	if(360 < num){
		num = 0;
	}

	colorMode(RGB);
	background(33, 33, 33);

	colorMode(HSB);// 色相 0~360
	noStroke();
	let size = 32;
	for(let i=0; i<15; i++){
		for(let s=0; s<10; s++){
			let sat = (i * 20 + num) % 360;
			fill(sat, s*10, 100);
			rect(size*i, size*s, size-2, size-2);
		}
	}
}