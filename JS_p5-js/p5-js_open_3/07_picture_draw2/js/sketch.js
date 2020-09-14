//==========
// p5.js

const palette = ["#F4F1DE", "#E07A5F", "#3D405B", "#81B29A", "#F2CC8F"];

let scale, offX, img, dots;

function preload(){
	img = loadImage("images/pic1.jpg");
}

function setup(){
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	frameRate(8);
	background(33);
	stroke(255);
	fill(255);

	scale = (width<height)?width/img.width:height/img.height;
	offX = width/2 - img.width*scale/2;
	let iWidth = img.width * scale;
	let iHeight = img.height * scale;
	image(img, offX, 0, iWidth, iHeight);

	dots = [];
	let speed = 20;
	for(let i=0; i<500; i++){
		let x = random(width);
		let y = random(height);
		let vX = speed/2 - random(speed);
		let vY = speed/2 - random(speed);
		let dot = new Dot(x, y, vX, vY);
		dots.push(dot);
	}
}

function draw(){

	//noStroke();
	//fill(33, 33, 33, 33);
	//rect(0, 0, width, height);

	for(let dot of dots) dot.update();
}

class Dot{

	constructor(x, y, vX, vY){
		this._x = x;
		this._y = y;
		this._vX = vX;
		this._vY = vY;
		this._c = getColor();
		this._w = 1;
	}

	update(){
		let pX = this._x;
		let pY = this._y;
		this._x += this._vX;
		this._y += this._vY;
		if(this._x < 0){
			this._x = 0;
			this._vX *= -1.0;
		}
		if(this._y < 0){
			this._y = 0;
			this._vY *= -1.0;
		}
		if(width < this._x){
			this._x = width;
			this._vX *= -1.0;
		}
		if(height < this._y){
			this._y = height;
			this._vY *= -1.0;
		}
		stroke(this._c);
		strokeWeight(this._w);
		if(!checkPicture(this._x, this._y)) return;
		line(pX, pY, this._x, this._y);
	}
}

function checkPicture(tX, tY){
	let pX = (tX-offX)/scale;
	let pY = tY/scale;
	let color = img.get(pX, pY);
	let avg = (color[0] + color[1] + color[2])/3;
	return 200 < avg;
}

function getColor(){
	let i = floor(random(palette.length));
	return color(palette[i]);
}
