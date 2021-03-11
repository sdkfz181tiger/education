
const URL = "https://trends.google.co.jp/trends/trendingsearches/daily/rss?geo=US";

let rss;

function preload(){
	console.log("preload");

	rss = loadXML(URL);
}

function setup(){
	createCanvas(320, 320);
	angleMode(DEGREES);
	noLoop();
	background(100);
}

function draw(){
	background(33);
}