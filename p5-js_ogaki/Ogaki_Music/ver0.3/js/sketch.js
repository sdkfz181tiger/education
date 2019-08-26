console.log("Hello p5.js!!");

const SOUND_BGM     = "./assets/bgm_bach.mp3";
const SOUND_VOLUME  = 0.1;  // 音量: 0.0 ~ 1.0
const TYPE_FLG      = true;// true(Auto) / false(Demo)

const srcImages = [
	"girl_r01.png", "girl_r02.png", 
	"girl_g01.png", "girl_g02.png",
	"girl_b01.png", "girl_b02.png",
	"space.png", "rainbow01.png", "mochi01.png", 
	"tf01.png", "tf02.png", "tf03.png", "tf04.png", "tf05.png"
];

const noteData = [
	{sound: "tap.mp3", image:"f02.png", key: "1", x: -40,
		y: "1---1---1---1---1---1---1---1---"},
	{sound: "tap.mp3", image:"f03.png", key: "2", x:  +0,
		y: "-1---1---1---1---1---1---1---1---"},
	{sound: "tap.mp3", image:"f04.png", key: "3", x: +40,
		y: "--1---1---1---1---1---1---1---1---"},
];

function setScene(){

	let space = createChara(width*0.5, height*0.5, "space.png");

	let mochi = createChara(400, 270, "mochi01.png");

	let girl1 = createChara(40, 260, "girl_r01.png");

	let girl2 = createChara(80, 270, "girl_g02.png");

	let girl3 = createChara(120, 260, "girl_b02.png");
}

function onHit(){
	console.log("onHit!!");
}

function onMissed(){
	console.log("onMissed!!");
}

function createChara(x, y, path){
	let chara = createSprite(x, y, 16, 16);
	chara.addImage(images[path]);
	return chara;
}