console.log("custom.js");

const DATA_KEY = "my_data";

//==========
// WebGazer

let player;
let canvas;
let jsonObj;

// Ready
$(document).ready(function(){
	console.log("ready");

	//==========
	// Video.js
	player = videojs("my_video");

	player.on("ready", ()=>{
		console.log("ready");
	});

	player.on("play", ()=>{
		console.log("play");
		//startLogger();
		startLoader();
	});

	player.on("ended", ()=>{
		console.log("ended");
		//stopLogger();
		stopLoader();
	});

	// Canvas
	canvas = document.getElementById("my_canvas");
});

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
		obj.pX = Math.floor(e.clientX / player.width_ * 100.0);
		obj.pY = Math.floor(e.clientY / player.height_ * 100.0);
		obj.cT = player.currentTime();
		obj.pW = player.width_ / 100.0;
		obj.pH = player.width_ / 100.0;
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
}

//==========
// Loader

function startLoader(){
	console.log("startLoader");

	// Load
	jsonObj = loadLocalStorage();
	console.log(jsonObj);

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

	let item = localStorage.getItem(DATA_KEY);
	let storage = {};
	storage.all = [];
	if(item != null){
		storage = JSON.parse(item);
	}
	if(index == null) return storage.all[storage.all.length - 1];
	return storage.all[index];
}