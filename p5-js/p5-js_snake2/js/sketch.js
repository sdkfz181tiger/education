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
	stage.setSnakes(snake.getPoints());
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
		this._pSnakes = new Array();
		for(let r=0; r<this._rows; r++){
			this._pSnakes.push(new Array());
			for(let c=0; c<this._cols; c++){
				this._pSnakes[r][c] = null;
			}
		}
		this._pFoods = new Array();
		for(let r=0; r<this._rows; r++){
			this._pFoods.push(new Array());
			for(let c=0; c<this._cols; c++){
				this._pFoods[r][c] = null;
			}
		}
	}

	setSnakes(points){
		for(let i=0; i<points.length; i++){
			let gX = points[i].x;
			let gY = points[i].y;
			if(gX < 0) continue;
			if(gY < 0) continue;
			if(this._cols <= gX) continue;
			if(this._rows <= gY) continue;
			this._pSnakes[gY][gX] = points[i];
		}
	}

	setFoods(points){
		for(let i=0; i<points.length; i++){
			let gX = points[i].x;
			let gY = points[i].y;
			if(gX < 0) continue;
			if(gY < 0) continue;
			if(this._cols <= gX) continue;
			if(this._rows <= gY) continue;
			this._pFoods[gY][gX] = points[i];
		}
	}

	reset(){
		for(let r=0; r<this._rows; r++){
			for(let c=0; c<this._cols; c++){
				this._pSnakes[r][c] = null;
				this._pFoods[r][c] = null;
			}
		}
	}

	draw(){
		for(let r=0; r<this._rows; r++){
			for(let c=0; c<this._cols; c++){
				let x = c * this._size;
				let y = r * this._size;
				line(x, y, x+this._size, y);
				line(x, y, x, y+this._size);
				if(this._pSnakes[r][c] != null){
					let point = this._pSnakes[r][c];
					fill(point.r, point.g, point.b);
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
			this._points.push(new Point(x, y, 200, 150, 150));
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

class Food{

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

	put(x, y){
		this._points.push(new Point(x, y, 33, 200, 255));
	}
}

class Point{

	constructor(x, y, r=200, g=200, b=200){
		this.x = x;
		this.y = y;
		this.r = r;
		this.g = g;
		this.b = b;
	}
}