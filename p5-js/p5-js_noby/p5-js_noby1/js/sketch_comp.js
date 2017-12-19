console.log("Hello p5.js!!");

const appUrl = "https://www.cotogoto.ai/webapi/noby.json";
const appKey = "2162b705a12b3356ac7a7488c9adc6c2";

let imgGodNormal, imgGodAngry, imgGodSad;

let myInput, myBtn;
let sprGod, textGod;

function preload(){

	// Font
	let font = loadFont("assets/misaki_gothic.ttf");
	textFont(font);

	// Images
	imgGodNormal = loadImage("assets/god_normal.png");
	imgGodAngry  = loadImage("assets/god_angry.png");
	imgGodSad    = loadImage("assets/god_sad.png");
}

function setup(){
	console.log("setup");
	let canvas = createCanvas(480, 320);
	canvas.parent("myCanvas");
	frameRate(8);
	clear();
	background(33, 33, 33);
	fill(255, 255, 255);
	noStroke();

	// Input
	myInput = createInput();
	myInput.position(5, 5);
	myInput.value("明日の天気は？");

	// Button
	myBtn = createButton("Submit");
	myBtn.position(myInput.x + myInput.width + 5, myInput.y + 3);
	myBtn.mousePressed(()=>{
		let value = myInput.value();
		accessNoby(value);
	});

	// God
	sprGod = createSprite(width*0.5, 120, 5, 5);
	sprGod.addImage(imgGodNormal);

	// Text
	textGod = "***";
}

function draw(){
	//console.log("draw");
	background(33, 33, 33);
	drawSprites();
	textAlign(CENTER);
	text(textGod, width*0.5, 190);
}

function accessNoby(value){

	// Chat
	appendChat("You:" + value);

	// jQuery
	let json = {"text": value, "appkey": appKey, "persona": 3, "ending": "だべさ"};
	httpGet(appUrl, json, (data)=>{
		// 表示用テキスト
		textGod = reformStr(data.text);

		// ムード
		let mood = data.mood;
		console.log("ムード");
		console.log(mood);

		// ネガポジ
		let negaposi = data.negaposi;
		console.log("ネガポジ");
		console.log(negaposi);

		// 感情
		let emotionList = data.emotionList;
		console.log("感情");
		console.log(emotionList);
		
		// ネガティブ/ポジティブ
		let negaposiList = data.negaposiList;
		console.log("ネガティブ/ポジティブ");
		console.log(negaposiList);

		// Chat
		appendChat("Noby:" + data.text);
	});
}

function appendChat(str){
	$("#myChat").append("<li>" + str + "</li>");
}