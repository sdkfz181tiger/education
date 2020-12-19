"use strict";

import GameScene from "./classes/GameScene.js";

const D_WIDTH   = 480;
const D_HEIGHT  = 320;
const GRAVITY_X = 0;
const GRAVITY_Y = 200;

const config = {
	type: Phaser.AUTO,
	width: D_WIDTH,
	height: D_HEIGHT,
	physics: {
		default: "arcade",
		arcade: {
			gravity: {x: GRAVITY_X ,y: GRAVITY_Y}
		}
	},
	scene: [GameScene]
}

let phaser = new Phaser.Game(config);