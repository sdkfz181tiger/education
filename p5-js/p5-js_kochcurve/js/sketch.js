console.log("Hello p5.js!!");

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

const angles = [0*DEG_TO_RAD, -60*DEG_TO_RAD, 120*DEG_TO_RAD, -60*DEG_TO_RAD];

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

	let pA = new Point(width / 2 - 120, height / 2 - 80);
	let pB = new Point(width / 2 + 120, height / 2 - 80);
	let length = calcDistance(pA, pB);
	let pC = new Point(
		pB.x + length * Math.cos(120 * DEG_TO_RAD),
		pB.y + length * Math.sin(120 * DEG_TO_RAD));
	let points = [pA, pB, pC, pA];
	createFractal(points);
}

function createFractal(points){

	for(let i=0; i<points.length-1; i++){
		let sPoint = points[i];
		let ePoint = points[i+1];

		let kochs = createKochs(sPoint, ePoint);

		let length = calcDistance(sPoint, ePoint) / 3;
		if(length < 4){
			return;// 再帰処理の終了
		}else if(length < 10){
			beginShape();
			for(let i=0; i<kochs.length; i++){
				vertex(kochs[i].x, kochs[i].y);
			}
			endShape();
		}	

		// 再帰処理
		createFractal(kochs);
	}
}

function createKochs(sPoint, ePoint){

	let x = ePoint.x - sPoint.x;
	let y = ePoint.y - sPoint.y;
	let length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) / 3;
	let angle = Math.atan2(y, x);
	let cPoint = sPoint;
	let kochs = [cPoint];
	for(let i=0; i<angles.length; i++){
		angle += angles[i];
		let pX = cPoint.x + length * Math.cos(angle);
		let pY = cPoint.y + length * Math.sin(angle);
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
