console.log("Hello p5.js!!");

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

const anglesL = [-45*DEG_TO_RAD, +90*DEG_TO_RAD];
const anglesR = [+45*DEG_TO_RAD, -90*DEG_TO_RAD];


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

	let pA = new Point(width / 2 - 120, height / 2 + 40);
	let pB = new Point(width / 2 + 120, height / 2 + 40);
	let points = [pA, pB];
	createFractal(points);
}

function createFractal(points){

	for(let i=0; i<points.length-1; i++){
		let sPoint = points[i];
		let ePoint = points[i+1];

		let dragons = createDragons(sPoint, ePoint, i);

		let length = calcDistance(sPoint, ePoint) / 2;
		if(length < 4){
			return;// 再帰処理の終了
		}else if(length < 6){
			beginShape();
			for(let i=0; i<dragons.length; i++){
				vertex(dragons[i].x, dragons[i].y);
			}
			endShape();
		}

		// 再帰処理
		createFractal(dragons);
	}
}

function createDragons(sPoint, ePoint, i){

	let x = ePoint.x - sPoint.x;
	let y = ePoint.y - sPoint.y;
	let length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) / Math.sqrt(2);
	let angle = Math.atan2(y, x);
	let cPoint = sPoint;
	let dragons = [cPoint];

	let angles;
	if(i%2 == 0){
		angles = anglesL;
	}else{
		angles = anglesR;
	}

	for(let i=0; i<angles.length; i++){
		angle += angles[i];
		let pX = cPoint.x + length * Math.cos(angle);
		let pY = cPoint.y + length * Math.sin(angle);
		let point = new Point(pX, pY);
		dragons.push(point);
		cPoint = point;
	}
	return dragons;
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
