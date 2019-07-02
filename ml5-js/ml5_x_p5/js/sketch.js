console.log("Hello p5.js!!");

const DEG_TO_RAD = Math.PI / 180;

let img;
let classifier;

function preload(){
	console.log("preload!!");
	// Image
	img = loadImage("./assets/sample7.jpg");
	// ml5
	classifier = ml5.imageClassifier("MobileNet");
}

function setup(){
	console.log("setup!!");
	createCanvas(img.width, img.height);
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
	startGlot(results[0].label, "jp", (result)=>{
		let msg = "これはひょっとすると、" + createMsg(result) + "ですかね?";
		// TextSpeech
		startSpeech(msg);
		// Fill, Stroke
		fill(255, 100, 100);
		noStroke();
		// Text
		textSize(32);
		textAlign(CENTER);
		text(msg, width*0.5, 30);
	});
}

function createMsg(str){
	let arr = str.split("、");
	let msg = "";
	for(let i=0; i<arr.length; i++){
		msg += arr[i];
		if(i<arr.length-2) msg += "か、もしくは";
	}
	return msg;
}