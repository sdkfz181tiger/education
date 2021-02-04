console.log("Hello p5.js!!");

const W_NAV = 480;
const H_NAV = 33;

const MIN = 1;
const MAX = 100;

let font   = null;
let sndOK  = null;
let sndNG  = null;

let nextNum    = -1;
let currentNum = -1;
let resultNums = [];

function preload(){
	// Font, Sound
	font  = loadFont("./assets/misaki_gothic.ttf");
	sndOK = loadSound("./assets/se_ok.mp3");
	sndNG = loadSound("./assets/se_ng.mp3");
}

function setup(){
	console.log("setup!!");
	createCanvas(480, 320);
	background(33, 33, 33);

	// Current
	nextNum    = floor(random(MIN, MAX));
	currentNum = nextNum;
	console.log("Next, Current:" + nextNum + ", " + currentNum);
	showHighLow();
}

function showHighLow(){
	console.log("showHighLow!!");

	let size = 140;
	let x = width * 0.5 - size * 0.5;
	let y = 60;

	// Tile
	colorMode(HSB);
	let h = 360 * (currentNum / MAX);
	fill(h, 80, 80);
	noStroke();
	square(x, y, size, 10);

	// Text
	colorMode(RGB);
	fill(255);
	textFont(font);
	textSize(128);
	textAlign(CENTER);
	text(currentNum, x+size*0.55, y+size*0.9);

	// High or Low
	fill(255);
	rect(width*0.5-2, height-95, 4, 90);
	textSize(32);
	textAlign(CENTER);
	text("GOOD LUCK!", width*0.5+5, 38);
	textAlign(RIGHT);
	text("LOW <-", width*0.5-5, 285);
	textAlign(LEFT);
	text("-> HIGH", width*0.5+10, 285);

	// Results
	resultNums.push(currentNum);
	console.log(resultNums);
	let str = "";
	let total = 4;
	let offset = (resultNums.length < total)? 0:resultNums.length-total; 
	for(let i=offset; i<resultNums.length; i++){
		str += resultNums[i];
		if(i < resultNums.length-1) str += ",";
	}
	textSize(20);
	textAlign(LEFT);
	text(str, 5, height-5);
}

function mouseReleased(){

	// Next
	nextNum = floor(random(MIN, MAX));
	console.log("Next, Current:" + nextNum + ", " + currentNum);

	if(mouseX < width * 0.5){
		console.log("You selected (Low!)");
		if(nextNum < currentNum){
			background(33, 33, 99);
			sndOK.play();
			console.log("Result: o");
		}else{
			background(99, 33, 33);
			sndNG.play();
			console.log("Result: x");
		}
	}else{
		console.log("You selected (High!)");
		if(currentNum < nextNum){
			background(33, 33, 99);
			sndOK.play();
			console.log("Result: o");
		}else{
			background(99, 33, 33);
			sndNG.play();
			console.log("Result: x");
		}
	}

	// Current
	currentNum = nextNum;
	showHighLow();
}