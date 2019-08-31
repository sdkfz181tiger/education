console.log("Hello p5.js!!");

const RECT_SIZE     = 30;
const INTERVAL_TIME = 800;

const MIDIS = [60, 62, 64, 65, 67, 69, 71, 72];
const ROWS  = MIDIS.length;
const COLS  = MIDIS.length;

let myFft;
let myMatrix;
let index;

function preload(){
	console.log("preload");

	// Font
	let font = loadFont("assets/misaki_gothic.ttf");
	textSize(12);
	textFont(font);
	textAlign(CENTER);

	// FFT
	myFft = new p5.FFT();
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(64);
	background(0);

	// Matrix
	index = 0;
	myMatrix = [];
	let startX = width / 2 - ROWS * RECT_SIZE / 2;
	let startY = height / 2 - COLS * RECT_SIZE / 2;
	for(let r=0; r<ROWS; r++){
		let myNotes = [];
		for(let c=0; c<COLS; c++){
			let posX = c * RECT_SIZE + startX;
			let posY = r * RECT_SIZE + startY;
			let myNote = new MyNote(posX, posY, RECT_SIZE, MIDIS[c]);
			myNotes.push(myNote);
		}
		myMatrix.push(myNotes);
	}

	// Interval
	setInterval(()=>{
		for(let c=0; c<COLS; c++){
			myMatrix[index][c].play();
		}
		index++;
		if(ROWS <= index) index = 0;
	}, INTERVAL_TIME);
}

function draw(){
	//console.log("draw");
	background(0);

	// Matrix
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			myMatrix[r][c].draw();
		}
	}

	// Waves
	showWaves();
}

function mousePressed(e){

	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			myMatrix[r][c].mousePressed(e);
		}
	}
}