
const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

var rotation;
var sprite;

function setup() {
	createCanvas(480, 320);

	// Loop
	frameRate(8);

	// Rotation
	rotation = 0;

	// Create object
	sprite = new Sprite(
		182, 80, "assets/t_title.png");
	var x = width * 0.5 - sprite.getWidth() * 0.5;
	var y = height * 0.5 - sprite.getHeight() * 0.5;
	sprite.setPosition(width * 0.5, height * 0.5);
	sprite.setRotation(rotation);
}

function draw(){
	background(33, 33, 33);

	// Rotation
	rotation++;
	if(360 <= rotation) rotation = 0;
	sprite.setRotation(rotation);
	sprite.draw();
}

class Sprite{

	constructor(width, height, img){
		this.width    = width;
		this.height   = height;
		this.img      = loadImage(img);
		this.x        = 0;
		this.y        = 0;
		this.rotation = 0;
		this.radian   = 0;
	}

	getWidth(){
		return this.width;
	}

	getHeight(){
		return this.height;
	}

	setPosition(x, y){
		this.x = x;
		this.y = y;
	}

	getPositionX(){
		return this.x;
	}

	getPositionY(){
		return this.y;
	}

	setRotation(rotation){
		this.rotation = rotation;
		this.radian   = rotation * DEG_TO_RAD;
	}

	setRadian(radian){
		this.radian   = radian;
		this.rotation = radian * RAD_TO_DEG;
	}

	getRotation(){
		return this.rotation;
	}

	getRadian(){
		return this.radian;
	}

	draw(){
		console.log("draw");
		stroke(255);
		noFill();
		push();
		translate(this.x, this.y);
		rotate(this.radian);
		rect(-this.width * 0.5, -this.height * 0.5, this.width, this.height);
		image(this.img, -this.width * 0.5, -this.height * 0.5);
		pop();
	}
}