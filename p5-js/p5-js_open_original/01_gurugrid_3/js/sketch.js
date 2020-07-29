"use strict";
//==========
// p5.js

const size = 8;

let x, y = 0;
let a, o, i, j = 0;

function setup(){
	createCanvas(windowWidth, windowHeight);
	rectMode(CENTER);
	angleMode(DEGREES);
	colorMode(HSB);
	background(33);
	noStroke();
}

function draw(){

	fill(100, 100, 100);

	if(o < 100){
		if(i < 2){
			if(j < o){
				x += size * cos(a);
				y += size * sin(a);
				square(x, y, size*0.8);
				j++;
				return;
			}
			a += 90;
			j=0;
			i++;
			return;
		}
		i=0;
		o++;
		return;
	}
	background(33);
	x = width / 2;
	y = height / 2;
	a = 0;
	o = 0;
	i = 0;
	j = 0;
}
