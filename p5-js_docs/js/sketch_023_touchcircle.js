console.log("Hello p5.js!!");

// 変数を用意する
var myStr   = "Hello!!";
var circleX = 0;
var circleY = 0;
var myX     = 0;
var myY     = 0;

// 初期化
function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(0);
	fill(0, 200, 0);// Fill green
	
	//noLoop();
	noStroke();// No stroke
}

// 連続処理
function draw(){
	//console.log("draw");
	background(0);
	
	// 距離を計算してみる
	var disX = myX - circleX;
　　var disY = myY - circleY;
　　var radius = Math.sqrt(Math.pow(disX,2) + Math.pow(disY,2));
	ellipse(circleX, circleY, radius*2, radius*2);
}

// MouseEvent
function mousePressed(e){
	//console.log("mousePressed");
	circleX = e.clientX;
	circleY = e.clientY;
	myX     = e.clientX;
	myY     = e.clientY;
}

function mouseDragged(e){
	//console.log("mouseDragged");
	myX = e.clientX;
	myY = e.clientY;
}
