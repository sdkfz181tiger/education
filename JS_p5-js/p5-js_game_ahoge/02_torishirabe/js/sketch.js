const DIR = "./assets/";
const F_RATE = 32;

let fDigital;
let seDanger, seGameOver, seScore, seTempo;
let deadFlg = false;
let score   = 0;
let hCnt    = 22;
let hMax    = 22;

let handLeft, handRight, handPlayer;
let police;

function preload(){
	fDigital   = loadFont(DIR + "PixelLcd7.ttf");
	seDanger   = loadSound(DIR + "se_danger.mp3");
	seGameOver = loadSound(DIR + "se_gameover.mp3");
	seScore    = loadSound(DIR + "se_score.mp3");
	seTempo    = loadSound(DIR + "se_tempo.mp3");
}

function setup(){
	createCanvas(480, 480);
	angleMode(DEGREES);
	frameRate(F_RATE);
	noSmooth();
	textFont(fDigital, 14);

	const cX = width / 2;
	const cY = height / 2;

	const l1 = new Chara(cX-110, 130,  0, "p_l_1_off.png", "p_l_1_on.png");
	const l2 = new Chara(cX-140, 180, 0, "p_l_2_off.png", "p_l_2_on.png");
	const l3 = new Chara(cX-130, 270, 0, "p_l_3_off.png", "p_l_3_on.png");
	const l4 = new Chara(cX-58,  320, 0, "p_l_4_off.png", "p_l_4_on.png");
	handLeft = new Chains([l1, l2, l3, l4]);
	handLeft.random();

	const r1 = new Chara(cX+118, 130,  0, "p_r_1_off.png", "p_r_1_on.png");
	const r2 = new Chara(cX+135, 180, 0, "p_r_2_off.png", "p_r_2_on.png");
	const r3 = new Chara(cX+138, 260, 0, "p_r_3_off.png", "p_r_3_on.png");
	const r4 = new Chara(cX+48,  310, 0, "p_r_4_off.png", "p_r_4_on.png");
	handRight = new Chains([r1, r2, r3, r4]);
	handRight.random();

	const p1 = new Chara(cX-160, height-90, 0, "p_hand_off.png", "p_hand_on.png");
	const p2 = new Chara(cX,     height-90, 0, "p_hand_off.png", "p_hand_on.png");
	const p3 = new Chara(cX+160, height-90, 0, "p_hand_off.png", "p_hand_on.png");
	handPlayer = new Chains([p1, p2, p3]);

	police = new Chara(cX, cY-80, 0, "p_body_off.png", "p_body_on.png");
	police.setFlg(false);
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
		handLeft.ticktack();
		handRight.ticktack();
		if(handPlayer.collide(handLeft) || --hCnt <= 0){
			seGameOver.play();
			handPlayer.blink(10, 100);
			police.setFlg(true);
			deadFlg = true;// GameOver
		}
		if(handPlayer.collide(handRight)){
			seScore.play();
			gainKatudon();
		}
	}
}

function keyPressed(){
	if(deadFlg == true) return;

	if(keyCode == LEFT_ARROW){
		handPlayer.prev();
	}
	if(keyCode == RIGHT_ARROW){
		handPlayer.next();
	}
	if(handPlayer.collide(handLeft)){
		seGameOver.play();
		handPlayer.blink(10, 100);
		police.setFlg(true);
		deadFlg = true;// GameOver
	}
	if(handPlayer.collide(handRight)){
		seScore.play();
		gainKatudon();
	}
}

function gainKatudon(){
	score++;// Score
	hCnt += 3;// Hunger
	if(hMax < hCnt) hCnt = hMax;
}

function showScore(){
	noStroke();
	// How to play
	textAlign(CENTER, BOTTOM);
	textFont(fDigital, 18);
	fill(0, 66, 0);
	text("<- Left key | Right key ->", width/2, 64);
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
	// Hunger
	textAlign(LEFT, BOTTOM);
	textFont(fDigital, 18);
	fill(0, 66, 0);
	text("HUNGRY", 8, height-5);
	const hSize = 15;
	for(let i=0; i<hMax; i++){
		let x = 90 + i * (hSize+2);
		if(hCnt <= i){
			fill(120, 180, 120);
		}else{
			fill(0, 66, 0);
		}
		square(x, height-25, hSize);
	}
	// GameOver
	textAlign(RIGHT, TOP);
	textFont(fDigital, 32);
	fill(120, 180, 120);
	text("TAIHO!!", width-8, 8);
	if(deadFlg == false) return;
	fill(0, 66, 0);
	text("TAIHO!!", width-8, 8);
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
		if(!this.getSprite().overlap(sprite)) return false;
		return true;
	}

	blink(times, mil){
		this._charas[this._index].blink(times, mil);
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
			//this._sprOff.debug = true;
			this._sprOff.scale = 3;
		}
		if(on != null){
			const imgOn = loadImage(DIR + on);
			this._sprOn = createSprite(x, y+4);
			this._sprOn.addImage(imgOn);
			this._sprOn.rotation = this._rot;
			//this._sprOn.debug = true;
			this._sprOn.scale = 3;
		}
	}

	getSprite(){
		return this._sprOn;
	}

	setFlg(flg){
		this._flg = flg;
		this._sprOn.visible = this._flg;
	}

	blink(times, mil){
		this._sprOn.visible = !this._sprOn.visible;
		if(times <= 0 && this._sprOn.visible) return;
		setTimeout(()=>{this.blink(times-1, mil);}, mil);
	}
}
