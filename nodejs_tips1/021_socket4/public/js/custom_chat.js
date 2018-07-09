console.log("Hello Node JS!!");

const SERVER_SOCKET = "ws://localhost:4040";
const SERVER_JSON   = "http://localhost:3030/json";

const TBL_INSERT = "insert";
const TBL_UPDATE = "update";
const TBL_DELETE = "delete";

//==========
// WebSocket
let ws;

// Load
$(window).on("load", ()=>{
	console.log("Load!!");

	// Initialize
	ws = new WebSocket(SERVER_SOCKET);
	ws.onopen = (e)=>{
		console.log("onOpen");
	}
	ws.onmessage = (e)=>{
		console.log("onMessage:" + e.data);
		let jsonObj = JSON.parse(e.data);
		if(jsonObj.tbl === TBL_INSERT || jsonObj.tbl === TBL_UPDATE){
			addPlayer(jsonObj);
		}else if(jsonObj.tbl === TBL_DELETE){
			removePlayer(jsonObj);
		}
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
let players = [];

function addPlayer(jsonObj){
	console.log("addPlayer");

	// Append
	let id = jsonObj.id;
	let x = parseInt(jsonObj.x);
	let y = parseInt(jsonObj.y);

	let index = isExists(id);
	if(index != -1){
		// Other player already exists
		players[index].x = x;
		players[index].y = y;
		players[index].sprite.position.x = x;
		players[index].sprite.position.y = y;
	}else{
		// New commer
		jsonObj.sprite = createSprite(x, y, 32, 32);
		jsonObj.sprite.addImage(loadImage("./assets/client_0.png"));
		players.push(jsonObj);
	}
}

function removePlayer(jsonObj){
	console.log("removePlayer");

	// Append
	let id = jsonObj.id;
	let x = parseInt(jsonObj.x);
	let y = parseInt(jsonObj.y);

	let index = isExists(id);
	if(index != -1){
		// Remove
		players[index].sprite.remove();
		players.splice(index, 1);
	}
}

function loadPlayers(){
	console.log("loadPlayers");

	// Clean
	for(let i=players.length-1; 0<=i; i--){
		players[i].sprite.remove();
		players.splice(i, 1);
	}

	// Load JSON file
	loadJSON(SERVER_JSON, (data)=>{
		for(let i=0; i<data.rows.length; i++){
			addPlayer(data.rows[i]);
		}
	});
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

	// Load
	loadPlayers();
}

function draw(){
	console.log("draw");
	background(33, 33, 33);
	fill(255, 255, 255);

	// Total
	let total = players.length;
	textSize(32);
	textAlign(CENTER);
	text(total, 240, 40);

	// ID
	for(let i=0; i<players.length; i++){
		let player = players[i];
		textSize(10);
		text(player.id, parseInt(player.x), 
			parseInt(player.y) - player.sprite.originalHeight*0.5);
	}

	drawSprites();
}

function mousePressed(){
	console.log("mousePressed");
	let message = {"x": mouseX, "y": mouseY};
	if(ws !== null) ws.send(JSON.stringify(message));
}