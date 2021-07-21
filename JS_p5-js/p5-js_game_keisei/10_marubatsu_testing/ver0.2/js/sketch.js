const FREE = 0;
const MARU = 1;// Player
const BATU = 2;// Com

const G_SIZE = 60;
const N = 3;

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
	noSmooth();
	angleMode(DEGREES);
	rectMode(CENTER);
}

function draw(){
	background(33);

	let arr = [
		[1, 2, 1],
		[2, 2, 0],
		[1, 0, 0]
	];
	search(arr, MARU);
}

function search(arr, mark){
	console.log("search");
	consoleArr(arr);

	for(let r=0; r<N; r++){
		for(let c=0; c<N; c++){
			if(arr[r][c] != FREE) continue;
			let copy = JSON.parse(JSON.stringify(arr));
			copy[r][c] = mark;
			if(check(copy, mark)){
				console.log("You win[" + mark + "]");
				consoleArr(copy);
				return;
			}
			let next = (mark==MARU) ? BATU:MARU;
			search(arr, next);
		}
	}
}

function consoleArr(arr){
	let str = "";
	for(let line of arr) str += line.join(",") + "\r\n";
	console.log(str);
}

function check(arr, mark){
	loopH:
	for(let r=0; r<N; r++){
		for(let c=0; c<N; c++){
			if(arr[r][c] != mark) continue loopH;
		}
		return true;
	}

	loopV:
	for(let c=0; c<N; c++){
		for(let r=0; r<N; r++){
			if(arr[r][c] != mark) continue loopV;
		}
		return true;
	}
	
	let flgA = true;
	for(let a=0; a<N; a++){
		if(arr[a][a] != mark){
			flgA = false;
			break;
		}
	}
	if(flgA) return true;

	let flgB = true;
	for(let b=0; b<N; b++){
		if(arr[b][N-1-b] != mark){
			flgB = false;
			break;
		}
	}
	if(flgB) return true;
	
	return false;
}

function showArr(arr){
	let sX = width/2 - (N-1)*G_SIZE/2;
	let sY = height/2 - (N-1)*G_SIZE/2;
	for(let r=0; r<N; r++){
		for(let c=0; c<N; c++){
			let x = sX + c * G_SIZE;
			let y = sY + r * G_SIZE;
			showMark(x, y, arr[r][c]);
		}
	}
}

function showMark(x, y, mark){
	fill(100);
	stroke(33);
	strokeWeight(2);
	square(x, y, G_SIZE);
	noFill();
	stroke(255);
	strokeWeight(5);
	if(mark == MARU) circle(x, y, G_SIZE*0.6);
	if(mark == BATU){
		const len = G_SIZE*0.25;
		line(x-len, y-len, x+len, y+len);
		line(x+len, y-len, x-len, y+len);
	}
}