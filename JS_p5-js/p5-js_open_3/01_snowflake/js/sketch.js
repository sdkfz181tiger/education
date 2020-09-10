//==========
// p5.js

let cX, cY;
let t = 0;

function setup(){
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	noLoop();
	noFill();
	stroke(255);
	strokeWeight(1);
	strokeCap(SQUARE);

	cX = width / 2;
	cY = height / 2;
}

function draw(){
	background(0);
	//fill(33, 33, 33, 99)
	//square(0, 0, width, height);

	snowFlake(cX, cY, 80);	
}

function snowFlake(x, y, w){

	for(let i=0; i<12; i++){

		if(i%2==0){
			blanchLong(x, y, w, i*30);
		}else{
			//blanchShort(x, y, w/2, i*30);
		}
	}
}

function blanchShort(x, y, w, r){
	push();
	translate(x, y);
	rotate(r);
	line(0, 0, w, 0);
	
	pop();
}

function blanchLong(x, y, w, r){
	push();
	translate(x, y);
	rotate(r);
	line(0, 0, w, 0);
	line(w*0.2, 0, w*0.3, w*0.1);
	line(w*0.2, 0, w*0.3, w*-0.1);
	line(w*0.3, 0, w*0.4, w*0.1);
	line(w*0.3, 0, w*0.4, w*-0.1);
	line(w*0.4, 0, w*0.5, w*0.1);
	line(w*0.4, 0, w*0.5, w*-0.1);
	pop();
}

