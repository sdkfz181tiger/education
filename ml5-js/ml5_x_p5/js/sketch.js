console.log("Hello p5.js!!");

const DEG_TO_RAD = Math.PI / 180;

let img;
let classifier;
let glot;

function preload(){
	console.log("preload!!");
	// Image
	img = loadImage("./assets/sample1.png");
	// ml5
	classifier = ml5.imageClassifier("MobileNet");
	// Glottologist
	glot = new Glottologist();
	// TextSpeech
	initSpeechSynthesis();
}
function setup(){
	createCanvas(480, 320);
	// Image
	image(img, 0, 0);
	// ml5
	classifier.classify(img, gotResult);
}

function gotResult(error, results){
	if(error){
		console.error(error);
		return;
	}
	console.log(results);
	// Glottologist
	glot.t(results[0].label, "jp").then((result)=>{
		// TextSpeech
		startSpeech("これは多分、" + result + "だと、思います!!");
		// Fill, Stroke
		fill(255);
		noStroke();
		// Text
		textSize(32);
		textAlign(CENTER);
		text(result, 240, 160);
	});
}