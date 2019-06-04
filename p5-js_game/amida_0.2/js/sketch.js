console.log("Hello p5.js!!");

const START_X   = 40;
const START_Y   = 50;
const A_PADDING = 50;
const A_HEIGHT  = 220;
const V_NUM     = 9;
const H_NUM     = 5;

let font  = null;

function preload(){
	// Font, Sound
	font  = loadFont("./assets/misaki_gothic.ttf");
}

function setup(){
	console.log("setup!!");
	createCanvas(480, 320);
	background(33, 33, 33);

	stroke(255);
	strokeWeight(2);

	let amidas = [];
	for(let v=0; v<V_NUM; v++){
		let bars = [];
		amidas.push(bars);
	}

	let nums = [];
	for(let i=0; i<V_NUM*H_NUM; i++) nums.push(i);
	dastenfeldShuffle(nums);

	// Vertical
	for(let v=0; v<V_NUM; v++){
		let x = START_X + A_PADDING * v;
		let y = START_Y;
		line(x, y, x, y+A_HEIGHT);
	}

	// Horiozntal
	let offset  = 20;
	let padding = (A_HEIGHT-offset) / (V_NUM * H_NUM);
	for(let v=0; v<V_NUM-1; v++){
		for(let h=0; h<H_NUM; h++){
			let lX = START_X + A_PADDING * v;
			let lY = START_Y + nums[H_NUM*v+h] * padding + offset;
			let rX = lX + A_PADDING;
			let rY = lY;
			line(lX, lY, rX, rY);
			// Amidas
			let fromL = {index:v+1, fromX:lX, fromY:lY, toX:rX, toY:rY};
			amidas[v].push(fromL);
			let fromR = {index:v, fromX:rX, fromY:rY, toX:lX, toY:lY};
			amidas[v+1].push(fromR);
		}
	}

	// Sort
	for(let i=0; i<amidas.length; i++){
		bubbleSort(amidas[i]);
	}

	// Test
	colorMode(HSB);
	strokeWeight(3);
	for(let i=0; i<amidas.length; i++){
		let rdm = random(0, 360);
		stroke(rdm, 100, 100);
		detectAmida(amidas, i);
	}
}

function dastenfeldShuffle(arr){
	for(let i=arr.length-1; 0<i; i--){
		let rdm  = Math.floor(Math.random() * i);
		let tmp  = arr[i];
		arr[i]   = arr[rdm];
		arr[rdm] = tmp;
	}
}

function detectAmida(amidas, index){
	let pX  = START_X + A_PADDING * index;
	let pY  = START_Y;
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