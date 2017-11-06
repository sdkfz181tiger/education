console.log("Hello p5.js!!");

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

// Words
var words = new Array();

var canvasW = 480;
var canvasH = 320;
var centerX = canvasW * 0.0;
var centerY = canvasH * 0.5;

// Font
var font;

// 読み込み
function preload(){
	console.log("preload");
	font = loadFont("assets/misaki_gothic.ttf");
}

// 初期化
function setup(){
	console.log("setup");
	createCanvas(canvasW, canvasH);
	background(0);
	fill(0, 0, 0);
	
	noLoop();
	noStroke();// No stroke

	// JSONファイルの読み込み
	loadJSON("./json/data.json", function(data){
		//console.log("data:" + data);

		// データの格納
		var jsonData = data.root;

		// データの確認
		loop:
		for(var j=0; j<jsonData.length; j++){

			// Radius and Color
			var size  = jsonData[j].size;
			var str   = jsonData[j].str;
			var color = jsonData[j].color;
			var result = addWordCloud(size, str, color, j);
		}
	});
}

// 連続処理
function draw(){
	console.log("draw");
}

function addWordCloud(size, str, color, index){

	var deg  = 45;
	if(index % 2 == 0) deg *= -1;

	// 配置したい言葉
	var word = new Word(font, size, str, color);

	if(words.length <= 0){
		var polygon = word.createPolygon(centerX, centerY, deg);
		word.draw(polygon);
		words.push(word);
		return true;
	}else{
		// Search all words
		for(var w=0; w<words.length; w++){
			// Search 360 deg

			var radius = 2;
			loop:
			for(var p=3; 0<=p; p--){
				for(var d=0; d<360; d+=45){
					var targetX = words[w].getPolygon()[p].x + radius * Math.cos(d * DEG_TO_RAD);
					var targetY = words[w].getPolygon()[p].y + radius * Math.sin(d * DEG_TO_RAD);
					var polygon = word.createPolygon(targetX, targetY, deg);
					
					for(var c=0; c<words.length; c++){
						var across  = checkAcross(words[c].getPolygon(), polygon);
						var inside  = checkInside(polygon, words[c].getPolygon());
						var outside = checkOutside(polygon);
						if(across == true || inside == true || outside == true) continue loop;
					}

					// Test
					if(word.size == 10){
						console.log("str:" + word.str);
					}

					word.draw(polygon);
					words.push(word);
					return true;
				}
			}
		}
	}

	console.log("You can't find any places...");
	return false;
}

function checkAcross(polygonA, polygonB){
	return collidePolyPoly(polygonA, polygonB, true);
}

function checkInside(polygonInner, polygonOuter){
	for(var i=0; i<polygonInner.length; i++){
		if(collidePointPoly(polygonInner[i].x, polygonInner[i].y, polygonOuter)) return true;
	}
	return false;
}

function checkOutside(polygon){
	for(var i=0; i<polygon.length; i++){
		var vector = polygon[i];
		if(vector.x < 0 || canvasW < vector.x) return true;
		if(vector.y < 0 || canvasH < vector.y) return true;
	}
	return false;
}

// Word
class Word{

	constructor(font, size, str, color){
		this.font   = font;
		this.size   = size;
		this.str    = str;
		this.color  = color;

		textFont(font);
		textSize(size);
		this.width  = textWidth(str);
		this.height = size;

		this.polygon = null;
	}

	createPolygon(x, y, deg){
		this.x      = x;
		this.y      = y;
		this.deg    = deg;

		this.radian = deg * DEG_TO_RAD;
		this.radius = this.width;

		this.polygon = new Array(4);
		this.polygon[0]  = this.createVector(this.x, this.y);
		this.polygon[1]  = this.createVector(
			this.x + this.radius * Math.cos(this.radian), 
			this.y + this.radius * Math.sin(this.radian));
		this.polygon[2] = this.createVector(
			this.x + this.radius * Math.cos(this.radian) + this.height * Math.cos(this.radian + 90*DEG_TO_RAD), 
			this.y + this.radius * Math.sin(this.radian) + this.height * Math.sin(this.radian + 90*DEG_TO_RAD));
		this.polygon[3] = this.createVector(
			this.x + this.height * Math.cos(this.radian + 90*DEG_TO_RAD), 
			this.y + this.height * Math.sin(this.radian + 90*DEG_TO_RAD));
		return this.polygon;
	}

	getPolygon(){
		return this.polygon;
	}

	createVector(x, y){
		var vector = {x:x, y:y};
		return vector;
	}

	draw(polygon){
		push();
		translate(this.x, this.y);
		rotate(this.radian);
		fill(33, 33, 33);
		rect(0, 0, this.width, this.height);
		fill(this.color);
		text(this.str, 0, 0 + this.size);
		pop();
	}
}