console.log("main.js!!");

function setScenery(){
	console.log("setScenery");
	let font = fontLoader.findFonts("MisakiGothic");

	// カメラコンテナ
	let cam = tm.getCameraContainer();
	// アニメーションオブジェクト(繰り返し, ヨーヨー, 終了時関数)
	let tl = createTimeline(-1, false, null);
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

function onPlay(){
	console.log("onPlay");
}

function onEnd(){
	console.log("onEnd");

	// ゲームオーバーロゴ
	let logo = objLoader.findModels("tree_1.obj", 1.0);
	logo.position.set(0, 5, 0);
	logo.name = "game_over";
	rootGroup.add(logo);

	// アニメーションオブジェクト(繰り返し, ヨーヨー, 終了時関数)
	let tl = createTimeline(0, false, ()=>{
		// アニメーション終了時
		soundLoader.playSound("tap.mp3", 1.0);// Sound
	});
	// "logo"オブジェクトを3.0秒の時間をかけて、1.0秒後に0, 0, 0の座標に移動する
	tl.to(logo.position, 3.0,
		{delay: 1.0, x: 0, y: 0, z: 0});
}

function onCollision(sensor, marker){
	sensor.jump();
	soundLoader.playSound(marker.sound, 0.2);// Sound
}

function createTimeline(repeat=0, yoyo=false, onComplete=null){
	let tl = new TimelineMax({repeat: 0, yoyo: false, onComplete:onComplete});
	return tl;
}