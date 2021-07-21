const DIR = "./assets/";
const F_RATE = 32;

let fDigital;
let seDanger, seGameOver, seScore, seTempo;
let deadFlg = false;
let score = 0;

let chainsPlayer, chainsEnemy;

function preload(){
	fDigital   = loadFont(DIR + "PixelLcd7.ttf");
	seDanger   = loadSound(DIR + "se_danger.mp3");
	seGameOver = loadSound(DIR + "se_gameover.mp3");
	seScore    = loadSound(DIR + "se_score.mp3");
	seTempo    = loadSound(DIR + "se_tempo.mp3");
}

function setup(){
	createCanvas(480, 360);
	angleMode(DEGREES);
	frameRate(F_RATE);
	noSmooth();
	textFont(fDigital, 14);

	const back = new Chara(width/2, height/2, 0, "n_back.png");
	const pX = 50;

	const p1 = new Chara(pX*1, height/2, 0, "n_play_1_off.png", "n_play_1_on.png");
	const p2 = new Chara(pX*2, height/2, 0, "n_play_2_off.png", "n_play_2_on.png");
	const p3 = new Chara(pX*3, height/2, 0, "n_play_3_off.png", "n_play_3_on.png");
	const p4 = new Chara(pX*4, height/2, 0, "n_play_4_off.png", "n_play_4_on.png");
	const p5 = new Chara(pX*5, height/2, 0, "n_play_5_off.png", "n_play_5_on.png");
	const p6 = new Chara(pX*6, height/2, 0, "n_play_6_off.png", "n_play_6_on.png");
	const p7 = new Chara(pX*7, height/2, 0, "n_play_7_off.png", "n_play_7_on.png");
	chainsPlayer = new Chains([p1, p2, p3, p4, p5, p6, p7]);

	const e1 = new Chara(pX*1, pX*1, 0, "n_play_1_off.png", "n_play_1_on.png");
	const e2 = new Chara(pX*2, pX*2, 0, "n_play_2_off.png", "n_play_2_on.png");
	const e3 = new Chara(pX*3, pX*3, 0, "n_play_3_off.png", "n_play_3_on.png");
	const e4 = new Chara(pX*4, pX*4, 0, "n_play_4_off.png", "n_play_4_on.png");
	const e5 = new Chara(pX*5, pX*5, 0, "n_play_5_off.png", "n_play_5_on.png");
	const e6 = new Chara(pX*6, pX*6, 0, "n_play_6_off.png", "n_play_6_on.png");
	const e7 = new Chara(pX*7, pX*7, 0, "n_play_7_off.png", "n_play_7_on.png");
	chainsEnemy = new Chains([e1, e2, e3, e4, e5, e6, e7]);
	chainsEnemy.random();
}

function draw(){
	background(128, 220, 128);
	drawSprites();
	showScore();

	if(deadFlg == true) return;

	let offset = F_RATE - floor(score/10)*8;
	if(offset < 1) offset = 8;
	if(frameCount%offset == 0){
		seTempo.play();
		chainsEnemy.ticktack();
		if(chainsPlayer.collide(chainsEnemy)){
			seGameOver.play();
			deadFlg = true;// GameOver
		}
	}
}

function keyPressed(){
	if(deadFlg == true) return;

	score++;

	if(keyCode == LEFT_ARROW){
		chainsPlayer.prev();
	}
	if(keyCode == RIGHT_ARROW){
		chainsPlayer.next();
	}
	if(chainsPlayer.collide(chainsEnemy)){
		seGameOver.play();
		deadFlg = true;// GameOver
	}
}

function showScore(){
	// How to play
	textAlign(CENTER, BOTTOM);
	textFont(fDigital, 24);
	fill(0, 66, 0);
	text("<- Left key | Right key ->", width/2, height - 5);
	// Score
	let digits = "";
	let length = score.toString().length;
	for(let i=0; i<length; i++) digits += "8";
	textAlign(LEFT, TOP);
	textFont(fDigital, 32);
	fill(120, 180, 120);
	text(digits, 8, 8);
	fill(0, 66, 0);
	text(score, 8, 8);
	// GameOver
	textAlign(RIGHT, TOP);
	textFont(fDigital, 32);
	fill(120, 180, 120);
	text("GAME OVER", width-8, 8);
	if(deadFlg == false) return;
	fill(0, 66, 0);
	text("GAME OVER", width-8, 8);
}

class Chains{

	constructor(charas, index=0){
		this._charas = charas;
		this._index = index;
		this._wait = 0;
		this.show();
	}

	next(){
		if(this._charas.length-1 <= this._index) return;
		this._index++;
		this.show();
	}

	prev(){
		if(this._index <= 0) return;
		this._index--;
		this.show();
	}

	random(){
		this._index = floor(random(this._charas.length));
		this.show();
	}

	ticktack(){
		if(0 < --this._wait) return;
		if(this._charas.length-1 < ++this._index){
			this._index = 0;
			this._wait = floor(random(5));
		}
		this.show();
	}

	show(){
		for(let i=0; i<this._charas.length; i++){
			this._charas[i].setFlg(i==this._index);
		}
	}

	getSprite(){
		return this._charas[this._index].getSprite();
	}

	collide(other){
		let sprite = other.getSprite();
		let x = sprite.position.x;
		let y = sprite.position.y;
		if(!this.getSprite().overlapPoint(x, y)) return false;
		return true;
	}
}

class Chara{

	constructor(x, y, r=0, off=null, on=null){
		this._flg = false;
		this._x   = x;
		this._y   = y;
		this._rot = r;
		this._sprOff = null;
		this._sprOn  = null;
		if(off != null){
			const imgOff = loadImage(DIR + off);
			this._sprOff = createSprite(x, y);
			this._sprOff.addImage(imgOff);
			this._sprOff.rotation = this._rot;
			this._sprOff.debug = true;
		}
		if(on != null){
			const imgOn = loadImage(DIR + on);
			this._sprOn = createSprite(x, y);
			this._sprOn.addImage(imgOn);
			this._sprOn.rotation = this._rot;
			this._sprOn.debug = true;
		}
	}

	getSprite(){
		return this._sprOn;
	}

	setFlg(flg){
		this._flg = flg;
		this._sprOn.visible = this._flg;
	}

	dead(times, mil){
		this._flg = !this._flg;
		this._sprOn.visible = this._flg;
		if(times <= 0) return;
		setTimeout(()=>{this.dead(times-1, mil);}, mil);
	}
}
