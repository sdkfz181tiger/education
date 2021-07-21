
let size = 60;
let rows, cols;
let aR, aC;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	noLoop();
	background(100);
}

function draw(){
	background(33);

	size *= 0.98;

	rows = floor(height / size);
	cols = floor(width / size);

	aR = floor(random(rows));
	aC = floor(random(cols));

	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = c * size;
			let y = r * size;
			if(aR == r && aC == c){
				fill(200);
				square(x, y, size);
				drawKanji(x, y, size, "鬼");
			}else{
				fill(100);
				square(x, y, size);
				drawKanji(x, y, size, "犬");
			}
		}
	}
}

function drawKanji(x, y, s, t){
	fill(33);
	noStroke();
	textSize(s);
	textAlign(CENTER);
	text(t, x+s*0.5, y+s*0.9);
}

function mousePressed(){

	let mR = floor(mouseY / size);
	let mC = floor(mouseX / size);

	if(mR == aR && mC == aC){
		console.log("CLEAR!!");
		fill(200);
		noStroke();
		textSize(64);
		textAlign(CENTER);
		text("CLEAR!!", width/2, height/2);
		setTimeout(draw, 200);
	}
}