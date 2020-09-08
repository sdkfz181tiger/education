console.log("Hello utility.js!!");

//==========
// Utility(main)

function createCheff(x, y){
	let cheff = createSprite(x, y, 20, 20);
	cheff.addAnimation("run",
		"assets/c_cheff_run_0.png", "assets/c_cheff_run_1.png",
		"assets/c_cheff_run_2.png", "assets/c_cheff_run_3.png",
		"assets/c_cheff_run_4.png", "assets/c_cheff_run_5.png");
	cheff.changeAnimation("run");
	cheff.scale = 0.5;
	let swing = random(-20, 20);
	cheff.setSpeed(5, 90 + swing);
	return cheff;
}

function createPig(x, y){
	let pig = createSprite(x, y, 20, 20);
	pig.addAnimation("run",
		"assets/c_pig_run_0.png", "assets/c_pig_run_1.png",
		"assets/c_pig_run_2.png", "assets/c_pig_run_3.png",
		"assets/c_pig_run_4.png", "assets/c_pig_run_5.png");
	pig.changeAnimation("run");
	pig.immovable = true;
	pig.scale = 1.0 + 0.2 * Math.random();
	if(Math.random() < 0.5) pig.mirrorX(-1);
	return pig;
}

function createWall(x, y, w, h){
	let wall = createSprite(x, y, w, h);
	wall.immovable = true;
	return wall;
}
