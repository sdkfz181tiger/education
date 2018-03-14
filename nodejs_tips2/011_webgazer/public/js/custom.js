console.log("custom.js");

const width  = 320;
const height = 240;
const margin = "0px";
const posX   = "0px";
const posY   = "0px";

window.onload = function(){
	console.log("onload");

	// WebGazer
	webgazer.setRegression("ridge").setTracker("clmtrackr")
			.setGazeListener(function(data, elapsedTime){
		if(data == null) return;
		console.log("x, y:" + data.x + ", " + data.y + "[" + elapsedTime + "]");
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

	// This function draw the face of the user frame.
	function drawLoop(){
		requestAnimFrame(drawLoop);
		overlay.getContext("2d").clearRect(0, 0, width, height);
		if(clm.getCurrentPosition()) clm.draw(overlay);
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