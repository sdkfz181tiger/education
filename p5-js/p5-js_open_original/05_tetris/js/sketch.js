"use strict";
//==========
// p5.js

let colors = ["#386641", "#6A994E", "#A7C957", "#F2E8CF", "#BC4749"];
let cX, cY, tManager;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	rectMode(CENTER);
	frameRate(1);
	fill(255);
	noStroke();

	cX = width / 2;
	cY = height / 2;
	tManager = new TetrisManager();
}

function draw(){
	background(33);

}

class TetrisManager{

	constructor(){
		this._rows = 12;
		this._cols = 10;
		this._data = [];
		this.init();
		this.check();
	}

	init(){
		let total = this._rows * this._cols;
		for(let t=0; t<total; t++){
			this._data.push(0);
		}
		console.log(this._data);
	}

	check(){
		let tetris = "============\n";
		for(let r=0; r<this._rows; r++){
			let line = "|";
			for(let c=0; c<this._cols; c++){
				let i = r*this._cols + c;
				line += this._data[i];
			}
			tetris += line + "|\n";
		}
		tetris += "============\n";
		console.log(tetris);
	}
}