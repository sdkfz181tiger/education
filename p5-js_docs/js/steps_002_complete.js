const NUMBER_LIMIT  = 1001;
const STAIR_WIDTH   = 30;
const STAIR_HEIGHT  = 480;
const STAIR_PADDING = 10;
const STAIR_SPEED   = 3;

var font;

var player;

var stairTotal;
var startBaseX;
var stairBaseY;
var counter;
var primes;
var stairs;
var stairBaseToggle;

var btnLeft, btnRight;

function preload(){
	font = loadFont("assets/misaki_gothic.ttf");
}

function setup(){
	//console.log("setup");
	createCanvas(480, 320);
	background(200);
	frameRate(32);

	// Total, Baseline
	stairTotal = width / STAIR_WIDTH + 1;
	startBaseX = STAIR_WIDTH;
	stairBaseY = height - STAIR_PADDING;

	// Counter
	counter = 0;

	// Create player
	player = new Player(80, 100, 8, 8);
	player.jump();

	// Create primes
	primes = getPrimes(NUMBER_LIMIT);
	console.log(primes);

	// Create stairs
	stairs = new Array();
	stairBaseToggle = 1;
	for(var i=0; i<stairTotal; i++){
		var num = i + counter;
		if(primes.includes(num)){
			stairBaseY -= STAIR_PADDING;
		}
		var x = startBaseX + STAIR_WIDTH * i;
		var y = stairBaseY;
		var stair = new Stair(x, y, STAIR_WIDTH, STAIR_HEIGHT, num);
		stairs.push(stair);
	}

	// Create buttons
	btnLeft = createSprite(width*0.5 - 80, height-30, 80, 20);
	btnLeft.shapeColor = color(256);
	btnLeft.immovable = true;
	btnLeft.setCollider("rectangle", 0, 0, 80, 20);
	btnLeft.onMousePressed = function(){
		this.shapeColor = color(33);
		if(player != null) player.jumpLeft();
	}
	btnLeft.onMouseReleased = function(){
		this.shapeColor = color(256);
	}

	btnRight = createSprite(width*0.5 + 80, height-30, 80, 20);
	btnRight.shapeColor = color(256);
	btnRight.immovable = true;
	btnRight.setCollider("rectangle", 0, 0, 80, 20);
	btnRight.onMousePressed = function(){
		this.shapeColor = color(33);
		if(player != null) player.jumpRight();
	}
	btnRight.onMouseReleased = function(){
		this.shapeColor = color(256);
	}
}

function draw(){
	//console.log("draw");

	background(200);

	// Draw player
	player.draw();
	var playerX = player.x - startBaseX;
	var index = floor(playerX / STAIR_WIDTH);
	player.setLY(stairs[index].getPositionY());

	// Move all stairs
	startBaseX -= STAIR_SPEED;
	if(startBaseX <= -STAIR_WIDTH){
		startBaseX = 0;
		levelUp();// Level up!!
	}

	// Draw all stairs
	for(var i=0; i<stairs.length; i++){
		var x = startBaseX + STAIR_WIDTH * i;
		stairs[i].setPositionX(x);
		stairs[i].draw();
	}

	// Draw counter
	textSize(16);
	textFont(font);
	text("Counter:" + counter, 0, 16);

	// Draw sprites
	drawSprites();

	text("LEFT",  btnLeft.position.x  - 15,  btnLeft.position.y + 8);
	text("RIGHT", btnRight.position.x - 20, btnRight.position.y + 8);
}

function levelUp(){

	// Countup
	counter++;

	// Stairs
	for(var i=0; i<stairs.length-1; i++){
		var num = i + counter;
		var x = startBaseX + STAIR_WIDTH * i;
		var y = stairs[i+1].getPositionY();
		stairs[i].setPositionX(x);
		stairs[i].setPositionY(y);
		stairs[i].setNum(num);
	}

	// Last stair
	var index = stairs.length - 1;
	var num = index + counter;
	if(primes.includes(num)){
		stairBaseY -= STAIR_PADDING * stairBaseToggle;
		if(stairBaseY < 100) stairBaseToggle = -1;// Go down
		if(290 < stairBaseY) stairBaseToggle = 1; // Go up
	}
	var x = startBaseX + STAIR_WIDTH * index;
	var y = stairBaseY;
	// Wall or Hall
	if(primes.includes(num)){
		y -= STAIR_PADDING * 4;
	}
	stairs[index].setPositionX(x);
	stairs[index].setPositionY(y);
	stairs[index].setNum(num);

	// Finish
	if(NUMBER_LIMIT <= num){
		noLoop();
	}
}

class Stair{

	constructor(x, y, width, height, num){
		this.x      = x;
		this.y      = y;
		this.width  = width;
		this.height = height;
		this.num    = num;
	}

	setPositionX(x){
		this.x = x;
	}

	setPositionY(y){
		this.y = y;
	}

	getPositionX(){
		return this.x;
	}

	getPositionY(){
		return this.y;
	}

	setNum(num){
		this.num = num;
	}

	draw(){
		fill(33);
		noStroke();
		rect(this.x, this.y, this.width, this.height);
		textSize(16);
		textFont(font);
		text(this.num, this.x, this.y);
	}
}

class Player{

	constructor(x, y, width, height){
		this.x       = x;
		this.y       = y;
		this.width   = width;
		this.height  = height;

		this.dX      = 0.0;
		this.dY      = 0.0;
		this.gY      = +0.9;// Gravity
		this.jX      = 1;
		this.jY      = -12.0;// Jump
		this.lY      = y;    // Land
		this.jumpFlg = false;
	}

	setPositionX(x){
		this.x = x;
	}

	setPositionY(y){
		this.y = y;
	}

	getPositionX(){
		return this.x;
	}

	getPositionY(){
		return this.y;
	}

	intersectPosition(x, y){
		if(x < this.x) return false;
		if(this.x + this.width < x) return false;
		if(y < this.y) return false;
		if(this.y + this.height < y) return false;
		return true;
	}

	setDX(dX){
		this.dX = dX;
	}

	setDY(dY){
		this.dY = dY;
	}

	setJY(jY){
		this.jY = jY;
	}

	setLY(lY){
		this.lY = lY;
	}

	jump(){
		if(this.jumpFlg == true) return;
		this.jumpFlg = true;
		this.dY = this.jY;
		this.lY = this.y;
	}

	jumpLeft(){
		if(this.jumpFlg == true) return;
		this.jumpFlg = true;
		this.dX = -this.jX;
		this.dY = this.jY;
		this.lY = this.y;
	}

	jumpRight(){
		if(this.jumpFlg == true) return;
		this.jumpFlg = true;
		this.dX = +this.jX;
		this.dY = this.jY;
		this.lY = this.y;
	}

	draw(){
		// Fall
		if(this.y < this.lY){
			this.jumpFlg = true;
		}
		// Gravity
		if(this.jumpFlg == true){
			this.dY += this.gY;
		}
		// Land or Wall
		if(this.lY < this.y){
			if(this.jumpFlg == true){
				if(0 < this.dY){
					if(this.y <= this.lY + this.dY){
						// you land on wall
						this.y = this.lY;
					}else{
						// you hit by wall
						this.y = 0;
					}
				}else{
					// you hit by wall
					this.y = 0;
				}
			}else{
				// you hit by wall
				this.y = 0;
			}
			this.jumpFlg = false;
			this.dX = 0.0;
			this.dY = 0.0;
		}
		// Move
		this.x += this.dX;
		this.y += this.dY;

		// Draw
		fill(33);
		noStroke();
		rect(
			this.x-this.width, this.y-this.height,
			this.width, this.height);
	}
}

//==========
// Untility
function getPrimes(num){
	var primes = [2, 3];
	for(var i=5; i<num; i+=2){
		var flg = false;
		for(var j=0; primes[j]*primes[j]<=i; j++){
			if(i % primes[j] == 0){
				flg = true;
				break;
			}
		}
		if(flg == false) primes.push(i);
	}
	return primes;
}