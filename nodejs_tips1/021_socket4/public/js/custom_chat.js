console.log("Hello Node JS!!");

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
		addPlayers(jsonObj);
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

//==========
// Sprites
let players;

function addPlayers(jsonObj){
	// Append
	let id = jsonObj.id;
	let x = parseInt(jsonObj.msg.x);
	let y = parseInt(jsonObj.msg.y);

	let index = isExists(id);
	if(index != -1){
		// Use existing data
		let jsonObj = players[index];
		jsonObj.sprite.position.x = x;
		jsonObj.sprite.position.y = y;
	}else{
		// Create new object
		jsonObj.sprite = createSprite(x, y, 32, 32);
		let image = loadImage("./assets/client_0.png");
		jsonObj.sprite.addImage(image);
		players.push(jsonObj);
	}
}

function isExists(id){
	for(let i=0; i<players.length; i++){
		if(players[i].id === id) return i;
	}
	return -1;
}

//==========
// p5.js

const DEG_TO_RAD = Math.PI / 180;

function preload(){
	// Font
	var font = loadFont("assets/misaki_gothic.ttf");
	textFont(font);
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(16);
	background(33, 33, 33);

	fill(255, 255, 255);
	noStroke();
	rectMode(CENTER);

	// Players
	players = [];
}

function draw(){
	console.log("draw");
	background(33, 33, 33);
	fill(255, 255, 255);

	let total = players.length;
	textSize(32);
	textAlign(CENTER);
	text(total, 240, 40);

	drawSprites();
}

function mousePressed(){
	console.log("mousePressed");
	let msg  = '{"x": "' + mouseX + '", "y": "' + mouseY + '"}';
	if(ws !== null) ws.send(msg);
}