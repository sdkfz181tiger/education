
const TYPE = {
	FLOOR: 0,
	PLAYER: 1,
	WALL: 2,
	BLOCK: 3
}

const MAP = [
	[0, 0, 0, 0, 0],
	[0, 2, 0, 3, 0],
	[3, 3, 1, 3, 0],
	[0, 0, 0, 2, 0],
	[0, 0, 0, 0, 0]
];

const G_SIZE = 50;
const ROWS = MAP.length;
const COLS = MAP[0].length;
const W_BOARD = COLS * G_SIZE;
const H_BOARD = ROWS * G_SIZE;

let tiles = Array.from(new Array(ROWS), ()=>new Array(COLS).fill(null));
let objs = new Array();
let player = null;

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(32);
	noSmooth();
	angleMode(DEGREES);
	rectMode(CENTER);
	textAlign(CENTER, CENTER);
	textSize(16);
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
}

function keyPressed(){

	if(keyCode == LEFT_ARROW){
		player.go(0, -1);
	}
	if(keyCode == RIGHT_ARROW){
		player.go(0, 1);
	}
	if(keyCode == UP_ARROW){
		player.go(-1, 0);
	}
	if(keyCode == DOWN_ARROW){
		player.go(1, 0);
	}
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

class Tile{

	constructor(r, c){
		this._r = r;
		this._c = c;
		this._x = width/2 - W_BOARD/2 + c*G_SIZE + G_SIZE/2;
		this._y = height/2 - H_BOARD/2 + r*G_SIZE + G_SIZE/2;
	}

	get x(){return this._x;}
	get y(){return this._y;}

	draw(){
		stroke(33);
		strokeWeight(1);
		fill(230);
		square(this._x, this._y, G_SIZE);
	}
}

class Obj{

	constructor(type, r, c){
		this._type = type;
		this._r = r;
		this._c = c;
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

	draw(){

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

	go(oR, oC){
		let r = this._r + oR;
		let c = this._c + oC;
		let tgt = searchObjs(r, c);
		if(tgt == null){
			this.moveTo(r, c);
			return;
		}
		if(tgt.type != TYPE.BLOCK) return;
		if(!isInside(tgt.r+oR, tgt.c+oC)) return;
		if(searchObjs(tgt.r+oR, tgt.c+oC) != null) return;
		tgt.moveTo(tgt.r+oR, tgt.c+oC);
		this.moveTo(r, c);
	}

	moveTo(r, c){
		if(this._toX != this._x) return false;
		if(this._toY != this._y) return false;
		if(r < 0 || ROWS-1 < r) return false;
		if(c < 0 || COLS-1 < c) return false;
		this._r = r;
		this._c = c;
		this._toX = tiles[r][c].x;
		this._toY = tiles[r][c].y;
		return true;
	}
}