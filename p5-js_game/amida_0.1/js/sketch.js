console.log("Hello p5.js!!");

const START_X = 50;
const START_Y = 50;

let font  = null;

function preload(){
	// Font, Sound
	font  = loadFont("./assets/misaki_gothic.ttf");
}

function setup(){
	console.log("setup!!");
	createCanvas(480, 320);
	background(33, 33, 33);

	let aPadding = 50;
	let aHeight = 220;
	let nums = [2, 2, 2, 0];
	let amidas = [];
	for(let i=0; i<nums.length; i++){
		let bars = [];
		amidas.push(bars);
	}

	stroke(255);
	strokeWeight(2);

	// Vertical
	for(let v=0; v<nums.length; v++){
		let x = START_X + aPadding * v;
		let y = START_Y;
		line(x, y, x, y+aHeight);
		// Horizontal
		for(let s=0; s<nums[v]; s++){
			let lX = x;
			let lY = y + random(30, aHeight-30);
			let rX = lX + aPadding;
			let rY = lY;
			line(lX, lY, rX, rY);
			// Amidas
			let fromL = {v:v+1, x:rX, y:rY};
			amidas[v].push(fromL);
			let fromR = {v:v, x:lX, y:lY};
			amidas[v+1].push(fromR);
		}
	}

	// Sort
	for(let i=0; i<amidas.length; i++){
		bubbleSort(amidas[i]);
	}

	// Test
	let lineX = START_X;
	let lineY = START_Y;
	let v = 3;
	let bar = trace(lineY, amidas[v]);
	console.log(bar);
	while(bar != null){
		v = bar.v;
		lineY = bar.y;
		bar = trace(lineY, amidas[v]);
	}

	console.log("result:" + v);
}

function trace(lineY, bars){
	console.log("trace:" + lineY);
	for(let i=0; i<bars.length; i++){
		if(lineY < bars[i].y) return bars[i];
	}
	return null;
}

function bubbleSort(arr){
	for(let l=arr.length-1; 0<=l; l--){
		for(let s=0; s<=l-1; s++){
			if(arr[s+1].y < arr[s].y){
				let tmp  = arr[s];
				arr[s]   = arr[s+1];
				arr[s+1] = tmp;
			}
		}
	}
}