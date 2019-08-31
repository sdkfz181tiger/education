console.log("Hello p5.js!!");

const DEG_TO_RAD = Math.PI / 180;

const ROWS = 50;
const COLS = 50;
const SIZE = 5;

let startX;
let startY;

let map;
let cells;

// 初期化
function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(8);
	background(0);

	noStroke();
	fill(200, 200, 200);

	// Start position
	startX = width / 2 - COLS * SIZE / 2;
	startY = height / 2 - ROWS * SIZE / 2;

	// Map
	map = [];
	for(let r=0; r<ROWS; r++){
		let lines = [];
		for(let c=0; c<COLS; c++){
			let seed = floor(random(0, 10));
			if(6 < seed){
				lines.push(true);
			}else{
				lines.push(false);
			}
		}
		map.push(lines);
	}

	// Cells
	cells = [];
	for(let r=0; r<ROWS; r++){
		let lines = [];
		for(let c=0; c<COLS; c++){
			let cell = new Cell(r, c, false);
			lines.push(cell);
		}
		cells.push(lines);
	}
}

// 連続処理
function draw(){
	console.log("draw");
	background(0);

	// Map
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			let counter = getAliveCnt(r, c);
			if(checkCell(r, c)){
				if(2 <= counter && counter <= 3){
					cells[r][c].activeFlg = true;
				}else{
					cells[r][c].activeFlg = false;
				}
			}else{
				if(counter == 3){
					cells[r][c].activeFlg = true;
				}else{
					cells[r][c].activeFlg = false;
				}
			}
		}
	}

	// Cells
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			cells[r][c].draw();
			map[r][c] = cells[r][c].activeFlg;
		}
	}
}

function getAliveCnt(r, c){
	let counter = 0;
	if(checkCell(r-1, c-1)) counter++;
	if(checkCell(r-1, c  )) counter++;
	if(checkCell(r-1, c+1)) counter++;
	if(checkCell(r  , c-1)) counter++;
	if(checkCell(r  , c+1)) counter++;
	if(checkCell(r+1, c-1)) counter++;
	if(checkCell(r+1, c  )) counter++;
	if(checkCell(r+1, c+1)) counter++;
	return counter;
}

function checkCell(r, c){
	if(r < 0 || c < 0 || ROWS <= r || COLS <= c) return false;
	return map[r][c];
}

class Cell{

	constructor(r, c, flg){
		this.r = r;
		this.c = c;
		this.flg = flg;
	}

	set activeFlg(val){
		this.flg = val;
	}

	get activeFlg(){
		return this.flg;
	}

	draw(){
		if(this.flg == false) return;
		let x = startX + this.c * SIZE;
		let y = startY + this.r * SIZE;
		rect(x, y, SIZE, SIZE);
	}
}