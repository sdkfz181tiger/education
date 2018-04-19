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
	cheff.scale = 0.8;
	cheff.mass = 50;
	cheff.immovable = true;
	return cheff;
}

function createBullet(x, y, speed, deg){
	let bullet = createSprite(x, y, 3, 3);
	bullet.shapeColor = "#ffffff";
	bullet.scale = 1.0;
	bullet.mass = 1;
	bullet.setSpeed(speed, deg);
	return bullet;
}

function createPig(x, y, speed, deg){
	let pig = createSprite(x, y, 20, 20);
	pig.addAnimation("run",
		"assets/c_pig_run_0.png", "assets/c_pig_run_1.png",
		"assets/c_pig_run_2.png", "assets/c_pig_run_3.png",
		"assets/c_pig_run_4.png", "assets/c_pig_run_5.png");
	pig.changeAnimation("run");
	pig.scale = 0.5 + 0.2 * Math.random();
	pig.mass = 5 * Math.random();
	pig.setSpeed(speed, deg);
	if(Math.random() < 0.5) pig.mirrorX(-1);
	return pig;
}

function createWall(x, y, w, h){
	let wall = createSprite(x, y, w, h);
	wall.immovable = true;
	return wall;
}
