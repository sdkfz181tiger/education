console.log("Hello p5.js!!");

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

// Words
var words = new Array();

// Polygonsize
var polygonSize = 8;

var canvasW = 480;
var canvasH = 320;
var centerX = canvasW * 0.5;
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
	if(index % 2 != 0) deg = -45;

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

			var radius = Math.min(word.width, word.height);
			for(var p=7; 0<=p; p--){
				loop:
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

					console.log("word:" + word.str + " => " + d);

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

		// Corner
		var distance = Math.sqrt(Math.pow(this.width/2, 2) + Math.pow(this.height/2, 2));
		var radLT = Math.atan2(-this.height/2, -this.width/2);
		this.ltX = this.x + distance * Math.cos(this.radian + radLT);
		this.ltY = this.y + distance * Math.sin(this.radian + radLT);
		var radRT = Math.atan2(-this.height/2, +this.width/2);
		this.rtX = this.x + distance * Math.cos(this.radian + radRT);
		this.rtY = this.y + distance * Math.sin(this.radian + radRT);
		var radRB = Math.atan2(+this.height/2, +this.width/2);
		this.rbX = this.x + distance * Math.cos(this.radian + radRB);
		this.rbY = this.y + distance * Math.sin(this.radian + radRB);
		var radLB = Math.atan2(+this.height/2, -this.width/2);
		this.lbX = this.x + distance * Math.cos(this.radian + radLB);
		this.lbY = this.y + distance * Math.sin(this.radian + radLB);

		// Top, Bottom, Left, Right
		this.tcX = this.x + this.height / 2 * Math.cos(this.radian - 90*DEG_TO_RAD);
		this.tcY = this.y + this.height / 2 * Math.sin(this.radian - 90*DEG_TO_RAD);
		this.bcX = this.x + this.height / 2 * Math.cos(this.radian + 90*DEG_TO_RAD);
		this.bcY = this.y + this.height / 2 * Math.sin(this.radian + 90*DEG_TO_RAD);
		this.lcX = this.x + this.width  / 2 * Math.cos(this.radian - 180*DEG_TO_RAD);
		this.lcY = this.y + this.width  / 2 * Math.sin(this.radian - 180*DEG_TO_RAD);
		this.rcX = this.x + this.width  / 2 * Math.cos(this.radian - 0*DEG_TO_RAD);
		this.rcY = this.y + this.width  / 2 * Math.sin(this.radian - 0*DEG_TO_RAD);

		// Polygon
		this.polygon = new Array(polygonSize);
		this.polygon[0] = this.createVector(this.ltX, this.ltY);
		this.polygon[1] = this.createVector(this.tcX, this.tcY);
		this.polygon[2] = this.createVector(this.rtX, this.rtY);
		this.polygon[3] = this.createVector(this.rcX, this.rcY);
		this.polygon[4] = this.createVector(this.rbX, this.rbY);
		this.polygon[5] = this.createVector(this.bcX, this.bcY);
		this.polygon[6] = this.createVector(this.lbX, this.lbY);
		this.polygon[7] = this.createVector(this.lcX, this.lcY);

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
		rect(-this.width/2, -this.height/2, this.width, this.height);
		fill(this.color);
		text(this.str, -this.width/2, -this.height/2 + this.size);
		pop();
	}
}