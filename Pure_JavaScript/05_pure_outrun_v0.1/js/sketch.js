"use strict";
//==========
// JavaScript

const WIDTH   = 320;
const HEIGHT  = 320;
const S_DEPTH = 50; // Screen depth
const R_DEPTH = 10; // Road depth
const R_WIDTH = 480;// Road width

let canvas, ctx;
let posX, posZ, lines;

// Window
window.addEventListener("load", (e)=>{
	// Canvas
	canvas  = document.getElementById("canvas");
	canvas.width  = WIDTH;
	canvas.height = HEIGHT;
	// Context
	ctx = canvas.getContext("2d");
	ctx.font        = "24px Arial";
	ctx.textAlign   = "center";
	ctx.strokeStyle = "#ffffff";
	ctx.lineWidth   = 2;
	// Position
	posX = 0;
	posZ = 0;
	// Lines
	lines = [];
	for(let i=0; i<400; i++){
		let line = new Line();
		if(100 < i && i < 150) line.curve = 0.8;
		if(150 < i && i < 200) line.curve = -0.8;
		if(250 < i && i < 300) line.curve = 0.8;
		if(300 < i && i < 350) line.curve = -0.8;
		line.project(0, 200, R_DEPTH*i);
		lines.push(line);
	}

	// Update
	update();
	function update(){
		// Clear
		ctx.fillStyle = "#333333";
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
		// Position
		posZ += 5;

		let x = 0;
		let dX = 0;

		// Lines
		const start = Math.floor(posZ/R_DEPTH)+1;
		for(let i=start; i<start+100; i++){
			let iA = i % lines.length;
			let iB = (0<iA)?iA-1:lines.length-1;
			let lA = lines[iA];
			let lB = lines[iB];
			lA.project(posX-x, 170, R_DEPTH*i-posZ);

			x += dX;
			dX += lA.curve;

			let cGrass = (i%2==0) ? "#33dd33":"#33aa33";
			let cSide  = (i%2==0) ? "#333333":"#ffffff";
			let cRoad  = (i%2==0) ? "#bbbbbb":"#eeeeee";
			drawTrp(lA.X, lA.Y, WIDTH*4, lB.X, lB.Y, WIDTH*4, cGrass);
			drawTrp(lA.X, lA.Y, lA.W*1.2, lB.X, lB.Y, lB.W*1.2, cSide);
			drawTrp(lA.X, lA.Y, lA.W, lB.X, lB.Y, lB.W, cRoad);

			if(iA == 0) drawLine(lA.X, lA.Y, lA.W, "#ff3333");
		}
		setTimeout(update, 20);
	}
});

function drawLine(x, y, w, c){
	ctx.strokeStyle = c;
	ctx.beginPath();
	ctx.moveTo(x+w/2, y);
	ctx.lineTo(x-w/2, y);
	ctx.stroke();
}

function drawTrp(x1, y1, w1, x2, y2, w2, c){
	ctx.fillStyle = c;
	ctx.beginPath();
	ctx.moveTo(x1+w1/2, y1);
	ctx.lineTo(x1-w1/2, y1);
	ctx.lineTo(x2-w2/2, y2);
	ctx.lineTo(x2+w2/2, y2);
	ctx.closePath();
	ctx.fill();
}

document.addEventListener("keydown", (e)=>{
	let key = e.key;
	if(key == "ArrowLeft")  posX += 20;
	if(key == "ArrowRight") posX -= 20;
});

class Line{

	constructor(){
		this._X = 0;
		this._Y = 0;
		this._W = 0;
		this._C = 0;
	}

	project(x, y, z){
		const s = S_DEPTH / (S_DEPTH + z);
		this._X = x * s + WIDTH/2;
		this._Y = y * s + HEIGHT/2;
		this._W = R_WIDTH * s;
	}

	set curve(n){this._C=n;}
	get curve(){return this._C;}

	get X(){return this._X;}
	get Y(){return this._Y;}
	get W(){return this._W;}
}
