console.log("Hello p5.js!!");

const T_ROWS = 3;
const T_COLS = 3;
const T_SIZE = 64;

let font  = null;
let tiles = null;

function preload(){
	// Font, Sound
	font  = loadFont("./assets/misaki_gothic.ttf");
}

function setup(){
	console.log("setup!!");
	createCanvas(480, 320);
	background(33, 33, 33);
	frameRate(32);

	tiles = [];

	let startX = width  * 0.5 - T_COLS * T_SIZE * 0.5 + T_SIZE * 0.5;
	let startY = height * 0.5 - T_ROWS * T_SIZE * 0.5 + T_SIZE * 0.5;
	for(let r=0; r<T_ROWS; r++){
		for(let c=0; c<T_COLS; c++){
			let x = startX + c * T_SIZE;
			let y = startY + r * T_SIZE;
			let tile = createSprite(x, y, T_SIZE-4, T_SIZE-4);
			tile.shapeColor = color(255, 255, 255);
			tiles.push(tile);
		}
	}

	colorMode(HSB);
	tick();
}

function tick(){
	console.log("tick!!");

	let dObj = new Date();
	let s = dObj.getSeconds();

	for(let i=0; i<tiles.length; i++){
		setTimeout(()=>{
			tiles[i].rotationSpeed = 10;
			setTimeout(()=>{
				tiles[i].rotationSpeed = 0;
				tiles[i].rotation = 0;
				let h = 360 * s / 60;
				tiles[i].shapeColor = color(h, 80, 100);
			}, 300);
		}, 1000 / (tiles.length) * i);
	}
	setTimeout(tick, 3000);
}

function draw(){
	background(33, 33, 33);
	drawSprites();
}