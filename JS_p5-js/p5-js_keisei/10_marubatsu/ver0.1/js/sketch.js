const FREE = 0;
const MARU = 1;// Player
const BATU = 2;// Com

const G_SIZE = 60;
const N = 3;
let board = Array.from(new Array(N), ()=>new Array(N).fill(0));
let scores = Array.from(new Array(N), ()=>new Array(N).fill(0));

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
	noSmooth();
	angleMode(DEGREES);
	rectMode(CENTER);

	setMark(0, 2, MARU);
	setMark(2, 0, BATU);
	setMark(1, 1, MARU);
	setMark(2, 1, BATU);
	setMark(0, 1, MARU);
	searchCom(BATU, 1);

	consoleArr(scores);
	let min = 0;
	let nR = nC = -1;
	for(let r=0; r<N; r++){
		for(let c=0; c<N; c++){
			if(min < scores[r][c]) continue;
			min = scores[r][c];
			nR = r;
			nC = c;
		}
	}
	console.log("次は[" + nR + ", " + nC + "]に打つのじゃ!!");
}

function draw(){
	background(33);
	showBoard();
}

function searchCom(mark, steps){

	for(let r=0; r<N; r++){
		for(let c=0; c<N; c++){
			if(board[r][c] != FREE) continue;
			if(setMark(r, c, mark)){
				console.log("= Win[" + mark + "] =");
				console.log("   steps:" + steps + " r:" + r + ", c:" + c);
				consoleArr(board);

				let score = (mark==MARU) ? 10/steps:-10/steps;
				console.log("score:" + score, r, c);
				scores[r][c] += score;

				resetMark(r, c);
				return;
			}
			let next = (mark==MARU) ? BATU:MARU;
			searchCom(next, steps+1);
			resetMark(r, c);
		}
	}
}

function setMark(r, c, mark){
	board[r][c] = mark;
	return checkBoard(mark);
}

function resetMark(r, c){
	board[r][c] = FREE;
}

function checkBoard(mark){
	loopH:
	for(let r=0; r<N; r++){
		for(let c=0; c<N; c++){
			if(board[r][c] != mark) continue loopH;
		}
		return true;
	}

	loopV:
	for(let c=0; c<N; c++){
		for(let r=0; r<N; r++){
			if(board[r][c] != mark) continue loopV;
		}
		return true;
	}
	
	let flgA = true;
	for(let a=0; a<N; a++){
		if(board[a][a] != mark){
			flgA = false;
			break;
		}
	}
	if(flgA) return true;

	let flgB = true;
	for(let b=0; b<N; b++){
		if(board[b][N-1-b] != mark){
			flgB = false;
			break;
		}
	}
	if(flgB) return true;
	
	return false;
}

function consoleArr(arr){
	let str = "";
	for(let line of arr){
		str += line.join(",") + "\r\n";
	}
	console.log(str);
}

function showBoard(){
	let sX = width/2 - (N-1)*G_SIZE/2;
	let sY = height/2 - (N-1)*G_SIZE/2;
	for(let r=0; r<N; r++){
		for(let c=0; c<N; c++){
			let x = sX + c * G_SIZE;
			let y = sY + r * G_SIZE;
			showMark(x, y, board[r][c]);
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