console.log("custom.js");

//==========
// WebGazer

const GRID_SIZE    = 50;
const HEAT_MIN     = 0;
const HEAT_MAX     = 255;
let rows, cols, grids;

const VIDEO_WIDTH  = 320;
const VIDEO_HEIGHT = 240;
const VIDEO_MARGIN = "0px";
const VIDEO_POSX   = "0px";
const VIDEO_POSY   = "0px";

// Ready
$(document).ready(function(){
	console.log("ready");

	// Fullsize
	$("#example_video_1").css({"width": "100%", "height": "100%"});
});

window.onload = function(){

	// Rows, Cols
	rows = window.innerWidth / GRID_SIZE;
	cols = window.innerHeight / GRID_SIZE;

	// Grids
	grids = [];
	for(let r=0; r<rows; r++){
		grids.push([]);
		for(let c=0; c<cols; c++){
			grids[r].push(HEAT_MIN);
		}
	}

	// WebGazer
	webgazer.setRegression("ridge").setTracker("clmtrackr")
			.setGazeListener(function(data, elapsedTime){
		if(data == null) return;
		// Grids
		let r = Math.floor(data.y / GRID_SIZE);
		let c = Math.floor(data.x / GRID_SIZE);
		if(r < 0 || grids.length <= r) return;
		if(c < 0 || grids[0].length <= c) return;
		grids[r][c]++;
	}).showPredictionPoints(true).begin();

	// Ready
	setTimeout(readyWebGazer, 500);
}

window.onbeforeunload = function(){
	
	console.log("onbeforeunload");
	// Uncomment if you want to save the data even if you reload the page.
	webgazer.end();
	// Comment out if you want to save data across different sessions
	window.localStorage.clear();
}

// Setup
function startWebGazer(){
	console.log("startWebGazer");

	// Set up video variable to store the camera feedback
	let video = document.getElementById("webgazerVideoFeed");

	// Position the camera feedback to the top left corner.
	video.style.display  = "block";
	video.style.position = "fixed";

	// Set up the video feedback box size
	video.width        = VIDEO_WIDTH;
	video.height       = VIDEO_HEIGHT;
	video.style.margin = VIDEO_MARGIN;
	video.style.top    = VIDEO_POSX;
	video.style.left   = VIDEO_POSY;

	webgazer.params.imgWidth  = VIDEO_WIDTH;
	webgazer.params.imgHeight = VIDEO_HEIGHT;

	// Set up the main canvas.
	// The main canvas is used to calibrate the webgazer.
	let overlay = document.createElement("canvas");
	overlay.id  = "overlay";

	overlay.style.position = "absolute";
	overlay.width          = VIDEO_WIDTH;
	overlay.height         = VIDEO_HEIGHT;
	overlay.style.margin   = VIDEO_MARGIN;
	overlay.style.top      = VIDEO_POSX;
	overlay.style.left     = VIDEO_POSY;
	document.body.appendChild(overlay);

	// CLM
	let clm = webgazer.getTracker().clm;

	// This function draw the face of the user frame.
	function drawLoop(){
		requestAnimFrame(drawLoop);
		overlay.getContext("2d").clearRect(0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
		if(clm.getCurrentPosition()) clm.draw(overlay);
	}
	drawLoop();
}

// Ready
function readyWebGazer(){
	console.log("readyWebGazer");
	if(webgazer.isReady()){
		startWebGazer();
	}else{
		setTimeout(readyWebGazer, 1000);
	}
}