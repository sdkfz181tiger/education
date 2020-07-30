"use strict";
//==========
// p5.js

function setup(){
	// Canvas
	let canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style("z-index", "-1");

	noLoop();
	background(33);
	colorMode(HSB);
	rectMode(CENTER);
	angleMode(DEGREES);
	noStroke();

	// Using jQuery
	$("ul").append("<li>Cupcake</li>");
	$("ul").append("<li>Donut</li>");
	$("ul").append("<li>Eclair</li>");
	$("ul").append("<li>Froyo</li>");
	$("ul").append("<li>Gingerbread</li>");
	$("ul").append("<li>Honeycomb</li>");
	$("ul").append("<li>Ice Cream Sandwich</li>");
	$("ul").append("<li>Jelly Bean</li>");
	$("ul").append("<li>KitKat</li>");
	$("ul").append("<li>Lollipop</li>");
	$("ul").append("<li>Marshmallow</li>");
	$("ul").append("<li>Nougat</li>");
}

function draw(){

	for(let i=0; i<100; i++){
		let x = random(width);
		let y = random(height);
		let s = random(40, 80);
		let h = 180 + random(120);
		fill(h, 90, 90);
		circle(x, y, s);
	}
}
