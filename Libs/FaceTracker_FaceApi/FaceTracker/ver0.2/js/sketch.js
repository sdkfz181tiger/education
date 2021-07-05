
let cvs, ctrack, iImage;

function preload(){
	iImage = loadImage("assets/sample_02.png");
}

function setup(){
	cvs = createCanvas(iImage.width, iImage.height);
	angleMode(DEGREES);
	noLoop();
	background(100);

	// Tracker
	ctrack = new clm.tracker({stopOnConvergence: true});
	ctrack.init();

	// Detect if tracker fails to find a face
	document.addEventListener("clmtrackrNotFound", (e)=>{
		ctrack.stop();
		console.log("clmtrackrNotFound...");
	}, false);

	// Detect if tracker loses tracking of face
	document.addEventListener("clmtrackrLost", (e)=>{
		ctrack.stop();
		console.log("clmtrackrLost...");
	}, false);

	// Detect if tracker has converged
	document.addEventListener("clmtrackrConverged", (e)=>{
		//ctrack.stop();
		console.log("Converged!!");
		let position = ctrack.getCurrentPosition();
		if(position) detectNose(position);
	}, false);
}

function draw(){
	console.log("draw!!");
	background(100);
	image(iImage, 0, 0);
	ctrack.start(cvs.canvas);
}

function detectNose(position){
	console.log("detectNose!!", position);
	//ctrack.draw(cvs.canvas);// Debug

	circle(width / 2, height / 2, 30);

	let lX = position[42][0];
	let lY = position[42][1];
	let rX = position[43][0];
	let rY = position[43][1];

	fill(255, 0, 0);
	circle(lX, lY, 10);
	circle(rX, rY, 10);

	drawHair(lX, lY, 60);
	drawHair(rX, rY, 50);
}

function drawHair(x, y, len){
	stroke(33);
	strokeWeight(2);
	for(let i=0; i<10; i++){
		let l = len * random();
		let d = 90 + random(-30, 30);
		let tX = x + l * cos(d);
		let tY = y + l * sin(d);
		line(x, y, tX, tY);
	}
}