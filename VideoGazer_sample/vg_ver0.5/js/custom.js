console.log("custom.js");

const DATA_KEY = "my_data";

let player;
let canvas;
let jsonObj;

const width  = 160;
const height = 120;
const margin = "0px";
const posX   = "0px";
const posY   = "0px";

// Onload
$(document).ready(function(){
	console.log("ready");

	// Video.js
	player = videojs("my_video");

	player.on("ready", ()=>{
		console.log("player:ready[]");
		startWebGazer();
	});

	player.on("play", ()=>{
		console.log("player:play[" + checkLoaderMode() + "]");
		if(checkLoaderMode() == false){
			startLogger();
		}else{
			startLoader();
		}
	});

	player.on("ended", ()=>{
		console.log("player:ended[" + checkLoaderMode() + "]");
		if(checkLoaderMode() == false){
			stopLogger();
		}else{
			stopLoader();
		}
	});

	// Canvas
	canvas = document.getElementById("my_canvas");

	// SelectBox
	prepareSelectBox();
});

//==========
// WebGazer
function startWebGazer(){
	console.log("startWebGazer");

	// WebGazer
	webgazer.setRegression("ridge").setTracker("clmtrackr")
			.setGazeListener(function(data, elapsedTime){
				if(data == null) return;
				console.log("x, y:" + data.x + ", " + data.y + "[" + elapsedTime + "]");
			}).showPredictionPoints(true).begin();

	prepareWebGazer();
}

// Prepare
function prepareWebGazer(){
	if(webgazer.isReady()){
		resumeWebGazer();
	}else{
		setTimeout(prepareWebGazer, 100);
	}
}

// Resume
function resumeWebGazer(){
	console.log("resumeWebGazer");

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

//==========
// Logger
function startLogger(){
	console.log("startLogger");

	// JsonObject
	jsonObj = {};
	jsonObj.data = [];

	// Click(Enable)
	$("video").on("click", (e)=>{
		console.log("click");
		// Data
		let obj = {};
		obj.pX = Math.floor(e.clientX / player.width() * 100.0);
		obj.pY = Math.floor(e.clientY / player.height() * 100.0);
		obj.cT = player.currentTime();
		obj.pW = player.width() / 100.0;
		obj.pH = obj.pW;
		jsonObj.data.push(obj);
	});

	// Update
	startUpdate();
}

function stopLogger(){
	console.log("stopLogger");

	// Click(Disable)
	$("video").off("click");

	// Save
	saveLocalStorage(jsonObj);

	// SelectBox
	prepareSelectBox();
}

//==========
// Loader
function startLoader(){
	console.log("startLoader");

	// SelectBox
	let val = $("#my_select").val();

	// Load
	jsonObj = loadLocalStorage(val);
	console.log("date:" + jsonObj.date);
	console.log("src:" + jsonObj.src);

	// Update
	startUpdate();
}

function stopLoader(){
	console.log("stopLoader");
}

//==========
// Canvas and Draw
function startUpdate(){
	setTimeout(()=>{
		drawSprites();
		if(player.ended() == false) startUpdate();
	}, 200);
}

function drawSprites(){
	//console.log("drawSprites");
	let context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);

	for(let i=jsonObj.data.length-1; 0<=i; i--){
		let obj   = jsonObj.data[i];
		let objX  = canvas.width  * obj.pX / 100.0 - obj.pW * 0.5;
		let objY  = canvas.height * obj.pY / 100.0 - obj.pH * 0.5;
		let delay = player.currentTime() - obj.cT;
		if(3.0 < delay) break;
		if(delay < 0) continue;
		context.fillRect(objX, objY, obj.pW, obj.pH);
		if(0 < i){
			let prev  = jsonObj.data[i-1];
			let prevX = canvas.width * prev.pX / 100.0;
			let prevY = canvas.height * prev.pY / 100.0;
			context.beginPath();
			context.moveTo(prevX, prevY);
			context.lineTo(objX+obj.pW*0.5, objY+obj.pH*0.5);
			context.stroke();
		}
	}
}

//==========
// Utility
function saveLocalStorage(obj){
	// Time
	let date = new Date();
	let dFormat = new DateFormat("yyyy_MM_dd HH:mm:ss");
	obj.date = dFormat.format(date);
	// Src
	obj.src = player.src();
	// LocalStorage
	let item = localStorage.getItem(DATA_KEY);
	let storage = {};
	storage.all = [];
	if(item != null){
		storage = JSON.parse(item);
	}
	storage.all.push(obj);
	let str = JSON.stringify(storage);
	localStorage.setItem(DATA_KEY, str);
}

function loadLocalStorage(index){
	// LocalStorage
	let item = localStorage.getItem(DATA_KEY);
	let storage = {};
	storage.all = [];
	if(item != null){
		storage = JSON.parse(item);
	}
	if(index == null || index < 0 || storage.all.length <= index){
		return storage.all[storage.all.length - 1];
	}
	return storage.all[index];
}

function prepareSelectBox(){
	console.log("prepareSelectBox");

	// LocalStorage
	let item = localStorage.getItem(DATA_KEY);
	let storage = {};
	storage.all = [];
	if(item != null){
		storage = JSON.parse(item);
	}
	// jQuery UI(SelectBox)
	$("#my_select").selectmenu({
		change: function(event, data){
			// TODO:
			console.log("change!!");
		}
	});
	$("#my_select").empty();
	for(let i=storage.all.length-1; 0<=i; i--){
		let option = $("<option>").val(i).text(storage.all[i].date);
		if(i == storage.all.length-1) option.prop("selected", true);
		$("#my_select").append(option);
	}
	$("#my_select").selectmenu("refresh");
	// jQuery UI(Checkbox)
	$("#my_checkbox").checkboxradio();
}

function checkLoaderMode(){
	return $("#my_checkbox").prop("checked");
}