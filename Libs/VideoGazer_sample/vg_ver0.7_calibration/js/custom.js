console.log("custom.js");

const width  = 320;
const height = 240;
const margin = "0px";
const posX   = "0px";
const posY   = "0px";

let protsMax = 30;
let prots = [];

window.onload = function(){
	console.log("onload");

	// Prots
	prots = [];

	// WebGazer
	webgazer.setRegression("ridge").setTracker("clmtrackr")
			.setGazeListener(function(data, elapsedTime){
		if(data == null) return;
		console.log("x, y:" + data.x + ", " + data.y + "[" + elapsedTime + "]");
		if(protsMax < prots.length) prots.shift();
		prots.push(data);
	}).showPredictionPoints(true).begin();

	// Ready
	setTimeout(isReady, 100);
}

window.onbeforeunload = function(){
	console.log("onbeforeunload");
	// Uncomment if you want to save the data even if you reload the page.
	webgazer.end();
	// Comment out if you want to save data across different sessions
	window.localStorage.clear(); 
}

// Setup
function setup(){
	console.log("setup");

	// Set up video variable to store the camera feedback
	let video = document.getElementById("webgazerVideoFeed");

	// Position the camera feedback to the top left corner.
	video.style.display  = "block";
	video.style.position = "fixed";

	// Set up the video feedback box size
	video.width        = width;
	video.height       = height;
	video.style.margin = margin;
	video.style.top    = posX;
	video.style.left   = posY;

	webgazer.params.imgWidth  = width;
	webgazer.params.imgHeight = height;

	// Set up the main canvas. 
	// The main canvas is used to calibrate the webgazer.
	let overlay = document.createElement("canvas");
	overlay.id  = "overlay";

	overlay.style.position = "absolute";
	overlay.width          = width;
	overlay.height         = height;
	overlay.style.margin   = margin;
	overlay.style.top      = posX;
	overlay.style.left     = posY;
	document.body.appendChild(overlay);

	// CLM
	let clm = webgazer.getTracker().clm;

	let protLayer = document.createElement("canvas");
	protLayer.id  = "overlay";

	protLayer.style.position = "absolute";
	protLayer.width          = window.innerWidth;
	protLayer.height         = window.innerHeight;
	protLayer.style.margin   = margin;
	protLayer.style.top      = posX;
	protLayer.style.left     = posY;
	document.body.appendChild(protLayer);

	// This function draw the face of the user frame.
	function drawLoop(){
		overlay.getContext("2d").clearRect(0, 0, width, height);
		if(clm.getCurrentPosition()) clm.draw(overlay);

		let x = 0;
		let y = 0;
		for(let i=0; i<prots.length; i++){
			x += prots[i].x; y += prots[i].y;
		}
		x /= prots.length;
		y /= prots.length;
		protLayer.getContext("2d").fillRect(x, y, 5, 5);

		//requestAnimFrame(drawLoop);
		setTimeout(drawLoop, 200);
	}
	drawLoop();
}

// Ready
function isReady(){
	if(webgazer.isReady()){
		setup();
	}else{
		setTimeout(isReady, 100);
	}
}