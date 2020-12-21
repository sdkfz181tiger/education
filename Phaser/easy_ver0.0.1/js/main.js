"use strict";

const D_WIDTH  = 480;
const D_HEIGHT = 320;
const FONT = {fontFamily: "MisakiGothic"};

let sndDamage, sndHit, sndShot;
let scoreNum, scoreTxt;
let player, balls, yukkuris;

const config = {
	type: Phaser.AUTO,
	width: D_WIDTH, 
	height: D_HEIGHT,
	physics: {
		default: "arcade",
		arcade: {
			debug: true,
			gravity: {x: 0, y: 300}
		}
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
}

let phaser = new Phaser.Game(config);

function preload(){
	console.log("preload!!");
	// Load image
	this.load.image("sky", "assets/bkg_sky.png");
	this.load.image("mountain", "assets/bkg_mountain.png");
	this.load.image("gro_32x32", "assets/gro_32x32.png");
	this.load.image("gro_128x32", "assets/gro_128x32.png");
	this.load.image("gro_256x32", "assets/gro_256x32.png");
	this.load.image("ball", "assets/y_ball_x1.png");
	this.load.image("card", "assets/y_card_x1.png");
	this.load.image("reimu", "assets/y_reimu_x1.png");
	this.load.image("marisa", "assets/y_marisa_x1.png");
	this.load.image("chiruno", "assets/y_chiruno_x1.png");
	this.load.image("youmu", "assets/y_youmu_x1.png");
	this.load.image("sanae", "assets/y_sanae_x1.png");
	// Load spriteSheet
	this.load.spritesheet("osho", "assets/d_osho_x1.png",
		{frameWidth: 32, frameHeight: 32});
	this.load.spritesheet("koboz", "assets/d_koboz_x1.png",
		{frameWidth: 32, frameHeight: 32});
	// Load audio
	this.load.audio("damage", ["sounds/damage.mp3"]);
	this.load.audio("hit", ["sounds/hit.mp3"]);
	this.load.audio("shot", ["sounds/shot.mp3"]);
}

function create(){
	console.log("create!!");

	// Background
	createBackground(this, 2, "sky", 0.1);
	createBackground(this, 3, "mountain", 0.5);

	// Sound
	sndDamage = this.sound.add("damage");
	sndHit = this.sound.add("hit");
	sndShot = this.sound.add("shot");

	// Text
	scoreNum = 0;
	scoreTxt = this.add.text(D_WIDTH/2, 32, "*", FONT).setFontSize(32).setOrigin(0.5);
	scoreTxt.setScrollFactor(0);// Fix
	scoreTxt.setText("SCORE:" + scoreNum);

	// Ground
	let staticGroup = this.physics.add.staticGroup();
	staticGroup.create(240, 320-16, "gro_256x32");
	staticGroup.create(120, 160, "gro_128x32");
	staticGroup.create(360, 200, "gro_32x32");

	// Player
	player = this.physics.add.sprite(D_WIDTH/2, D_HEIGHT/2, "osho");
	player.setGravityY(900);
	player.setBounce(0.1);
	player.body.offset.y = player.height*0.2;
	player.body.setSize(player.width*0.5, player.height*0.8);
	//player.setCollideWorldBounds(true);

	// Animation
	this.anims.create({
		key: "front", frameRate: 10, repeat: -1,
		frames: this.anims.generateFrameNumbers("osho", {start: 5, end: 8}),
	});
	this.anims.create({
		key: "left", frameRate: 10, repeat: -1,
		frames: this.anims.generateFrameNumbers("osho", {start: 10, end: 13}),
	});
	this.anims.create({
		key: "right", frameRate: 10, repeat: -1,
		frames: this.anims.generateFrameNumbers("osho", {start: 15, end: 18}),
	});
	player.anims.play("front", true);// Default

	// Balls
	balls = this.physics.add.group({
		key: "ball", repeat: 20,
		setXY: {x: 10, y: 0, stepX: 30}});

	balls.children.iterate((child)=>{
		child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
	});

	// Yukkuris
	yukkuris = this.physics.add.group();
	for(let i=0; i<10; i++){
		let x = Math.random() * D_WIDTH;
		let y = 0;
		let marisa = yukkuris.create(x, y, "marisa");
		marisa.setGravityY(900);
		marisa.setBounce(0.5);
		marisa.body.offset.y = marisa.height*0.2;
		marisa.body.setSize(marisa.width*0.5, marisa.height*0.8);
	}

	// Bounce: Player x StaticGroup
	this.physics.add.collider(player, staticGroup);
	// Bounce: Balls x StaticGroup
	this.physics.add.collider(balls, staticGroup);
	this.physics.add.collider(yukkuris, staticGroup);
	// Overwrap: Player x Balls
	this.physics.add.overlap(player, balls, overlap, null, this);

	// Bounds, Follow
	this.cameras.main.setBounds(0, 0, D_WIDTH*2, D_HEIGHT);
	this.cameras.main.startFollow(player);
}

function update(){

	// Cursors
	let cursors = this.input.keyboard.createCursorKeys();

	if(cursors.up.isDown){
		player.setVelocityY(-200);
	}else if(cursors.left.isDown){
		player.setVelocityX(-100);
		player.anims.play("left", true);
	}else if(cursors.right.isDown){
		player.setVelocityX(+100);
		player.anims.play("right", true);
	}else{
		player.setVelocityX(0);
		player.anims.play("front", true);
	}
}

function overlap(player, ball){
	ball.disableBody(true, true);// Remove
	sndShot.play();// Sound
	scoreNum += 100;// Score
	scoreTxt.setText("SCORE:" + scoreNum);
}

function createBackground(scene, cnt, texture, factor){
	let offX = 0;
	for(let i=0; i<cnt; i++){
		const img = scene.add.image(offX, scene.scale.height, texture)
					.setOrigin(0, 1).setScrollFactor(factor);
		offX += img.width;
	}
}
