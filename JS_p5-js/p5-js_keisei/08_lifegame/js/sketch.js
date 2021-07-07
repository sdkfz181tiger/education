
const SIZE = 10;
let ROWS = 10;
let COLS = 10;
let cells = [];
let dummies = [];

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	rectMode(CENTER);
	noSmooth();
	frameRate(8);
	background(33);

	ROWS = height / SIZE + 1;
	COLS = width / SIZE + 1;

	// Data
	for(let r=0; r<ROWS; r++){
		let linesA = [];
		let linesB = [];
		for(let c=0; c<COLS; c++){
			linesA.push(Math.random() < 0.5);
			linesB.push(false);
		}
		cells.push(linesA);
		dummies.push(linesB);
	}
}

function draw(){
	background(33);

	fill(255);
	let sX = width / 2 - (SIZE * COLS)/2;
	let sY = height / 2 - (SIZE * ROWS)/2;
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			let x = sX + c * SIZE;
			let y = sY + r * SIZE;
			if(cells[r][c]) square(x, y, SIZE);
		}
	}
	step();
}

function mousePressed(){

	let r = floor(mouseY / SIZE) + 1;
	let c = floor(mouseX / SIZE) + 1;
	for(let i=0; i<10; i++){
		let oR = r + floor(random(-2, 2));
		let oC = c + floor(random(-2, 2));
		if(oR < 0 || oC < 0) continue;
		if(ROWS <= r || COLS <= c) continue;
		cells[oR][oC] = true;
	}
}

function step(){

	clearArr(dummies);
	// LifeGame
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			let counter = getAliveCnt(r, c);
			if(checkArr(cells, r, c)){
				if(2 <= counter && counter <= 3){
					dummies[r][c] = true;
				}else{
					dummies[r][c] = false;
				}
			}else{
				if(counter == 3){
					dummies[r][c] = true;
				}else{
					dummies[r][c] = false;
				}
			}
		}
	}
	copyArr(dummies, cells);
}

function getAliveCnt(r, c){
	let counter = 0;
	const dirs = [
		[-1, -1], [-1, 0], [-1, 1], [0, -1], 
		[0, 1], [1, -1], [1, 0], [1, 1]];
	for(let dir of dirs){
		if(checkArr(cells, r+dir[0], c+dir[1])) counter++;
	}
	return counter;
}

function checkArr(arr, r, c){
	if(r < 0 || c < 0 || ROWS <= r || COLS <= c) return false;
	return arr[r][c];
}

function clearArr(arr){
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			arr[r][c] = false;
		}
	}
}

function copyArr(arrA, arrB){
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			arrB[r][c] = arrA[r][c];
		}
	}
}