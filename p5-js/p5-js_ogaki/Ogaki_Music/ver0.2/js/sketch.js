console.log("Hello p5.js!!");

const srcImages = [
	"girl_r01.png", "girl_r02.png", "girl_g01.png", "girl_g02.png", "girl_b01.png", "girl_b02.png",
	"space.png", "rainbow01.png", "mochi01.png", "tf01.png", "tf02.png", "tf03.png", "tf04.png", "tf05.png"
];

const noteData = [
	{sound: "tap.mp3", image:"f01.png", key: "a", x: -80,
		y: [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0]},
	{sound: "tap.mp3", image:"f02.png", key: "s", x: -40,
		y: [0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0]},
	{sound: "tap.mp3", image:"f03.png", key: "d", x:  +0,
		y: [0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0]},
	{sound: "tap.mp3", image:"f04.png", key: "f", x: +40,
		y: [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0]},
	{sound: "tap.mp3", image:"f05.png", key: "g", x: +80,
		y: [0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0]}
];

const SOUND_BGM     = "./assets/bgm_bach.mp3";
const SOUND_VOLUME  = 0.1;  // 音量: 0.0 ~ 1.0
const TYPE_FLG      = false;// true(Auto) / false(Demo)

const TIME_TO_PIXEL = 120;  // 1秒が何ピクセルか
const TIME_TO_SPAN  = 0.25; // ブロック間隔(秒数)
const MARKER_SCALE_TRUE  = 0.8;
const MARKER_SCALE_FALSE = 0.4;

const DIST_GREAT    = 4;
const DIST_GOOD     = 8;
const DIST_BAD      = 10;
const POINT_GREAT   = 30;
const POINT_GOOD    = 10;
const POINT_BAD     = -5;
const TEXT_GREAT    = "GREAT!!";
const TEXT_GOOD     = "GOOD!!";
const TEXT_BAD      = "BAD!!";

const COL_T = [60, 255, 60];
const COL_F = [60, 100, 60];

let font, sndBGM;
let images = {};
let sounds = {};
let popups = [];
let bX, bY, nManager;
let combo, score;

function preload(){
	console.log("preload!!");
	// Font
	font = loadFont("./assets/misaki_gothic.ttf");
	// BGM
	sndBGM = loadSound(SOUND_BGM);
	sndBGM.setVolume(SOUND_VOLUME);
	// Images
	for(let i=0; i<srcImages.length; i++){
		let name = srcImages[i];
		let path = "./assets/" + name;
		images[name] = loadImage(path);
	}
	// Images
	for(let i=0; i<noteData.length; i++){
		let name = noteData[i].image;
		let path = "./assets/" + name;
		images[name] = loadImage(path);
	}
	// Sounds
	for(let i=0; i<noteData.length; i++){
		let name = noteData[i].sound;
		let path = "./assets/" + name;
		sounds[name] = loadSound(path);
	}
}

function setup(){
	console.log("setup!!");
	createCanvas(480, 320);
	frameRate(32);

	setScene();// Scene
	// NoteManager
	bX = Math.floor(width * 0.5);
	bY = Math.floor(height * 0.9);
	nManager = new NoteManager(sndBGM, bX, bY);
	combo = 0; score = 0;
	setTimeout(()=>{sndBGM.play();}, 1000);// Play
	setGUI(nManager.cTime, nManager.tTime);// GUI
}

function draw(){
	background(33);
	drawSprites();
	nManager.draw();
}

function keyTyped(){
	nManager.keyTyped(key);
}

class NoteManager{

	constructor(bgm, x, y){
		console.log("NoteManager");
		this._x     = x;
		this._y     = y;
		this._cTime = bgm.currentTime();
		this._tTime = bgm.buffer.duration;
		this.init();
	}

	init(){
		this._sensors = [];
		this._markers = [];
		for(let i=0; i<noteData.length; i++){
			let note = noteData[i];
			let sX = Math.floor(this._x + note.x);
			let sensor = new Sensor(sX, this._y, noteData[i].key);
			this._sensors.push(sensor);
			for(let j=0; j<noteData[i].y.length; j++){
				if(noteData[i].y[j] == 0) continue;
				let sY = TIME_TO_PIXEL * TIME_TO_SPAN * j;
				let marker = createSprite(sX, this._y - sY, 5, 5);
				marker.addImage(images[noteData[i].image]);
				marker.sound = noteData[i].sound;// Sound
				marker.scale = MARKER_SCALE_TRUE;
				marker.offsetX = sX; marker.offsetY = sY;
				marker.activeFlg = true;// Active
				marker.shapeColor = color(COL_T[0], COL_T[1], COL_T[2]);
				this._markers.push(marker);
			}
		}
	}

	get cTime(){return this._cTime;}
	get tTime(){return this._tTime;}

	draw(){
		if(sndBGM.isPlaying()){
			this._cTime = sndBGM.currentTime();// Current time
			this._y = bY + this._cTime * TIME_TO_PIXEL;
		}
		this.drawLine();
		this.drawParams();
		this.moveSprites();
	}

	drawLine(){
		noFill(); stroke(255); strokeWeight(1.0);
		line(0, bY, width, bY);
		for(let i=0; i<noteData.length; i++){
			let note = noteData[i];
			let sX = Math.floor(this._x + note.x);
			let sY = Math.floor(this._y - this._tTime * TIME_TO_PIXEL);
			line(sX, this._y, sX, sY);
			for(let j=0; j<noteData[i].y.length; j++){
				sY = Math.floor(this._y - TIME_TO_PIXEL * TIME_TO_SPAN * j);
				line(sX-5, sY, sX+5, sY);
			}
		}
	}

	drawParams(){
		fill(255); noStroke(); textFont(font);
		textSize(38); textAlign(RIGHT);
		text("CM:" + combo, width-10, 120);
		text("SC:" + score, width-10, 160);
		// Popups
		for(let i=popups.length-1; 0<=i; i--){
			let popup = popups[i];
			textSize(16); textAlign(CENTER);
			text(popup.text, popup.x, popup.y-16);
			popup.life--;
			if(popup.life <= 0) popups.splice(i, 1);
		}
	}

	moveSprites(){
		for(let m=0; m<this._markers.length; m++){
			this._markers[m].position.x = this._markers[m].offsetX;
			this._markers[m].position.y = this._y - this._markers[m].offsetY;
		}
		for(let i=this._sensors.length-1; 0<=i; i--){
			for(let j=this._markers.length-1; 0<=j; j--){
				if(this._markers[j].position.y < height*0.8) continue;
				if(this._markers[j].activeFlg == false) continue;
				let position = this._markers[j].position;
				if(this._sensors[i].hitTest(position.x, position.y)){
					this._markers[j].activeFlg = false;// Inactive
					this._markers[j].shapeColor = color(COL_F[0], COL_F[1], COL_F[2]);
					this._markers[j].scale = MARKER_SCALE_FALSE;
					sounds[this._markers[j].sound].play();// Sound
					combo++;// Combo
					score += this._sensors[i].meetTest(position.x, position.y);// Score
				}else if(height < this._markers[j].position.y){
					combo = 0;// Combo
				}
			}
		}
	}

	reset(){
		for(let m=0; m<this._markers.length; m++){
			this._markers[m].activeFlg = true;// Active
			this._markers[m].shapeColor = color(COL_T[0], COL_T[1], COL_T[2]);
			this._markers[m].scale = MARKER_SCALE_TRUE;
		}
	}

	keyTyped(key){
		for(let s=0; s<this._sensors.length; s++){
			this._sensors[s].keyTyped(key);
		}
	}
}

class Sensor{

	constructor(x, y, key){
		console.log("Sensor");
		this._cOK = color(60, 100, 60);
		this._cNG = color(60, 255, 60);
		this._spr = createSprite(x, y, 16, 16);
		this._spr.shapeColor = this._cOK;
		this._key = key;// Key
		this._typeFlg = TYPE_FLG;
	}

	get x(){return this._spr.position.x;}
	get y(){return this._spr.position.y;}

	remove(){
		this._spr.remove();
	}

	keyTyped(key){
		if(this._key != key) return;
		if(this._typeFlg == false) return;
		this._typeFlg = false;
		this._spr.shapeColor = this._cNG;
		setTimeout(()=>{
			this._typeFlg = true;
			this._spr.shapeColor = this._cOK;
		}, 300);
	}

	hitTest(pX, pY){
		if(this._typeFlg == true) return false;// Check
		if(this._spr.overlapPoint(pX, pY)) return true;
		return false;
	}

	meetTest(pX, pY){
		let disX = this._spr.position.x - pX;
		let disY = this._spr.position.y - pY;
		let dist = Math.sqrt(disX*disX+disY*disY);
		if(dist < DIST_GREAT){
			setPopup(pX, pY, TEXT_GREAT);
			return POINT_GREAT;
		}
		if(dist < DIST_GOOD){
			setPopup(pX, pY, TEXT_GOOD);
			return POINT_GOOD;
		}
		if(dist < DIST_BAD){
			setPopup(pX, pY, TEXT_BAD);
			return POINT_BAD;
		}
		return 0;
	}
}

function setGUI(cTime, tTime){
	console.log("setGUI");
	let GuiCtl = function(){
		this.toggle = toggleAction;
		this.reset  = resetAction;
		this.seek   = 0;
	};
	let gui    = new dat.GUI();
	let guiCtl = new GuiCtl();
	let folder = gui.addFolder("Controller");
	folder.add(guiCtl, "toggle");
	folder.add(guiCtl, "reset");
	folder.add(guiCtl, "seek",
		cTime, tTime, 0.01).onFinishChange(resetAction);
	folder.open(); gui.close();
}

function toggleAction(){
	if(sndBGM.isPlaying()){
		sndBGM.pause();
	}else{
		sndBGM.play();
	}
}

function resetAction(s=0){
	combo = 0; score = 0; sndBGM.stop();
	setTimeout(()=>{sndBGM.jump(s);}, 500);
	setTimeout(()=>{nManager.reset();}, 550);
}

function setScene(){
	let space = createSprite(width*0.5, height*0.5, 16, 16);
	space.addImage(images["space.png"]);
	let rainbow = createSprite(60, 100, 16, 16);
	rainbow.addImage(images["rainbow01.png"]);
	rainbow.scale = 0.5;
	let mochi = createSprite(width-80, height-50, 16, 16);
	mochi.addImage(images["mochi01.png"]);
	let girl1 = createSprite(40, 260, 16, 16);
	girl1.addImage(images["girl_r01.png"]);
	let girl2 = createSprite(80, 270, 16, 16);
	girl2.addImage(images["girl_g02.png"]);
	let girl3 = createSprite(120, 260, 16, 16);
	girl3.addImage(images["girl_b02.png"]);
}

function setPopup(x, y, text){
	popups.push({x: x, y: y, text: text, life: 16});
}