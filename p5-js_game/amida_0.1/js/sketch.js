console.log("Hello p5.js!!");

const START_X = 50;
const START_Y = 50;
const A_PADDING = 46;
const A_HEIGHT  = 220;

let font  = null;

function preload(){
	// Font, Sound
	font  = loadFont("./assets/misaki_gothic.ttf");
}

function setup(){
	console.log("setup!!");
	createCanvas(480, 320);
	background(33, 33, 33);

	let nums = [3, 2, 3, 2, 3, 2, 3, 2, 0];
	let amidas = [];
	for(let i=0; i<nums.length; i++){
		let bars = [];
		amidas.push(bars);
	}

	stroke(255);
	strokeWeight(2);

	// Vertical
	for(let i=0; i<nums.length; i++){
		let x = START_X + A_PADDING * i;
		let y = START_Y;
		line(x, y, x, y+A_HEIGHT);
		// Horizontal
		for(let s=0; s<nums[i]; s++){
			let lX = x;
			let lY = y + random(30, A_HEIGHT-30);
			let rX = lX + A_PADDING;
			let rY = lY;
			line(lX, lY, rX, rY);
			// Amidas
			let fromL = {index:i+1, fromX:lX, fromY:lY, toX:rX, toY:rY};
			amidas[i].push(fromL);
			let fromR = {index:i, fromX:rX, fromY:rY, toX:lX, toY:lY};
			amidas[i+1].push(fromR);
		}
	}

	// Sort
	for(let i=0; i<amidas.length; i++){
		bubbleSort(amidas[i]);
	}

	colorMode(HSB);
	stroke(0, 100, 100);
	strokeWeight(4);
	detectAmida(amidas, 0);
	stroke(100, 100, 100);
	detectAmida(amidas, 7);
}

function detectAmida(amidas, index){
	let pX = START_X + A_PADDING * index;
	let pY = START_Y;
	let bar = trace(amidas[index], pX, pY);
	while(bar != null){
		index = bar.index;
		pX  = bar.toX;
		pY  = bar.toY;
		bar = trace(amidas[index], pX, pY);
	}
	return index;
}

function trace(bars, pX, pY){
	for(let i=0; i<bars.length; i++){
		if(pY < bars[i].toY){
			line(pX, pY, bars[i].fromX, bars[i].fromY);
			line(bars[i].fromX, bars[i].fromY, bars[i].toX, bars[i].toY);
			return bars[i];
		}
	}
	line(pX, pY, pX, START_Y+A_HEIGHT);
	return null;
}

function bubbleSort(arr){
	for(let l=arr.length-1; 0<=l; l--){
		for(let s=0; s<=l-1; s++){
			if(arr[s+1].toY < arr[s].toY){
				let tmp  = arr[s];
				arr[s]   = arr[s+1];
				arr[s+1] = tmp;
			}
		}
	}
}