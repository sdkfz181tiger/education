"use strict";
//==========
// p5.js

const DEG_TO_RAD = Math.PI / 180;

const DISP_W = 480;
const DISP_H = 320;
const CARD_S = 48;

const SUIT = "ABDC";
const NUMS = "123456789ABDE";
const BACK = String.fromCodePoint(`0x1F0A0`);

let cards = [];

function setup(){
	createCanvas(DISP_W, DISP_H);
	frameRate(16);
	colorMode(HSB); textSize(CARD_S);
	background(0, 11, 11);

	SUIT.split("").forEach(s=>{
		NUMS.split("").map(n=>{
			let c = String.fromCodePoint(`0x1F0${s}${n}`);
			cards.push(new Card(c));
		});
	});

	let pX = 36;
	let pY = 48;
	let sX = width / 2 - (pX * 13) / 2;
	let sY = height / 2 - (pY * 3) / 2;
	for(let i=0; i<cards.length; i++){
		cards[i].x = sX + i % 13 * pX;
		cards[i].y = sY + floor(i / 13) * pY;
		cards[i].h = (floor(i / 13) % 2 == 0)? 200:0;
	}
}

function mousePressed(){
	for(let card of cards) card.mousePressed();
}

function draw(){
	colorMode(HSB); textSize(CARD_S);
	background(0, 11, 11);
	for(let card of cards) card.draw();
}

class Card{
	constructor(c){
		this._c = c;
		this._f = false;
	}
	set x(n){this._x = n;}
	set y(n){this._y = n;}
	set h(n){this._h = n;}
	mousePressed(){
		if(mouseX < this._x) return;
		if(mouseY < this._y - CARD_S * 0.7) return;
		if(this._x + CARD_S * 0.7 < mouseX) return;
		if(this._y + CARD_S * 0.3 < mouseY) return;
		this._f = true;
	}
	draw(){
		if(!this._f){
			fill(120, 66, 66);
			text(BACK, this._x, this._y);
		}else{
			fill(this._h, 66, 100);
			text(this._c, this._x, this._y);
		}
	}
}