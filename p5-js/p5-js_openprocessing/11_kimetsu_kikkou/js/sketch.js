"use strict";
//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
	colorMode(RGB);
	angleMode(DEGREES);
	background(100);

	let grA = createGraphics(width/2, height/2);
	let gxA = new GraphixA(grA, 0, 0);
	let grB = createGraphics(width/2, height/2);
	let gxB = new GraphixB(grB, width/2, 0);
	let grC = createGraphics(width/2, height/2);
	let gxC = new GraphixC(grC, 0, height/2);
	let grD = createGraphics(width/2, height/2);
	let gxD = new GraphixD(grD, width/2, height/2);
}

class GraphixA{

	constructor(gr, x, y){

		this._gr = gr;
		this._cX = gr.width / 2;
		this._cY = gr.height / 2;

		this._gr.noStroke();
		this._gr.strokeWeight(1);
		this._gr.fill(0, 210, 210);
		this._gr.background(33);

		let s = 40;
		let p = s*cos(30)*2;
		let rows = floor(this._gr.height / s);
		let cols = floor(this._gr.width / s);
		for(let r=0; r<rows+1; r++){
			for(let c=0; c<cols+1; c++){
				let x = s * c;
				let y = s * r;
				if(r % 2 == 0){
					if(c % 2 == 0){
						this._gr.rect(x, y, s, s);
					}
				}else{
					if(c % 2 != 0){
						this._gr.rect(x, y, s, s);
					}
				}
			}
		}
		image(gr, x, y);
	}
}

class GraphixB{

	constructor(gr, x, y){

		this._gr = gr;
		this._cX = gr.width / 2;
		this._cY = gr.height / 2;

		this._gr.stroke(150, 30, 30);
		this._gr.strokeWeight(2);
		this._gr.noFill();
		this._gr.background(255, 120, 120);

		let s = 40;
		let pX = cos(30) * s * 2;
		let pY = sin(30) * s + s;
		let rows = floor(this._gr.height / pY) + 2;
		let cols = floor(this._gr.width / pX) + 2;

		for(let r=0; r<rows+1; r++){
			for(let c=0; c<cols+1; c++){
				let x = pX * c;
				let y = pY * r;
				if(r%2!=0) x += pX / 2;
				this.drawSymbol(x, y, s);
			}
		}
		image(gr, x, y);
	}

	drawSymbol(cX, cY, s){
		// Pentagon
		this._gr.beginShape();
		let a = 360 / 6;
		for(let i=0; i<6; i++){
			let x = cX + cos(i*a+30) * s;
			let y = cY + sin(i*a+30) * s;
			this._gr.vertex(x, y);
		}
		this._gr.endShape(CLOSE);

		// Triangle
		this._gr.beginShape();
		let b = 360 / 3;
		for(let i=0; i<3; i++){
			let x = cX + cos(i*b-90) * s;
			let y = cY + sin(i*b-90) * s;
			this._gr.vertex(x, y);
		}
		this._gr.endShape(CLOSE);

		// Line
		for(let i=0; i<3; i++){
			let x = cX + cos(i*b-90) * s;
			let y = cY + sin(i*b-90) * s;
			this._gr.line(cX, cY, x, y);
		}
	}
}

class GraphixC{

	constructor(gr, x, y){

		this._gr = gr;
		this._cX = gr.width / 2;
		this._cY = gr.height / 2;

		this._gr.noStroke();
		this._gr.strokeWeight(2);
		this._gr.fill(255);
		this._gr.background(250, 180, 50);

		let p = 90;
		let s = 20;
		let cols = this._gr.width / p;
		let rows = this._gr.height / p;
		for(let r=0; r<rows+1; r++){
			for(let c=0; c<cols+1; c++){
				this.drawTriangle(c*p, r*p, s);
			}
		}
		image(gr, x, y);
	}

	drawTriangle(x, y, s){
		let x3 = x + cos(30) * s;
		let y3 = y + sin(30) * s;
		let x2 = x + cos(150) * s;
		let y2 = y + sin(150) * s;
		let x1 = x + cos(270) * s;
		let y1 = y + sin(270) * s;
		this._gr.triangle(x1, y1, x2, y2, x3, y3);
	}
}

class GraphixD{

	constructor(gr, x, y){

		this._gr = gr;
		this._cX = gr.width / 2;
		this._cY = gr.height / 2;

		this._gr.stroke(33);
		this._gr.strokeWeight(1);
		this._gr.noFill();
		this._gr.background(255, 120, 120);

		let s = 40;
		let p = s*cos(30)*2;
		let rows = floor(this._gr.height / s);
		let cols = floor(this._gr.width / s);
		for(let r=0; r<rows+1; r++){
			for(let c=-rows; c<cols; c++){
				let x = c * p + (p*r) / 2;
				let y = r * (s+sin(30)*s);
				if(c%2==0){
					this.drawCubeA(x, y, s);
				}else{
					this.drawCubeB(x, y, s);
				}
			}
		}
		image(gr, x, y);
	}

	drawCubeA(cX, cY, s){
		this.drawDiamond(cX, cY, s, 270, 70, 100, 50);
		this.drawDiamond(cX+cos(30)*s, cY+sin(30)*s, s, 210, 250, 180, 50);
		this.drawDiamond(cX+cos(30)*s, cY+sin(30)*s, s*0.7, 210, 250, 180, 50);
		this.drawDiamond(cX+cos(30)*s, cY+sin(30)*s, s*0.3, 210, 220, 150, 50);
		this.drawDiamond(cX+cos(150)*s, cY+sin(150)*s, s, 330, 250, 180, 50);
		this.drawDiamond(cX+cos(150)*s, cY+sin(150)*s, s*0.7, 330, 250, 180, 50);
		this.drawDiamond(cX+cos(150)*s, cY+sin(150)*s, s*0.3, 330, 220, 150, 50);
		this._gr.noFill();
		this.drawSymbol(cX, cY, s);
	}

	drawCubeB(cX, cY, s){
		this.drawDiamond(cX, cY, s, 270, 250, 180, 50);
		this.drawDiamond(cX+cos(30)*s, cY+sin(30)*s, s, 210, 90, 120, 50);
		this.drawDiamond(cX+cos(150)*s, cY+sin(150)*s, s, 330, 90, 120, 50);
		this._gr.noFill();
		this.drawSymbol(cX, cY, s);
	}

	drawDiamond(cX, cY, s, d, r=99, g=99, b=99){
		this._gr.fill(r, g, b);

		this._gr.beginShape();
		this._gr.vertex(cX, cY);
		for(let i=0; i<3; i++){
			let a = d + (i-1) * 60;
			let x = cX + cos(a) * s;
			let y = cY + sin(a) * s;
			this._gr.vertex(x, y);
		}
		this._gr.endShape(CLOSE);
	}

	drawSymbol(cX, cY, s){

		// Pentagon
		this._gr.beginShape();
		let a = 360 / 6;
		for(let i=0; i<6; i++){
			let x = cX + cos(i*a+30) * s;
			let y = cY + sin(i*a+30) * s;
			this._gr.vertex(x, y);
		}
		this._gr.endShape(CLOSE);

		// Line
		let b = 360 / 3;
		for(let i=0; i<3; i++){
			let x = cX + cos(i*b-30) * s;
			let y = cY + sin(i*b-30) * s;
			this._gr.line(cX, cY, x, y);
		}
	}
}