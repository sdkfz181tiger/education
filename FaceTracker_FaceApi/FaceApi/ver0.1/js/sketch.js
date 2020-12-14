
const FILE_URL  = "./assets/sample_02.png";
const MODEL_URL = "./models";

function preload(){
	iImage = loadImage(FILE_URL);
}

function setup(){
	cvs = createCanvas(iImage.width, iImage.height);
	angleMode(DEGREES);
	noLoop();
	noFill();
	stroke(99, 33, 33);
	strokeWeight(1);
	background(100);
	loadModels();
}

function draw(){
	console.log("draw!!");
	background(100);
	image(iImage, 0, 0);
}

async function loadModels(){
	console.log("loadModels");
	Promise.all([
		faceapi.loadSsdMobilenetv1Model(MODEL_URL),
		faceapi.loadFaceLandmarkModel(MODEL_URL),
		faceapi.loadFaceRecognitionModel(MODEL_URL)
	]).then(detectAllFaces);
}

async function detectAllFaces(){
	console.log("detectAllFaces");
	const sample = await faceapi.fetchImage(FILE_URL);
	let iSize = {width: iImage.width, height: iImage.height};
	let fData = await faceapi.detectAllFaces(sample).withFaceLandmarks();
	let rData = faceapi.resizeResults(fData, iSize);
	rData.forEach(data=>{drawResult(data);});
}

function drawResult(data){
	console.log("drawResult!!");
	console.log(data);
	const det = data.detection;
	const mrk = data.landmarks;
	const box = det.box;

	rect(box.x, box.y, box.width, box.height);
	// for(let i=27; i<35; i++){
	// 	let fX = mrk.positions[i].x;
	// 	let fY = mrk.positions[i].y;
	// 	let tX = mrk.positions[i+1].x;
	// 	let tY = mrk.positions[i+1].y;
	// 	line(fX, fY, tX, tY);
	// }
	let lX = mrk.positions[32].x;
	let lY = mrk.positions[32].y;
	let rX = mrk.positions[34].x;
	let rY = mrk.positions[34].y;
	drawHair(lX, lY, 15);
	drawHair(rX, rY, 8);
}

function drawHair(x, y, len){
	for(let i=0; i<10; i++){
		let l = len * random();
		let d = 90 + random(-30, 30);
		let tX = x + l * cos(d);
		let tY = y + l * sin(d);
		line(x, y, tX, tY);
	}
}