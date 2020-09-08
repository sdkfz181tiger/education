console.log("Hello p5.js!!");

const DEG_TO_RAD = Math.PI / 180;

// 初期化
function setup(){
	console.log("setup");
	createCanvas(480, 320);
	noLoop();
	background(0);

	stroke(255, 255, 255);
	strokeWeight(1);
	noFill();
}

// 連続処理
function draw(){
	console.log("draw");

	let rMax = 3;
	let cMax = 4;
	let padding = 100;

	let startX = width / 2 - (cMax-1) * padding / 2;
	let startY = height / 2 - (rMax-1) * padding / 2;

	for(let r=0; r<rMax; r++){
		for(let c=0; c<cMax; c++){
			let cX = c * padding + startX;
			let cY = r * padding + startY;
			let crystal = new Crystal(cX, cY);
			crystal.draw();
		}
	}
}

class Shape{

	constructor(cX, cY){
		this.cX = cX;
		this.cY = cY;
	}
}

class Crystal extends Shape{

	constructor(cX, cY){
		super(cX, cY);
	}

	draw(){

		let steps = floor(random(3, 6));
		if(steps % 2 == 0){
			this.drawA(40, steps);
			this.drawB(40, steps);
			this.drawC(40, steps);
		}else{
			this.drawD(40, steps);
			this.drawE(40, steps);
		}
	}

	drawA(radius, steps){
		let d = radius / steps;
		for(let i=0; i<steps; i++){
			let r = radius - d * i;
			ellipse(this.cX, this.cY, r*2, r*2);
		}
	}

	drawB(radius, steps){
		let p = 360 / steps;
		for(let i=0; i<steps; i++){
			let radian = p * i * DEG_TO_RAD;
			let x = this.cX + radius * Math.cos(radian);
			let y = this.cY + radius * Math.sin(radian);
			line(this.cX, this.cY, x, y);
		}
	}

	drawC(radius, steps){
		let d = radius / steps;
		let p = 360 / steps;
		for(let i=0; i<steps; i++){
			let r = radius - d * i;
			beginShape();
			for(let s=0; s<=steps; s++){
				let radian = p * s * DEG_TO_RAD;
				let x = this.cX + r * Math.cos(radian);
				let y = this.cY + r * Math.sin(radian);
				vertex(x, y);
			}
			endShape();
		}
	}

	drawD(radius, steps){
		let d = radius / steps;
		let p = 360 / steps;
		for(let i=0; i<steps; i++){
			let r = radius - d * i;
			for(let s=0; s<steps; s++){
				let radian = p * s * DEG_TO_RAD;
				let x = this.cX + r * Math.cos(radian);
				let y = this.cY + r * Math.sin(radian);
				ellipse(x, y, 4, 4);
			}
		}
	}

	drawE(radius, steps){
		let d = radius / steps;
		let p = 360 / steps;
		for(let s=0; s<steps; s++){
			let radian = p * s * DEG_TO_RAD;
			let x = this.cX + radius * Math.cos(radian) / 2;
			let y = this.cY + radius * Math.sin(radian) / 2;
			ellipse(x, y, radius, radius);
		}
	}
}