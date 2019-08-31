console.log("Hello p5.js!!");

// 初期化
function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(0);
	fill(0, 0, 0);
	
	noLoop();
	noStroke();// No stroke

	// JSONファイルの読み込み
	loadJSON("./json/bubble.json", function(data){
		console.log("data:" + data);

		// データの格納
		var jsonData = data.root;
		var bubbles = new Array();

		// データの確認
		for(var i=0; i<jsonData.length; i++){

			// Ellipse
			var r = jsonData[i].r;
			var color = jsonData[i].color;

			// Bubble
			var bubble = new Bubble(480/2, 320/2, r, color);
			bubbles.push(bubble);
		}

		// 再配置
		offsetBubbles(bubbles);

		// 描画
		for(var i=0; i<bubbles.length; i++){
			var bubble = bubbles[i];
			bubble.draw();
		}
	});
}

// 連続処理
function draw(){
	console.log("draw");
}

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

function offsetBubbles(bubbles){
	console.log("offsetBubbles");

	// 最初の2個
	var bubbleA = bubbles[0];
	var bubbleB = bubbles[1];
	offsetDouble(bubbleA, bubbleB, 30);

	// 3個目から
	for(var i=0; i<bubbles.length-2; i++){
		var bubbleA = bubbles[i];
		var bubbleB = bubbles[i+1];
		var bubbleC = bubbles[i+2];
		offsetTripple(bubbleA, bubbleB, bubbleC, i);
	}
}

function offsetDouble(bubbleA, bubbleB, deg){
	console.log("offsetDouble");
	
	var distance = bubbleA.r + bubbleB.r;
	var angle = DEG_TO_RAD * deg;
	var offsetX = Math.floor(distance * Math.cos(angle));
	var offsetY = Math.floor(distance * Math.sin(angle));
	bubbleB.x = bubbleA.x + offsetX;
	bubbleB.y = bubbleA.y + offsetY;
}

function offsetTripple(bubbleA, bubbleB, bubbleC, i){
	console.log("offsetTripple");

	// BubbleAとBubbleBのなす角
	var vX = bubbleB.x - bubbleA.x;
	var vY = bubbleB.y - bubbleA.y;
	var thetaAB = Math.atan2(vY, vX);
	console.log("deg(A-B):" + thetaAB * RAD_TO_DEG);

	// 余弦定理を使う
	var rAB = bubbleA.r + bubbleB.r;
	var rAC = bubbleA.r + bubbleC.r;
	var rBC = bubbleB.r + bubbleC.r;
	var cos = ((rBC*rBC) - (rAB*rAB) - (rAC*rAC)) / (-2*rAB*rAC);
	var thetaAC = Math.acos(cos);
	console.log("deg(A-C):" + thetaAC * RAD_TO_DEG);

	// 最終的な角度を算出する
	var theta = thetaAB;
	var odd = i % 2;
	if(odd != 0){
		theta += thetaAC;
	}else{
		theta -= thetaAC;
	}
	console.log("deg:" + theta * RAD_TO_DEG);

	bubbleC.x = bubbleA.x + rAC * Math.cos(theta);
	bubbleC.y = bubbleA.y + rAC * Math.sin(theta);
}

function collisionBubbles(bubbleA, bubbleB){
	var distX = bubbleA.x - bubbleB.x;
	var distY = bubbleB.y - bubbleB.y;
	var distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
	var padding  = bubbleA.r + bubbleB.r;
	console.log("distance:" + distance + " <-> padding:" + padding);
	if(distance < padding) return true;
	return false;
}

class Bubble{

	constructor(x, y, r, color){
		this.x     = x;
		this.y     = y;
		this.r     = r;
		this.color = color;
	}

	draw(){
		fill(this.color);// Fill green
		ellipse(this.x, this.y, this.r * 2, this.r * 2);
	}
}