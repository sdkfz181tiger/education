var sprite;

function setup() {
	createCanvas(480, 320);
	// Create object
	sprite = new Sprite(
		182, 80, "assets/t_title.png");
	var x = width * 0.5 - sprite.getWidth() * 0.5;
	var y = height * 0.5 - sprite.getHeight() * 0.5;
	sprite.setPosition(x, y);
}

function draw(){
	background(33, 33, 33);
	sprite.draw();
}

function mouseClicked(){
	console.log("mouseClicked");

	// Intersect
	if(sprite.intersectPosition(mouseX, mouseY)){
		console.log("True");
	}else{
		console.log("False");
	}
}

class Sprite{

	constructor(width, height, img){
		this.width  = width;
		this.height = height;
		this.img    = loadImage(img);
		this.x      = 0;
		this.y      = 0;
	}

	setPosition(x, y){
		this.x = x;
		this.y = y;
	}

	getWidth(){
		return this.width;
	}

	getHeight(){
		return this.height;
	}

	intersectPosition(x, y){
		if(x < this.x) return false;
		if(this.x + this.width < x) return false;
		if(y < this.y) return false;
		if(this.y + this.height < y) return false;
		return true;
	}

	draw(){
		stroke(255);
		noFill();
		rect(this.x, this.y, this.width, this.height);
		image(this.img, this.x, this.y);
	}
}