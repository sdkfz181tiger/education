console.log("Hello p5.js!!");

const DEG_TO_RAD = Math.PI / 180;

let nodes;

function preload(){
	console.log("preload");

	// Font
	let font = loadFont("assets/misaki_gothic.ttf");
	textSize(32);
	textFont(font);
	textAlign(CENTER);
	rectMode(CENTER);
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(16);
	background(0);

	// Nodes
	nodes = new Array();
	for(let i=0; i<50; i++){
		let x     = getRandom(0, width);
		let y     = getRandom(0, height);
		let speed = getRandom(2, 4);
		let deg   = getRandom(0, 360);
		let size  = 5;
		let r     = getRandom(200, 255);
		let g     = getRandom(100, 255);
		let b     = getRandom(100, 255);
		let node  = new Node(x, y, speed, deg, size, r, g, b);
		nodes.push(node);
	}
}

function draw(){
	console.log("draw");
	background(0);

	// Lines
	for(let a=0; a<nodes.length; a++){
		for(let b=a+1; b<nodes.length; b++){
			if(isClose(nodes[a], nodes[b])){
				stroke(100, 100, 100);
				strokeWeight(1);
				line(nodes[a].x, nodes[a].y, nodes[b].x, nodes[b].y);
			}
		}
	}

	// Nodes
	for(node of nodes){
		node.draw();
	}
}

function isClose(nodeA, nodeB){
	let distance = Math.pow(nodeA.x - nodeB.x, 2) + Math.pow(nodeA.y - nodeB.y, 2);
	return(distance < Math.pow(80, 2));
}

function getRandom(min, max){
	let seed = max - min;
	return Math.floor(Math.random() * seed + min);
}

class Node{

	constructor(x, y, speed, deg, size, r, g, b){
		this._x    = x;
		this._y    = y;
		this._dX   = speed * Math.cos(deg * DEG_TO_RAD);
		this._dY   = speed * Math.sin(deg * DEG_TO_RAD);
		this._size = size;
		this._r    = r;
		this._g    = g;
		this._b    = b;
	}

	get x(){
		return this._x;
	}

	get y(){
		return this._y;
	}

	draw(){
		this._x += this._dX;
		this._y += this._dY;
		if(this._x < 0.0) this._x = width;
		if(width < this._x) this._x = 0.0;
		if(this._y < 0.0) this._y = height;
		if(height < this._y) this._y = 0.0;
		noStroke();
		fill(this._r, this._g, this._b);
		rect(this._x, this._y, this._size, this._size);
	}
}