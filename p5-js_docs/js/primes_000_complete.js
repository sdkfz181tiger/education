const NUMBER_LIMIT  = 100;
const STAIR_WIDTH   = 30;
const STAIR_HEIGHT  = 480;
const STAIR_PADDING = -10;

var font;
var stairTotal;
var stairBaseline;
var counter;
var primes;
var stairs;

function preload(){
	font = loadFont("assets/misaki_gothic.ttf");
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(200);
	frameRate(8);
	noLoop();

	// Total, Baseline
	stairTotal = width / STAIR_WIDTH;
	stairBaseline = height + STAIR_PADDING;

	// Counter
	counter = 0;

	// Create primes
	primes = getPrimes(NUMBER_LIMIT);
	console.log(primes);

	// Create stairs
	stairs = new Array();
	for(var i=0; i<stairTotal; i++){
		var num = i;
		if(primes.includes(num)){
			stairBaseline += STAIR_PADDING;
		}
		var x = STAIR_WIDTH * i;
		var y = stairBaseline;
		var stair = new Stair(x, y, STAIR_WIDTH, STAIR_HEIGHT, num);
		stairs.push(stair);
	}
}

function draw(){
	console.log("draw");

	background(200);

	// Draw all stairs
	for(var i=0; i<stairs.length-1; i++){
		var num = i + counter;
		var x = STAIR_WIDTH * i;
		var y = stairs[i+1].getPositionY();
		stairs[i].setPosition(x, y);
		stairs[i].setNum(num);
		stairs[i].draw();
	}

	// Last stair
	var index = stairs.length - 1;
	var num = index + counter;
	if(primes.includes(num)){
		stairBaseline += STAIR_PADDING;
	}
	var x = STAIR_WIDTH * index;
	var y = stairBaseline;
	stairs[index].setPosition(x, y);
	stairs[index].setNum(num);
	stairs[index].draw();

	// Finish
	if(NUMBER_LIMIT <= num){
		noLoop();
	}

	// Countup
	textSize(16);
	textFont(font);
	text("Counter:" + counter, 0, 16);
	counter++;
}

function mousePressed(){
	console.log("= loop =");
	var index = stairs.length - 1;
	var num = index + counter;
	if(NUMBER_LIMIT <= num) return;
	loop();
}

function mouseReleased(){
	console.log("= noLoop =");
	noLoop();
}

class Stair{

	constructor(x, y, width, height, num){
		this.x      = x;
		this.y      = y;
		this.width  = width;
		this.height = height;
		this.num    = num;
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

	setNum(num){
		this.num = num;
	}

	intersectPosition(x, y){
		if(x < this.x) return false;
		if(this.x + this.width < x) return false;
		if(y < this.y) return false;
		if(this.y + this.height < y) return false;
		return true;
	}

	draw(){
		fill(33);
		noStroke();
		rect(this.x, this.y, this.width, this.height);
		textSize(12);
		textFont(font);
		text(this.num, this.x, this.y);
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