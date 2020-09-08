console.log("Hello main.js!!");

const srcImages = [
	"girl_r01.png", "girl_g01.png", "girl_b01.png",
	"girl_r02.png", "girl_g02.png", "girl_b02.png",
	"space.png", "rainbow01.png", "mochi01.png", 
	"tf01.png", "tf02.png", "tf03.png", "tf04.png", "tf05.png"
];

const noteData = [
	{sound: "tap.mp3", image:"f02.png", key: "1", x: -40,
		y: "111-1-11"},
	{sound: "tap.mp3", image:"f03.png", key: "2", x:  +0,
		y: "--111"},
	{sound: "tap.mp3", image:"f04.png", key: "3", x: +40,
		y: "-1-1-1111"},
];

const SOUND_BGM     = "./sounds/beat01_80.mp3";
const SOUND_VOLUME  = 0.8; // 音量: 0.0 ~ 1.0
const TIME_TO_BEAT  = getBeatFromName(SOUND_BGM);
const TIME_TO_SPAN  = 60/TIME_TO_BEAT;// ブロック間隔(秒数)
const TIME_TO_PIXEL = 200;// 1秒が何ピクセルか
const TYPE_FLG      = true;// true(Auto) / false(Demo)

let g1, g2, g3, mochi;

function setScene(){

	createChara(240, 160, "space.png");

	g1 = createChara(40, 260, "girl_r01.png");
	g2 = createChara(80, 270, "girl_g01.png");
	g3 = createChara(120, 260, "girl_b01.png");
	mochi = createChara(400, 270, "mochi01.png");
}

function onKeyTyped(key){
	console.log(key);
	if(key == 1) jumpChara(g1);
	if(key == 2) jumpChara(g2);
	if(key == 3) rotateChara(g3);
}

function onHit(){
	console.log("onHit!!");
	jumpChara(mochi);
}

function onMissed(){
	console.log("onMissed!!");
}