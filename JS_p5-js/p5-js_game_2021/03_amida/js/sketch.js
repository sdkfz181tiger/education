
const names = [
	"子", "丑", "寅", "兎", "辰", "巳", 
	"午", "未", "猿", "酉", "戌", "亥"];
const goals = [
	"1", "2", "3", "4", "5", "6", 
	"7", "8", "9", "10", "11", "12"];

const V_NUM = names.length;// 縦のライン数
const H_NUM = 3; // 横のライン数

let amidas  = null;
let nums    = 0;
let index   = 0;

let aHeight = 0;// アミダくじの高さ
let padV    = 0;// 横の間隔
let padH    = 0;// 縦の間隔
let startX  = 0;
let startY  = 0;

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(8);
	noSmooth();
	textSize(32);

	// Amidas
	amidas = Array.from(new Array(V_NUM), ()=>{return new Array();});

	let num = 0;
	nums = Array.from(new Array(V_NUM*H_NUM), ()=>{return num++;});

	shuffleArr(nums);// シャッフル
	shuffleArr(names);
	shuffleArr(goals);

	aHeight = height * 0.8;
	padV    = width * 0.9 / (V_NUM-1);
	padH    = (aHeight*0.9) / (V_NUM * H_NUM);
	startX  = width / 2 - padV * (amidas.length - 1) / 2;
	startY  = height / 2 - aHeight / 2;
}

function draw(){
	colorMode(RGB);
	background(33, 33, 33);
	stroke(255);
	strokeWeight(2);

	// Vertical lines
	for(let v=0; v<V_NUM; v++){
		let x = startX + padV * v;
		let y = startY;
		line(x, y, x, y+aHeight);
	}

	// Horiozntal lines
	for(let v=0; v<V_NUM-1; v++){
		for(let h=0; h<H_NUM; h++){
			let lX = floor(startX + padV * v);
			let lY = floor(startY + nums[H_NUM*v+h] * padH + 10);
			let rX = floor(lX + padV);
			let rY = floor(lY);
			line(lX, lY, rX, rY);
			// Connect
			let fromL = {index:v+1, fromX:lX, fromY:lY, toX:rX, toY:rY};
			amidas[v].push(fromL);
			let fromR = {index:v, fromX:rX, fromY:rY, toX:lX, toY:lY};
			amidas[v+1].push(fromR);
		}
	}

	// Sort
	for(let amida of amidas){
		amida.sort((a, b)=>{return (a.toY > b.toY);});
	}

	// Test
	checkAmida(amidas, index++);
	if(amidas.length-1 < index) index = 0;
}

function shuffleArr(arr){
	for(let i=arr.length-1; 0<i; i--){
		let rdm   = Math.floor(Math.random() * i);
		let tmp   = arr[i];
		arr[i]   = arr[rdm];
		arr[rdm] = tmp;
	}
}

function checkAmida(amidas, index){
	colorMode(HSB);
	strokeWeight(4);

	stroke(50, 100, 100);
	fill(50, 100, 100);

	let result = detectAmida(amidas, index);
	let sX = result[0].x;
	let sY = result[0].y;
	circle(sX, sY, 5);
	let rX = result[result.length-1].x;
	let rY = result[result.length-1].y;
	circle(rX, rY, 5);

	noStroke();
	textAlign(CENTER, BOTTOM);
	text(names[index], sX, sY-5);
	textAlign(CENTER, TOP);
	text(index, rX, rY+5);
}

function detectAmida(amidas, index){
	let pX  = startX + padV * index;
	let pY  = startY;
	let bar = trace(amidas[index], pX, pY);
	let points = [{x: pX, y: pY}];
	while(bar != null){
		index = bar.index;
		pX  = bar.toX;
		pY  = bar.toY;
		bar = trace(amidas[index], pX, pY);
		points.push({x: pX, y: pY});
	}
	points.push({x: pX, y: startY+aHeight});
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
	line(pX, pY, pX, startY+aHeight);
	return null;
}