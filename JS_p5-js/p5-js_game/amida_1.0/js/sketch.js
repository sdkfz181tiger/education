console.log("Hello p5.js!!");

const START_X   = 40;
const START_Y   = 50;
const A_HEIGHT  = 220;
const V_NUM     = 8;
const H_NUM     = 5;

let paddingV    = 0;
let paddingH    = 0;

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

	// Padding
	paddingV = (width-START_X*2) / (V_NUM-1);
	paddingH = (A_HEIGHT-10) / (V_NUM * H_NUM);

	// Vertical
	for(let v=0; v<V_NUM; v++){
		let x = START_X + paddingV * v;
		let y = START_Y;
		line(x, y, x, y+A_HEIGHT);
	}

	// Horiozntal
	for(let v=0; v<V_NUM-1; v++){
		for(let h=0; h<H_NUM; h++){
			let lX = START_X + paddingV * v;
			let lY = START_Y + nums[H_NUM*v+h] * paddingH + 10;
			let rX = lX + paddingV;
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
	for(let i=0; i<amidas.length; i+=3){
		checkAmida(amidas, i);
	}
}

function detectAmida(amidas, index){
	let pX  = START_X + paddingV * index;
	let pY  = START_Y;
	let bar = trace(amidas[index], pX, pY);
	let points = [{x: pX, y: pY}];
	while(bar != null){
		index = bar.index;
		pX  = bar.toX;
		pY  = bar.toY;
		bar = trace(amidas[index], pX, pY);
		points.push({x: pX, y: pY});
	}
	points.push({x: pX, y: START_Y+A_HEIGHT});
	return points;
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

function dastenfeldShuffle(arr){
	for(let i=arr.length-1; 0<i; i--){
		let rdm  = Math.floor(Math.random() * i);
		let tmp  = arr[i];
		arr[i]   = arr[rdm];
		arr[rdm] = tmp;
	}
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

function checkAmida(amidas, index){
	colorMode(HSB);
	strokeWeight(4);
	let rdm = random(0, 360);
	stroke(rdm, 100, 100);
	fill(rdm, 100, 100);

	let result = detectAmida(amidas, index);
	let sX = result[0].x;
	let sY = result[0].y;
	circle(sX, sY, 5);
	let rX = result[result.length-1].x;
	let rY = result[result.length-1].y;
	circle(rX, rY, 5);

	textSize(32);
	textAlign(CENTER);
	textFont(font);
	noStroke();
	text(index, sX+2, sY-4);
	text(index, rX+2, rY+34);
}