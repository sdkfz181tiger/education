"use strict";

const D_WIDTH  = 480;
const D_HEIGHT = 320;

let player, balls;

const config = {
	type: Phaser.AUTO,
	width: D_WIDTH, 
	height: D_HEIGHT,
	physics: {
		default: "arcade",
		arcade: {
			debug: false,
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
	createBackground(this, 2, "sky", 0.1);
	createBackground(this, 3, "mountain", 0.5);

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
	player.setCollideWorldBounds(true);

	// Balls
	balls = this.physics.add.group({
		key: "coin", repeat: 20,
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

	// Bounds, Follow
	//this.cameras.main.setBounds(0, 0, D_WIDTH*2, D_HEIGHT);
	//this.cameras.main.startFollow(player);
}

function update(){

	// Cursors
	let cursors = this.input.keyboard.createCursorKeys();

	if(cursors.up.isDown){
		player.setVelocityY(-200);
	}else if(cursors.left.isDown){
		player.setVelocityX(-100);
		//player.anims.play("left", true);
	}else if(cursors.right.isDown){
		player.setVelocityX(+100);
		//player.anims.play("right", true);
	}else{
		player.setVelocityX(0);
		//player.anims.play("front", true);
	}
}

function overlap(player, ball){
	ball.disableBody(true, true);// Remove
}

function createBackground(scene, cnt, texture, factor){
	let offX = 0;
	for(let i=0; i<cnt; i++){
		const img = scene.add.image(offX, scene.scale.height, texture)
					.setOrigin(0, 1).setScrollFactor(factor);
		offX += img.width;
	}
}
