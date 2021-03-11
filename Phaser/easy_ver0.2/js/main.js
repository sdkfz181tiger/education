"use strict";

const D_WIDTH  = 480;
const D_HEIGHT = 320;

let player, platform;

const config = {
	type: Phaser.AUTO,
	width: D_WIDTH, 
	height: D_HEIGHT,
	physics: {
		default: "arcade",
		arcade: {
			gravity: {y: 300},
			debug: true
		}
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	},
	fps: {
		target: 30,
		forceSetTimeOut: true
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
	this.load.image("chicken", "assets/c_chicken_x2.png");
	this.load.image("coin", "assets/c_coin_x3.png");
	this.load.image("koboz", "assets/c_koboz_x2.png");
	this.load.image("osho", "assets/c_osho_x2.png");
	this.load.image("tanu", "assets/c_tanu_x2.png");
	// Load spriteSheet
	this.load.spritesheet("s_osho", "assets/ss_osho_x2.png",
		{frameWidth: 32, frameHeight: 32});
	this.load.spritesheet("s_koboz", "assets/ss_koboz_x2.png",
		{frameWidth: 32, frameHeight: 32});
	// Load audio
	this.load.audio("damage", ["sounds/damage.mp3"]);
	this.load.audio("hit", ["sounds/hit.mp3"]);
	this.load.audio("shot", ["sounds/shot.mp3"]);
}

function create(){
	console.log("create!!");

	// Background
	// this.add.image(D_WIDTH/2, D_HEIGHT/2, "sky");
	// this.add.image(D_WIDTH/2, D_HEIGHT/2, "mountain");

	// Background
	createBackground(this, 2, "sky", 0.1);
	createBackground(this, 3, "mountain", 0.5);
	
	// Player
	player = this.physics.add.sprite(D_WIDTH/2, D_HEIGHT/2, "osho");
	player.setCollideWorldBounds(true);
	player.setBounce(0.0);
	player.setFriction(1, 1);
	player.body.offset.y = player.height*0.2;
	player.body.setSize(player.width*0.5, player.height*0.8);

	// Animation
	this.anims.create({
		key: "ukiuki", frameRate: 10, repeat: -1,
		frames: this.anims.generateFrameNumbers("s_osho", {start: 0, end: 4}),
	});
	player.anims.play("ukiuki", true);// Default

	// Platform
	platform = this.physics.add.image(D_WIDTH/2, D_HEIGHT/2+100, "gro_128x32");
	platform.setCollideWorldBounds(false);
	platform.setBounce(0.0);
	platform.setFriction(1, 1);
	platform.setImmovable(true);
	platform.setVelocityX(30);
	platform.body.allowGravity = false;

	// Ground
	let groundGroup = this.physics.add.staticGroup();
	groundGroup.create(520, 300, "gro_256x32");
	groundGroup.create(120, 160, "gro_128x32");
	groundGroup.create(360, 80, "gro_32x32");

	// Coins
	let coinGroup = this.physics.add.group();
	coinGroup.createMultiple({ key: "coin", repeat: 3, setXY: {x: D_WIDTH, y: 0, stepX: 30}});

	// Overlap
	this.physics.add.overlap(player, coinGroup, overlapCoin, null, this);

	this.physics.add.collider(player, platform);
	this.physics.add.collider(player, groundGroup);
	this.physics.add.collider(coinGroup, platform);
	this.physics.add.collider(coinGroup, groundGroup);

	// Bounds, Follow
	this.cameras.main.setBounds(0, 0, D_WIDTH*2, D_HEIGHT);
	this.cameras.main.startFollow(player);
}

function update(){

	// Platform
	if(D_WIDTH-D_WIDTH/4 < platform.x){
		platform.setVelocityX(-30);
	}
	if(platform.x < D_WIDTH/4){
		platform.setVelocityX(30);
	}

	// Cursors
	let cursors = this.input.keyboard.createCursorKeys();
	if(cursors.up.isDown){
		player.setVelocityY(-200);
	}else if(cursors.left.isDown){
		player.setVelocityX(-100);
	}else if(cursors.right.isDown){
		player.setVelocityX(+100);
	}else{
		player.setVelocityX(0);
	}
}

function overlapCoin(player, c){
	c.disableBody(true, true);
}

function createBackground(scene, cnt, texture, factor){
	let offX = 0;
	for(let i=0; i<cnt; i++){
		const img = scene.add.image(offX, scene.scale.height, texture)
					.setOrigin(0, 1).setScrollFactor(factor);
		offX += img.width;
	}
}