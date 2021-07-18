
const TYPE = {
	FLOOR: 0, PLAYER: 1,
	WALL: 2, BLOCK: 3
}

const MAP = [
	[0, 0, 0, 0, 0, 2, 2],
	[0, 2, 2, 0, 0, 0, 2],
	[0, 0, 2, 3, 0, 0, 0],
	[0, 0, 3, 1, 3, 0, 0],
	[0, 0, 0, 3, 2, 0, 0],
	[2, 0, 0, 0, 2, 2, 0],
	[2, 2, 0, 0, 0, 0, 0]
];

const DIR = [
	[-1, 0], [1, 0], [0, -1], [0, 1]
];

const G_SIZE = 50;
const ROWS = MAP.length;
const COLS = MAP[0].length;
const W_BOARD = COLS * G_SIZE;
const H_BOARD = ROWS * G_SIZE;

let tiles = Array.from(new Array(ROWS), ()=>new Array(COLS).fill(null));
let objs = new Array();
let player = null;
let title = "= Sokoban =";
let msg = "Press arrow key to move!!";

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(32);
	noSmooth();
	angleMode(DEGREES);
	rectMode(CENTER);
	textAlign(CENTER, CENTER);
	textSize(32);
	background(33);

	// Tiles, Player, Objs
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			tiles[r][c] = new Tile(r, c);// Tile
			let type = MAP[r][c];
			if(type == TYPE.FLOOR) continue;
			if(type == TYPE.PLAYER){
				player = new Obj(TYPE.PLAYER, r, c);
				continue;
			}
			if(type == TYPE.WALL || type == TYPE.BLOCK){
				objs.push(new Obj(type, r, c));
				continue;
			}
		}
	}

	// RandomWalk
	for(let i=0; i<1000; i++){
		let rdm = Math.floor(Math.random() * DIR.length);
		player.move(DIR[rdm][0], DIR[rdm][1], true);
	}
	// Reset
	for(let obj of objs){
		if(obj.type != TYPE.BLOCK) continue;
		tiles[obj.r][obj.c].goal = true;
		obj.reset();
	}
	player.reset();
}

function draw(){
	background(33);
	fill(200);

	// Tiles, Player, Objects
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			tiles[r][c].draw();
		}
	}
	player.draw();
	for(let obj of objs) obj.draw();

	// Message
	fill(255);
	text(title, width/2, height/2-(ROWS+1)*G_SIZE/2);
	text(msg, width/2, height/2+(ROWS+1)*G_SIZE/2);
}

function keyPressed(){
	if(isCleared()) return;
	if(keyCode == LEFT_ARROW) player.move(0, -1);
	if(keyCode == RIGHT_ARROW) player.move(0, 1);
	if(keyCode == UP_ARROW) player.move(-1, 0);
	if(keyCode == DOWN_ARROW) player.move(1, 0);
	if(!isCleared()) return;
	setTimeout(()=>{
		msg = "Game Clear!!"
		noLoop();
	}, 400);
}

function isInside(r, c){
	if(r < 0 || ROWS-1 < r) return false;
	if(c < 0 || COLS-1 < c) return false;
	return true;
}

function searchObjs(r, c){
	for(let obj of objs){
		if(obj.r != r) continue;
		if(obj.c != c) continue;
		return obj;
	}
	return null;
}

function isCleared(){
	for(let obj of objs){
		if(obj.type != TYPE.BLOCK) continue;
		if(!tiles[obj.r][obj.c].goal) return false;
	}
	return true;
}

class Tile{

	constructor(r, c){
		this._r = r;
		this._c = c;
		this._x = width/2 - W_BOARD/2 + c*G_SIZE + G_SIZE/2;
		this._y = height/2 - H_BOARD/2 + r*G_SIZE + G_SIZE/2;
		this._goal = false;
	}

	get x(){return this._x;}
	get y(){return this._y;}
	get goal(){return this._goal;}
	set goal(g){this._goal = g;}

	draw(){
		stroke(33);
		strokeWeight(1);
		fill(200);
		square(this._x, this._y, G_SIZE);
		noStroke();
		fill(33, 99, 33);
		if(this._goal) square(this._x, this._y, G_SIZE*0.2);
	}
}

class Obj{

	constructor(type, r, c){
		this._type = type;
		this._r = r;
		this._c = c;
		this._defR = r;
		this._defC = c;
		this._x = tiles[r][c].x;
		this._y = tiles[r][c].y;
		this._toX = this._x;
		this._toY = this._y;
	}

	get type(){return this._type;}
	get r(){return this._r;}
	get c(){return this._c;}
	get x(){return this._x;}
	get y(){return this._y;}

	reset(){
		this._r = this._defR;
		this._c = this._defC;
		this._x = tiles[this._r][this._c].x;
		this._y = tiles[this._r][this._c].y;
		this._toX = this._x;
		this._toY = this._y;
	}

	draw(){
		// Move
		let dX = this._toX - this._x;
		if(2 < abs(dX)){
			this._x += dX / 2;
		}else{
			this._x = this._toX;
		}
		let dY = this._toY - this._y;
		if(2 < abs(dY)){
			this._y += dY / 2;
		}else{
			this._y = this._toY;
		}
		// Draw
		noStroke();
		if(this._type == TYPE.WALL)   fill(11, 11, 99);
		if(this._type == TYPE.BLOCK)  fill(11, 99, 11);
		if(this._type == TYPE.PLAYER) fill(99, 11, 11);
		square(this._x, this._y, G_SIZE*0.8);
	}

	move(oR, oC, skip=false){
		let r = this._r + oR;
		let c = this._c + oC;
		let tgt = searchObjs(r, c);
		if(tgt == null){
			this.moveTo(r, c, skip);
			return;
		}
		if(tgt.type != TYPE.BLOCK) return;
		if(!isInside(tgt.r+oR, tgt.c+oC)) return;
		if(searchObjs(tgt.r+oR, tgt.c+oC) != null) return;
		tgt.moveTo(tgt.r+oR, tgt.c+oC, skip);
		this.moveTo(r, c, skip);
	}

	moveTo(r, c, skip=false){
		if(this._toX != this._x) return false;
		if(this._toY != this._y) return false;
		if(!isInside(r, c)) return false;
		this._r = r;
		this._c = c;
		this._toX = tiles[r][c].x;
		this._toY = tiles[r][c].y;
		if(skip){
			this._x = this._toX;
			this._y = this._toY;
		}
		return true;
	}
}