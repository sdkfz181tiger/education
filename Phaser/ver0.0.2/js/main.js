"use strict";

const D_WIDTH   = 480;
const D_HEIGHT  = 320;
const GRAVITY_X = 0;
const GRAVITY_Y = 200;
const M_GOTHIC  = {fontFamily: "MisakiGothic"};

let sndDamage, sndHit, sndShot;
let scoreNum, scoreTxt;
let player, balls;

const config = {
	type: Phaser.AUTO,
	width: D_WIDTH, 
	height: D_HEIGHT,
	physics: {
		default: "arcade",
		arcade: {gravity: {
			x: GRAVITY_X,
			y: GRAVITY_Y
		}}
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
	// Image
	this.load.image("sky", "assets/sky_480x320.png");
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
	// SpriteSheet
	this.load.spritesheet("dude", "assets/d_dude_x1.png",
		{frameWidth: 32, frameHeight: 48});
	// Audio
	this.load.audio("damage", ["sounds/damage.mp3"]);
	this.load.audio("hit", ["sounds/hit.mp3"]);
	this.load.audio("shot", ["sounds/shot.mp3"]);
}

function create(){
	console.log("create!!");

	// Background
	this.add.image(D_WIDTH/2, D_HEIGHT/2, "sky");

	// Sound
	sndDamage = this.sound.add("damage");
	sndHit = this.sound.add("hit");
	sndShot = this.sound.add("shot");

	// Text
	scoreNum = 0;
	scoreTxt = this.add.text(D_WIDTH/2, 32, "TEST", M_GOTHIC).setFontSize(32).setOrigin(0.5);
	scoreTxt.setText("SCORE:" + scoreNum);

	// Ground
	let staticGroup = this.physics.add.staticGroup();
	staticGroup.create(240, 320-16, "gro_256x32");
	staticGroup.create(120, 160, "gro_128x32");
	staticGroup.create(360, 200, "gro_32x32");

	// Player
	player = this.physics.add.sprite(D_WIDTH/2, D_HEIGHT/2, "dude");
	player.setBounce(0.2);
	player.setCollideWorldBounds(true);

	// Animation
	this.anims.create({
		key: "front", frameRate: 10, repeat: -1,
		frames: [{ key: "dude", frame: 4}],
	});
	this.anims.create({
		key: "left", frameRate: 10, repeat: -1,
		frames: this.anims.generateFrameNumbers("dude", {start: 0, end: 3}),
	});
	this.anims.create({
		key: "right", frameRate: 10, repeat: -1,
		frames: this.anims.generateFrameNumbers("dude", {start: 5, end: 8}),
	});
	player.anims.play("front", true);// Default

	// Balls
	balls = this.physics.add.group({
		key: "ball", repeat: 20,
		setXY: {x: 10, y: 0, stepX: 30}});

	balls.children.iterate((child)=>{
		child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
	});

	// Bounce: Player x StaticGroup
	this.physics.add.collider(player, staticGroup);
	// Bounce: Balls x StaticGroup
	this.physics.add.collider(balls, staticGroup);
	// Overwrap: Player x Balls
	this.physics.add.overlap(player, balls, overlap, null, this);
}

function update(){

	// Controls
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
