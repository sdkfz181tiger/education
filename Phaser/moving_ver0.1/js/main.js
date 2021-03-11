"use strict";

const D_WIDTH  = 480;
const D_HEIGHT = 320;

let platform, coins;

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

	platform = this.physics.add.image(D_WIDTH/2, D_HEIGHT/2, "gro_256x32");
	platform.body.allowGravity = false;
	platform.setFrictionX(1);
	platform.setImmovable(true);
	platform.setVelocityX(10);

	coins = this.physics.add.group();
	coins.createMultiple({ key: "coin", repeat: 3, setXY: {x: D_WIDTH/2, y: 0, stepX: 30}});

	this.physics.add.collider(platform, coins);
}

function update(){

	if(D_WIDTH-D_WIDTH/4 < platform.x){
		platform.setVelocityX(-20);
	}
	if(platform.x < D_WIDTH/4){
		platform.setVelocityX(20);
	}
}

function createBackground(scene, cnt, texture, factor){
	let offX = 0;
	for(let i=0; i<cnt; i++){
		const img = scene.add.image(offX, scene.scale.height, texture)
					.setOrigin(0, 1).setScrollFactor(factor);
		offX += img.width;
	}
}
