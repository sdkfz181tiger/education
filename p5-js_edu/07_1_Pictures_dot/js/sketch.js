console.log("Hello p5.js!!");

let img  = null;

function preload(){
	console.log("preload!!");
	img  = loadImage("./assets/person.png");
}

function setup(){
	console.log("setup!!");
	createCanvas(480, 320);
	background(33, 33, 33);
	frameRate(32);
	noStroke();
	colorMode(HSB);
}

function draw(){
	console.log("draw!!");
	
	for(let i=0; i<300; i++){

		let x = random(0, img.width);
		let y = random(0, img.height);
		let color = img.get(x, y);
		let r = color[0];
		let g = color[1];
		let b = color[2];
		let th1 = 30;
		let th2 = 60;
		let th3 = 90;
		let th4 = 130;
		let th5 = 160;
		let s = random(0, 30);
		if(r<th1 && g<th1 && b<th1){
			fill(s, 100, 0);
			circle(x, y, 3, 3);
		}else if(r<th2 && g<th2 && b<th2){
			fill(s, 100, 10);
			circle(x, y, 4, 4);
		}else if(r<th3 && g<th3 && b<th3){
			fill(s, 100, 30);
			circle(x, y, 2, 2);
		}else if(r<th4 && g<th4 && b<th4){
			fill(s, 100, 50);
			circle(x, y, 2, 2);
		}else if(r<th5 && g<th5 && b<th5){
			fill(s, 100, 80);
			circle(x, y, 2, 2);
		}else{
			fill(s, 100, 100);
			circle(x, y, 2, 2);
		}
	}
}