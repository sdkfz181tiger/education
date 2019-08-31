console.log("Hello Node JS!!");

const SERVER_SOCKET = "ws://localhost:4040";
const SERVER_JSON   = "http://localhost:3030/json";

const TBL_INSERT = "insert";
const TBL_UPDATE = "update";
const TBL_DELETE = "delete";

//==========
// WebSocket
let ws;

// Players
const MASTER_ID = "client_0";
let playerID    = "***";
let players = [];
let walls   = [];

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
		if(jsonObj.tbl === TBL_INSERT){
			addPlayer(jsonObj);
		}else if(jsonObj.tbl === TBL_UPDATE){
			addPlayer(jsonObj);
		}else if(jsonObj.tbl === TBL_DELETE){
			removePlayer(jsonObj);
		}else{
			playerID = jsonObj.id;// Your character
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

function addPlayer(jsonObj){
	console.log("addPlayer");

	// Append
	let id = jsonObj.id;
	let x = parseInt(jsonObj.x);
	let y = parseInt(jsonObj.y);
	let speed = parseInt(jsonObj.speed);
	let direction = parseInt(jsonObj.direction);

	let index = getIndex(id);
	if(index != -1){
		// Other player already exists
		players[index].x = x;
		players[index].y = y;
		players[index].sprite.position.x = x;
		players[index].sprite.position.y = y;
		players[index].sprite.setSpeed(speed, direction);
	}else{
		if(playerID === id || playerID === MASTER_ID){
			// New commer
			jsonObj.sprite = createSprite(x, y, 32, 32);
			jsonObj.sprite.setSpeed(speed, direction);
			jsonObj.sprite.addImage(loadImage("./assets/client_0.png"));
			players.push(jsonObj);
		}
	}
}

function removePlayer(jsonObj){
	console.log("removePlayer");

	// Append
	let id = jsonObj.id;
	let x = parseInt(jsonObj.x);
	let y = parseInt(jsonObj.y);

	let index = getIndex(id);
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

function getIndex(id){
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

	// Load players
	loadPlayers();

	// Walls
	let wLeft = createSprite(0,   160, 16, 320);
	wLeft.immovable = true;
	walls.push(wLeft);// Left
	let wRight = createSprite(480, 160, 16, 320);
	wRight.immovable = true;
	walls.push(wRight);// Right
	let wTop = createSprite(240,   0, 480, 16);
	wTop.immovable = true;
	walls.push(wTop);// Top
	let wBottom = createSprite(240, 320, 480, 16);
	wBottom.immovable = true;
	walls.push(wBottom);// Bottom
}

function draw(){
	console.log("draw");
	background(33, 33, 33);
	fill(255, 255, 255);

	// ID
	textSize(32);
	textAlign(LEFT);
	text(playerID, 20, 45);

	// Total
	let total = players.length;
	textSize(32);
	textAlign(RIGHT);
	text(total, 460, 45);

	// Players
	for(let i=0; i<players.length; i++){
		// Player x Wall
		let player = players[i];
		let sprite = player.sprite;
		for(let w=0; w<walls.length; w++){
			sprite.bounce(walls[w]);
		}
		// Text
		textSize(10);
		textAlign(CENTER);
		let x = parseInt(sprite.position.x);
		let y = parseInt(sprite.position.y) - sprite.originalHeight*0.5;
		text(player.id, x, y);
	}

	drawSprites();
}

function mousePressed(){
	console.log("mousePressed");

	let index = getIndex(playerID);
	console.log("playerID:" + playerID + "[" + index + "]");

	if(0 <= index){
		let sprite = players[index].sprite;
		let cX = sprite.position.x;
		let cY = sprite.position.y;
		let dX = mouseX - cX;
		let dY = mouseY - cY;
		let speed = 1;
		let direction = Math.atan2(dY, dX) * 180 / PI;
		let message = {"x": cX, "y": cY, "speed": speed, "direction": direction};
		if(ws !== null) ws.send(JSON.stringify(message));
	}
}