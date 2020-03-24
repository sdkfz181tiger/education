console.log("Hello Node JS!!");

// Characters
let jsonObjs = [];

//==========
// WebSocket
let ws;

// Load
$(window).on("load", ()=>{
	console.log("Load!!");

	// Initialize
	ws = new WebSocket("ws://localhost:4040");
	ws.onopen = (e)=>{
		console.log("onOpen");
	}
	ws.onmessage = (e)=>{
		console.log("onMessage:" + e.data);
		let jsonObj = JSON.parse(e.data);
		addCharacter(jsonObj);
	}
	ws.onclose = (e)=>{
		console.log("onClose");
	}
	ws.onerror = (e)=>{
		console.log("onError");
	}
});

// Unload
$(window).on("unload", ()=>{
	console.log("Unload!!");
	ws.close();
});

// Ready
$(document).ready(()=>{
	console.log("Ready!!");
});

function escapeStr(str){
	return str.replace(/\&/g, '&amp;').
	replace(/</g, '&lt;').replace(/>/g, '&gt;').
	replace(/"/g, '').replace(/'/g, '');
}

function addCharacter(jsonObj){
	// Append
	let id = jsonObj.id;
	console.log("addCharacter:" + id);
	jsonObjs.push(jsonObj);
}

//==========
// p5.js

const DEG_TO_RAD  = Math.PI / 180;

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(16);
	background(33, 33, 33);

	fill(255, 255, 255);
	noStroke();

	rectMode(CENTER);
}

function draw(){
	console.log("draw");
	background(33, 33, 33);

	fill(255, 255, 255);
	for(let jsonObj of jsonObjs){
		let id     = jsonObj.id;
		let msgObj = jsonObj.msg;
		let text   = msgObj.text;
		let posX   = msgObj.posX;
		let posY   = msgObj.posY;
		rect(posX, posY, 10, 10);
	}
}

function mousePressed(){
	console.log("mousePressed");
	let text = "This is p5!!";
	let msg  = '{"text": "' + text + '", "posX": "' + mouseX + '", "posY": "' + mouseY + '"}';
	if(ws !== null) ws.send(msg);
}