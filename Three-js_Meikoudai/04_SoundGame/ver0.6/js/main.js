console.log("main.js!!");

function setScenery(){
	console.log("setScenery");
	let font = fontLoader.findFonts("MisakiGothic");

	// カメラコンテナ
	let cam = tm.getCameraContainer();
	// タイムライン
	let tl = new TimelineMax({repeat: -1, yoyo: false, onComplete:()=>{
		console.log("Comp!!");
	}});
	tl.to(cam.position, 3.0,
		{delay: 1.0, x: "+=5", y: "+=5", z: "+=5"});
	tl.to(cam.position, 1.0,
		{delay: 1.0, x: "-=5", y: "-=5", z: "-=5"});
	tl.to(cam.position, 1.0,
		{delay: 3.0, x: 20, y: 20, z: 20});
	tl.to(cam.position, 1.0,
		{delay: 3.0, x: 0, y: 0, z: 0});

	// スコア
	let scManager = new ScoreCounterManager(rootGroup, font);
	scManager.init(0, 5, 0, -45);

	// Trees
	let areaX = 30;
	let areaZ = 100;
	for(let i=0; i<50; i++){
		let x = Math.floor(Math.random() * areaX) - areaX*0.5;
		let z = Math.floor(Math.random() * areaZ) * -1.0;
		let scale = 0.1 + 0.1 * Math.random();
		let tree = objLoader.findModels("tree_1.obj", scale);
		tree.position.set(x, 0, z);
		tree.name = "tree_1";
		rootGroup.add(tree);
	}

	function test(){
		setTimeout(()=>{
			let num = Math.floor(Math.random() * 10000);
			scManager.setScore(num);
			test();
		}, 100);
	}
	test();
}

function onCollision(sensor, marker){
	sensor.jump();
	soundLoader.playSound(marker.sound, 0.2);// Sound
}