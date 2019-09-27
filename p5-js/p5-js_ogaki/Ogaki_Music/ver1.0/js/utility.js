console.log("Hello utility.js!!");

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
let bX, bY, nManager, gui;
let combo, score;

function preload(){
	console.log("preload!!");
	// Font
	font = loadFont("./fonts/misaki_gothic.ttf");
	// BGM
	sndBGM = loadSound(SOUND_BGM);
	sndBGM.setVolume(SOUND_VOLUME);
	// Images
	for(let i=0; i<srcImages.length; i++){
		let name = srcImages[i];
		let path = "./images/" + name;
		images[name] = loadImage(path);
	}
	// Images
	for(let i=0; i<noteData.length; i++){
		let name = noteData[i].image;
		let path = "./images/" + name;
		images[name] = loadImage(path);
	}
	// Sounds
	for(let i=0; i<noteData.length; i++){
		let name = noteData[i].sound;
		let path = "./sounds/" + name;
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
	//setTimeout(()=>{sndBGM.play();}, 1000);// Play
	setGUI(nManager.cTime, nManager.tTime);// GUI
}

function draw(){
	background(33);
	drawSprites();
	nManager.draw();
}

function keyTyped(){
	nManager.keyTyped(key);
	onKeyTyped(key);
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
				if(noteData[i].y[j] == "-") continue;
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
					this._markers[j].scale = MARKER_SCALE_FALSE;
					sounds[this._markers[j].sound].play();// Sound
					combo++;// Combo
					score += this._sensors[i].meetTest(position.x, position.y);// Score
					onHit();// onHit
				}else if(height < this._markers[j].position.y){
					this._markers[j].activeFlg = false;// Inactive
					this._markers[j].scale = MARKER_SCALE_FALSE;
					combo = 0;// Combo
					score -= 3// Score
					onMissed();// onMissed
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
		this.play   = playAction;
		this.reset  = resetAction;
		this.seek   = 0;
	};
	gui        = new dat.GUI();// GUI
	let guiCtl = new GuiCtl();
	let folder = gui.addFolder("Controller");
	folder.add(guiCtl, "play");
	folder.add(guiCtl, "reset");
	folder.add(guiCtl, "seek",
		cTime, tTime, 0.01).onFinishChange(resetAction);
	folder.open();
}

function playAction(){
	gui.close();// GUI
	if(sndBGM.isPlaying()){
		sndBGM.pause();
	}else{
		sndBGM.play();
	}
}

function resetAction(s=0){
	if(s == 0) gui.close();// GUI
	combo = 0; score = 0; sndBGM.stop();
	setTimeout(()=>{sndBGM.jump(s);}, 500);
	setTimeout(()=>{nManager.reset();}, 550);
}

function setPopup(x, y, text){
	popups.push({x: x, y: y, text: text, life: 16});
}

function createChara(x, y, path){
	let chara = createSprite(x, y, 16, 16);
	chara.addImage(images[path]);
	return chara;
}

function getBeatFromName(name){
	let array = SOUND_BGM.split("_")[1].split(".");
	return Number(array[0]);
}

//==========
// TimelineMax

function createTimeline(repeat=0, yoyo=false, onComplete=null){
	let tl = new TimelineMax({repeat:repeat, yoyo:yoyo, onComplete:onComplete});
	return tl;
}

function jumpChara(spr, t=0.4, y=20){
	if(spr.tl && spr.tl.isActive()) return;
	spr.tl = createTimeline(0, false, null);
	spr.tl.to(spr.position, t, {delay: 0.0, y: "-="+y});// 相対位置
	spr.tl.to(spr.position, t, {delay: 0.0, y: "+="+y});
}

function rotateChara(spr, t=0.4, r=360){
	if(spr.tl && spr.tl.isActive()) return;
	spr.tl = createTimeline(0, false, null);
	spr.tl.to(spr, t, {delay: 0.0, rotation: "+="+r});// 相対位置
	spr.tl.to(spr, t, {delay: 0.0, rotation: "-="+r});// 相対位置
}

//==========
// SpeechSynthesisUtterance

function startSpeech(text, name="Kyoko", rate=1.0, pitch=3.0, lang="ja-JP"){
	if(!window.speechSynthesis) return;
	let sUtterance = new SpeechSynthesisUtterance();
	let repeat = setInterval(()=>{
		if(sUtterance != null){
			let voices = speechSynthesis.getVoices();
			for(let i=0; i<voices.length; i++){
				if(voices[i].name == name){
					sUtterance.voice = voices[i];// 音声オブジェクト
					sUtterance.rate  = rate;     // 速度(0.1-10.0)
					sUtterance.pitch = pitch;    // ピッチ(0.0-2.0)
					sUtterance.lang  = lang;     // 言語
				}
			}
			sUtterance.text = text;
			speechSynthesis.cancel();
			speechSynthesis.speak(sUtterance);
			clearInterval(repeat);
		}
	}, 100);
}