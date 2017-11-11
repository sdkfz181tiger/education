console.log("Hello p5.js!!");

const NUM_ROWS = 16;
const NUM_COLS = 24;

let snake;
let stage;

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(16);
	background(0);

	stroke(100, 100, 100);
	strokeWeight(1);
	fill(255, 255, 255);

	// Snake
	snake = new Snake(3, 3, 15);

	// Stage
	stage = new Stage(NUM_ROWS, NUM_COLS, 20);
}

function draw(){
	console.log("draw");
	background(0, 0, 0);

	stage.reset();
	stage.setPoints(snake.getPoints());
	stage.draw();
}

function keyPressed(e){
	//console.log(e.key);
	if(keyCode == UP_ARROW)    snake.step(0, -1);
	if(keyCode == LEFT_ARROW)  snake.step(-1, 0);
	if(keyCode == RIGHT_ARROW) snake.step(+1, 0);
	if(keyCode == DOWN_ARROW)  snake.step(0, +1);
}

class Stage{

	constructor(rows, cols, size){
		this._rows = rows;
		this._cols = cols;
		this._size = size;
		this._grids = new Array();
		for(let r=0; r<this._rows; r++){
			this._grids.push(new Array());
			for(let c=0; c<this._cols; c++){
				this._grids[r][c] = 0;
			}
		}
	}

	setPoints(points){
		for(let i=0; i<points.length; i++){
			let gX = points[i].x;
			let gY = points[i].y;
			this.setFlg(gX, gY, true);
		}
	}

	reset(){
		for(let r=0; r<this._rows; r++){
			for(let c=0; c<this._cols; c++){
				this.setFlg(c, r, false);
			}
		}
	}

	setFlg(x, y, flg){
		if(x < 0) return;
		if(y < 0) return;
		if(this._cols <= x) return;
		if(this._rows <= y) return;
		this._grids[y][x] = flg;
	}

	getFlg(x, y){
		return this._grids[y][x];
	}

	draw(){
		for(let r=0; r<this._rows; r++){
			for(let c=0; c<this._cols; c++){
				let x = c * this._size;
				let y = r * this._size;
				line(x, y, x+this._size, y);
				line(x, y, x, y+this._size);
				if(this._grids[r][c] == true){
					rect(x, y, this._size, this._size);
				}
			}
		}
		line(this._cols*this._size, 0, this._cols*this._size, this._rows*this._size);
		line(0, this._rows*this._size, this._cols*this._size, this._rows*this._size);
	}
}

class Snake{

	constructor(x, y, length){
		this._x = x;
		this._y = y;
		this._length = length;
		this._points = new Array();
		for(var i=0; i<length; i++){
			this._points.push(new Point(x, y));
		}
	}

	getPoints(){
		return this._points;
	}

	step(dX, dY){
		// Shift
		for(let i=this._points.length-1; 0<i; i--){
			this._points[i].x = this._points[i-1].x;
			this._points[i].y = this._points[i-1].y;
		}
		// Top
		if(dX < 0) this._x -= 1;
		if(0 < dX) this._x += 1;
		if(dY < 0) this._y -= 1;
		if(0 < dY) this._y += 1;
		this._points[0].x = this._x;
		this._points[0].y = this._y;
	}
}

class Point{

	constructor(x, y){
		this.x = x;
		this.y = y;
	}
}