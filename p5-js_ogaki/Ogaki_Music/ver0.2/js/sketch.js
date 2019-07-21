console.log("Hello p5.js!!");

const noteData = [
	{sound: "tap.mp3", key: "a", x: -60,
		y: [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0]},
	{sound: "tap.mp3", key: "s", x: -30,
		y: [0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0]},
	{sound: "tap.mp3", key: "d", x:  +0,
		y: [0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0]},
	// {sound: "tap.mp3", key: "f", x: +30,
	// 	y: [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0]},
	// {sound: "tap.mp3", key: "g", x: +60,
	// 	y: [0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0]}
];

const COL_T = [ 60, 255,  60];
const COL_F = [100, 100, 100];

const SOUND_BGM     = "./assets/bgm_bach.mp3";
const SOUND_VOLUME  = 0.8;// 音量: 0.0 ~ 1.0

const TIME_TO_PIXEL = 80;  // 1秒が何ピクセルか
const TIME_TO_SPAN  = 0.25;// ブロック間隔(秒数)

const DIST_GREAT = 4;
const DIST_GOOD  = 8;
const DIST_BAD   = 10;

const POINT_GREAT = 30;
const POINT_GOOD  = 10;
const POINT_BAD   = -5;

let sndBGM;
let sounds = {};
let bX, bY, nManager;
let combo, score;

function preload(){
	console.log("preload!!");
	// BGM
	sndBGM = loadSound(SOUND_BGM);
	sndBGM.setVolume(SOUND_VOLUME);
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

	bX = Math.floor(width * 0.5);
	bY = Math.floor(height * 0.9);
	nManager = new NoteManager(sndBGM, bX, bY);
	combo = 0; score = 0;

	setTimeout(()=>{sndBGM.play();}, 1000);// Play
	setGUI(nManager.cTime, nManager.tTime);
}

function draw(){
	background(33);
	nManager.draw();
	drawSprites();
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
				marker.sound = noteData[i].sound;// Sound
				marker.offsetX = sX; marker.offsetY = sY;
				marker.activeFlg = true;// Active
				marker.shapeColor = color(COL_T[0], COL_T[1], COL_T[2]);
				this._markers.push(marker);
			}
		}
	}

	get cTime(){return this._cTime;};
	get tTime(){return this._tTime;};

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
			line(sX, this._y, sX, this._y - this._tTime * TIME_TO_PIXEL);
			for(let j=0; j<noteData[i].y.length; j++){
				let sY = this._y - TIME_TO_PIXEL * TIME_TO_SPAN * j;
				line(sX-5, sY, sX+5, sY);
			}
		}
	}

	drawParams(){
		fill(255); noStroke();
		textSize(12); textAlign(LEFT);
		text("COMBO:" + combo, 10, 18);
		textSize(12); textAlign(LEFT);
		text("SCORE:" + score, 10, 36);
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
		console.log("m:" + this._markers.length);

		for(let m=0; m<this._markers.length; m++){
			this._markers[m].activeFlg = true;// Active
			this._markers[m].shapeColor = color(COL_T[0], COL_T[1], COL_T[2]);
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
		this._typeFlg = false;
	}

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
		if(dist < DIST_GREAT) return POINT_GREAT;
		if(dist < DIST_GOOD)  return POINT_GOOD;
		if(dist < DIST_BAD)   return POINT_BAD;
		return 0;
	}
}

function setGUI(cTime, tTime){
	console.log("setGUI");
	let GuiCtl = function(){
		this.toggle = toggleAction;
		this.reset  = resetAction;
		this.seek  = 0;
	};
	let gui    = new dat.GUI();
	let guiCtl = new GuiCtl();

	let folder = gui.addFolder("Controller");
	folder.add(guiCtl, "toggle");
	folder.add(guiCtl, "reset");
	folder.add(guiCtl, "seek",
		cTime, tTime, 0.01).onFinishChange(seekAction);
	folder.open();
}

function toggleAction(){
	if(sndBGM.isPlaying()){
		sndBGM.pause();
	}else{
		sndBGM.play();
	}
}

function resetAction(){
	if(sndBGM.isPlaying()){
		sndBGM.stop();
		setTimeout(()=>{sndBGM.play();}, 500);// Play
		nManager.reset();// Reset
	}
}

function seekAction(d){
	if(sndBGM.isPlaying()){
		sndBGM.stop();
		setTimeout(()=>{sndBGM.jump(d);}, 500);// Jump
		nManager.reset();// Reset
	}
}