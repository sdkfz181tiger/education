console.log("Hello p5.js!!");

const cols = 7;
const rows = 5;
const size = 64;

let index = 0;

function setup(){
	console.log("setup!!");

	createCanvas(480, 320);
	background(33, 33, 33);
	colorMode(HSB);// 色相 0~360
	noStroke();
	tiles();
}

function tiles(){
	background(0, 0, 0);

	let rdm     = floor(random(0, 360));
	let colorOK = color(rdm, 100, 100);
	let colorNG = color(rdm, 60, 60);

	index = floor(random(0, cols * rows));

	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let i = r*cols + c;
			if(i == index){
				fill(colorOK);
			}else{
				fill(colorNG);
			}
			rect(size*c, size*r, size-2, size-2);
		}
	}
}

function mousePressed(){

	let x = size * (index%cols);
	let y = size * floor(index/cols);
	let colorIndex = get(x, y);
	let colorPressed = get(mouseX, mouseY);

	let flg = true;
	for(let i=0; i<colorIndex.length; i++){
		if(colorIndex[i] != colorPressed[i]){
			flg = false;
			break;
		}
	}
	
	if(flg == true) tiles();
}