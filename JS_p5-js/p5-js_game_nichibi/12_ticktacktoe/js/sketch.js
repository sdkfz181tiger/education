
let MARU = 1;
let BATU = 2;

let C_SIZE = 320;
let GRIDS = 3;
let gSize = C_SIZE/GRIDS;
let ticktack = 0;

let map = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0]
];

function setup(){
	createCanvas(C_SIZE, C_SIZE);
	noLoop();
	background(33);

	drawLines();
}

function drawLines(){

	noFill();
	stroke(255);
	strokeWeight(4);

	for(let r=1; r<GRIDS; r++){
		let y = gSize * r;
		line(0, y, width, y);
	}

	for(let c=1; c<GRIDS; c++){
		let x = gSize * c;
		line(x, 0, x, height);
	}
}

function mousePressed(){

	noFill();
	stroke(255);
	strokeWeight(4);

	let c = floor(mouseX / gSize);
	let r = floor(mouseY / gSize);
	let x = c * gSize + gSize / 2;
	let y = r * gSize + gSize / 2;
	let s = gSize / 2;
	console.log(r, c);

	if(ticktack % 2 == 0){
		map[r][c] = MARU;
		stroke(220, 100, 33);
		circle(x, y, s);
	}else{
		map[r][c] = BATU;
		stroke(33, 100, 220);
		line(x-s/2, y-s/2, x+s/2, y+s/2);
		line(x+s/2, y-s/2, x-s/2, y+s/2);
	}

	ticktack++;

	console.log(map);

	if(judge(MARU)){
		console.log("MARU win!!");
		noStroke();
		fill(33);
		rect(0, height-24, width, 24);
		fill(220, 100, 33);
		drawText("MARU win!!");
	}

	if(judge(BATU)){
		console.log("BATU win!!");
		noStroke();
		fill(33);
		rect(0, height-24, width, 24);
		fill(33, 100, 220);
		drawText("BATU win!!");
	}
}

function judge(t){

	for(let r=0; r<GRIDS; r++){
		let flg = true;
		for(let c=0; c<GRIDS; c++){
			if(map[r][c] != t) flg = false;
		}
		if(flg == true) return true;
	}

	for(let c=0; c<GRIDS; c++){
		let flg = true;
		for(let r=0; r<GRIDS; r++){
			if(map[r][c] != t) flg = false;
		}
		if(flg == true) return true;
	}

	let flgA = true;
	let flgB = true;
	for(let i=0; i<GRIDS; i++){
		if(map[i][i] != t) flgA = false;
		if(map[i][GRIDS-i-1] != t) flgB = false;
	}
	if(flgA == true) return true;
	if(flgB == true) return true;

	return false;
}

function drawText(str){
	textSize(24);
	textAlign(CENTER, BOTTOM);
	text(str, width / 2, height);
}



