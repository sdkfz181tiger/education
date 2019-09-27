console.log("Hello main.js!!");

const srcImages = [
	"girl_r01.png", "girl_g01.png", "girl_b01.png",
	"girl_r02.png", "girl_g02.png", "girl_b02.png",
	"space.png", "rainbow01.png", "mochi01.png", 
	"tf01.png", "tf02.png", "tf03.png", "tf04.png", "tf05.png",
];

const noteData = [
	{sound: "tap.mp3", image:"f02.png", key: "1", x: -40,
		y: ""},
	{sound: "tap.mp3", image:"f03.png", key: "2", x:  +0,
		y: ""},
	{sound: "tap.mp3", image:"f04.png", key: "3", x: +40,
		y: ""},
];

const SOUND_BGM     = "./sounds/beat01_80.mp3";
const SOUND_VOLUME  = 0.8; // 音量: 0.0 ~ 1.0
const TIME_TO_BEAT  = getBeatFromName(SOUND_BGM);
const TIME_TO_SPAN  = 60/TIME_TO_BEAT;// ブロック間隔(秒数)
const TIME_TO_PIXEL = 200;// 1秒が何ピクセルか
const TYPE_FLG      = true;// true(Auto) / false(Demo)

//let g1, g2, g3, mochi;

// 背景を作るよ
function setScene(){

}

// キーボード
function onKeyTyped(key){
	
}

function onHit(){
	console.log("onHit!!");
}

function onMissed(){
	console.log("onMissed!!");
}