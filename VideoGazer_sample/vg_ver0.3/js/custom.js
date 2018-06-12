console.log("custom.js");

//==========
// WebGazer

let player;
let context;
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
		startLogger();
	});

	player.on("ended", ()=>{
		console.log("ended");
		stopLogger();
	});

	// Canvas
	let canvas = document.getElementById("my_canvas");
	context = canvas.getContext("2d");
});

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
		jsonObj.data.push(obj);
		// Draw
		let size = player.width_ / 100.0;
		context.fillRect(e.clientX-size*0.5, e.clientY-size*0.5, size, size);
	});
}

function stopLogger(){
	console.log("stopLogger");

	// Click(Disable)
	$("video").off("click");

	let jsonStr = JSON.stringify(jsonObj);
	console.log(jsonStr);

	// TODO: LogはSharedPreferencesに保存する
}