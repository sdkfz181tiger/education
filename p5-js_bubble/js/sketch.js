console.log("Hello p5.js!!");

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

// Bubbles
var bubbles = new Array();

// 初期化
function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(0);
	fill(0, 0, 0);
	
	noLoop();
	noStroke();// No stroke

	// JSONファイルの読み込み
	loadJSON("./json/data.json", function(data){
		console.log("data:" + data);

		// データの格納
		var jsonData = data.root;

		// データの確認
		loop:
		for(var j=0; j<jsonData.length; j++){

			// Radius and Color
			var radius = Number(jsonData[j].r);
			var color  = jsonData[j].color;
			var title  = jsonData[j].title;
			console.log("data:" + radius + ", " + color + ", " + title);

			// Bubbles
			if(bubbles.length <= 0){
				// First Bubble
				var posX = 480 / 2;
				var posY = 320 / 2;
				var bubble = new Bubble(posX, posY, radius, color);
				bubbles.push(bubble);
			}else{
				// Collision or not
				for(var t=0; t<bubbles.length; t++){
					var bubbleT = bubbles[t];
					var bubble = createBubble360(bubbleT, radius, color);
					if(bubble != null){
						bubbles.push(bubble);
						continue loop;
					}
				}
			}
		}

		// Ellipse
		for(var i=0; i<bubbles.length; i++){
			var bubble = bubbles[i];
			fill(bubble.color);
			ellipse(bubble.x, bubble.y, bubble.r * 2, bubble.r * 2);
		}
	});
}

// 連続処理
function draw(){
	console.log("draw");
}

// bubbleTを中心に、0 ~ 359の範囲で半径radiusの円を作成する
function createBubble360(bubbleT, radius, color){

	for(var i=0; i<360; i+=1){
		var distance = bubbleT.r + radius;
		var theta    = i * DEG_TO_RAD;
		var posX     = bubbleT.x + distance * Math.cos(theta);
		var posY     = bubbleT.y + distance * Math.sin(theta);

		var collision = collisionBubbles(posX, posY, radius);
		if(collision == false){
			var bubble = new Bubble(posX, posY, radius, color);
			return bubble;
		}
	}
	return null;
}

// xがposX、yがposY、半径がradiusの円が他の円との衝突を判定
function collisionBubbles(posX, posY, radius){

	for(var i=0; i<bubbles.length; i++){
		var bubbleT = bubbles[i];
		var distX = bubbleT.x - posX;
		var distY = bubbleT.y - posY;
		var distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
		var padding  = Number(bubbleT.r) + radius;
		if(distance < padding){
			return true;
		}
	}
	return false;
}

// Bubbleクラス
class Bubble{

	constructor(x, y, r, color, title){
		this.x     = x;
		this.y     = y;
		this.r     = r;
		this.color = color;
		this.title = title;
	}

	draw(){
		fill(this.color);// Fill color
		ellipse(this.x, this.y, this.r * 2, this.r * 2);
	}
}