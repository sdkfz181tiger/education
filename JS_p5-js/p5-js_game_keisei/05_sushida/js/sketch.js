
const sushis = [
	{word: "toro",  path:"s_toro.png",  img:null},
	{word: "sake",  path:"s_sake.png",  img:null},
	{word: "ikura", path:"s_ikura.png", img:null},
	{word: "aho", path:"s_ikura.png", img:null},
	{word: "baka", path:"s_ikura.png", img:null},
	{word: "tare", path:"s_ikura.png", img:null},
	{word: "ga", path:"s_ikura.png", img:null},
];

let word = null;
let img = null;
let sndOK, sndNG, sndNext, sndClear;

function preload(){
	// Images
	for(let sushi of sushis){
		sushi.img = loadImage("assets/" + sushi.path);
	}
	// Sounds
	sndOK = loadSound("assets/se_ok.mp3");
	sndNG = loadSound("assets/se_ng.mp3");
	sndNext = loadSound("assets/se_next.mp3");
	sndClear = loadSound("assets/se_clear.mp3");
}

function setup(){
	createCanvas(320, 480);
	angleMode(DEGREES);
	frameRate(8);
	background(33);

	fill(255);
	textAlign(CENTER, CENTER);
	textSize(48);

	for(let i=sushis.length-1; 0<i; i--){
		let k = Math.floor(Math.random() * i);
		let tmp = sushis[k];
		sushis[k] = sushis[i];
		sushis[i] = tmp;
	}
	console.log(sushis);

	word = sushis[0].word;
	img = sushis[0].img;
	sushis.splice(0, 1);
}

function draw(){
	background(33);

	if(word == null || img == null){
		background(33, 99, 66);
		text("Game Clear!!", width/2, height/2);
		sndClear.play();
		noLoop();
		return;
	}

	// Word
	text(word, width/2, height * 0.6);

	// Image
	img.resize(100, 0);
	let x = width / 2 - img.width / 2;
	let y = height * 0.4 - img.height / 2;
	image(img, x, y);
}

function keyPressed(){
	if(!isLooping()) return;
	console.log(key);

	// Next characters...
	if(word[0] == key){
		word = word.slice(1);
		sndOK.play();
	}else{
		sndNG.play();
	}

	// Next words...
	if(0 < word.length) return;

	if(0 < sushis.length){
		word = sushis[0].word;
		img = sushis[0].img;
		sushis.splice(0, 1);
		sndNext.play();
	}else{
		word = null;
		img = null;
	}
}

