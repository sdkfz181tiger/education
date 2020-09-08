"use strict";
//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(8);
	colorMode(RGB);
	angleMode(DEGREES);
	background(33);
	blendMode(ADD);

	//let gra = createGraphics(width, height);
	//let gfx = new Gfx(gra, 0, 0);
	//gfx.draw();

	stroke(87, 139, 186, 20);
	strokeWeight(1);
}

function draw(){

	let w = width;
	let h = height;
	for(let i=0; i<1; i++){
		for(let x=0; x<w; x++){
			let n = frameCount * 0.01;
			let y = 100+(i*30)+noise(n,x*.005,i)*200;
			point(x, y);
		}
	}
}

class Gfx{

	constructor(gr, x, y){

		this._gr = gr;
		this._cX = gr.width / 2;
		this._cY = gr.height / 2;

		this._gr.stroke(87, 139, 186);
		this._gr.strokeWeight(1);
		this._gr.fill(0, 210, 210);
		this._gr.background(0);

		let w = this._gr.width;
		let h = this._gr.height;
		for(let i=0; i<6; i++){
			for(let x=0; x<w; x++){
				let y = 100+(i*30)+noise(frameCount*.01,x*.005,i)*200;
				this._gr.point(x, y);
			}
		}

		image(this._gr, x, y);
	}

	draw(){
		// This can't be worked...
	}
}