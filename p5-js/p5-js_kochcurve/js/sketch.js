console.log("Hello p5.js!!");

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

const ANGLE = 30 * DEG_TO_RAD;

function preload(){
	console.log("preload");

	// Font
	var font = loadFont("assets/misaki_gothic.ttf");
	textSize(24);
	textFont(font);
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	noLoop();
	background(0);

	noFill();
	stroke(255, 255, 255);
	strokeWeight(1);
}

function draw(){
	console.log("draw");
	background(0);

	let sPoint = new Point(0, height / 2);
	let ePoint = new Point(width, height / 2);
	let points = [sPoint, ePoint];
	createFractal(points);
}

function createFractal(points){

	for(let i=0; i<points.length-1; i++){
		let sPoint = points[i];
		let ePoint = points[i+1];
		let length = calcDistance(sPoint, ePoint) / 3;
		if(length < 5) return;

		let kochs = createKochs(sPoint, ePoint);
		createFractal(kochs);

		if(10 < length) continue;
		beginShape();
		for(let i=0; i<kochs.length; i++){
			vertex(kochs[i].x, kochs[i].y);
		}
		endShape();
	}
}

function createKochs(sPoint, ePoint){

	let x = ePoint.x - sPoint.x;
	let y = ePoint.y - sPoint.y;
	let atan = Math.atan2(y, x);
	let deg = atan * RAD_TO_DEG;
	let length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) / 3;
	let cPoint = sPoint;
	let degs = [0, -60, 120, -60];
	let kochs = [cPoint];
	for(let i=0; i<degs.length; i++){
		deg += degs[i];
		let pX = cPoint.x + length * Math.cos(deg * DEG_TO_RAD);
		let pY = cPoint.y + length * Math.sin(deg * DEG_TO_RAD);
		let point = new Point(pX, pY);
		kochs.push(point);
		cPoint = point;
	}
	return kochs;
}

class Point{
	constructor(x, y){
		this._x = x;
		this._y = y;
	}
	get x(){
		return this._x;
	}
	get y(){
		return this._y;
	}
}

function calcDistance(sPoint, ePoint){
	let x = ePoint.x - sPoint.x;
	let y = ePoint.y - sPoint.y;
	return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}
