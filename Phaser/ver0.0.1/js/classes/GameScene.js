"use strict";

// GameScene
export default class GameScene extends Phaser.Scene{

	constructor(){
		super("game-scene");
		console.log("GameScene!!");

		console.log(this);
		this.player = undefined;
		this.balls = undefined;
	}

	preload(){
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
	}

	create(){
		console.log("create!!");
		// Background
		this.add.image(240, 160, "sky");

		// Ground
		let staticGroup = this.physics.add.staticGroup();
		staticGroup.create(240, 320-16, "gro_256x32");
		staticGroup.create(120, 160, "gro_128x32");
		staticGroup.create(360, 200, "gro_32x32");

		// Player
		this.player = this.physics.add.sprite(240, 0, "dude");
		this.player.setBounce(0.2);
		this.player.setCollideWorldBounds(true);

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
		this.player.anims.play("front", true);// Default

		// Balls
		this.balls = this.physics.add.group({
			key: "ball", repeat: 20,
			setXY: {x: 10, y: 0, stepX: 30}});

		this.balls.children.iterate((child)=>{
    		child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    	});

		// Bounce: Player x StaticGroup
		this.physics.add.collider(this.player, staticGroup);
		// Bounce: Balls x StaticGroup
		this.physics.add.collider(this.balls, staticGroup);
		// Overwrap: Player x Balls
		this.physics.add.overlap(this.player, this.balls, this.overlap, null, this);
	}

	update(){
		//console.log("update!!");

		// Controls
		let cursors = this.input.keyboard.createCursorKeys();

		if(cursors.up.isDown){
			this.player.setVelocityY(-200);
		}else if(cursors.left.isDown){
			this.player.setVelocityX(-100);
			this.player.anims.play("left", true);
		}else if(cursors.right.isDown){
			this.player.setVelocityX(+100);
			this.player.anims.play("right", true);
		}else{
			this.player.setVelocityX(0);
			this.player.anims.play("front", true);
		}
	}

	overlap(player, ball){
		ball.disableBody(true, true);
	}
}