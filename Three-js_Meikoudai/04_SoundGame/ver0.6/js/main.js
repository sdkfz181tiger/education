console.log("main.js!!");

function setScenery(){
	console.log("setScenery");
	let font = fontLoader.findFonts("MisakiGothic");

	// ScoreCounterManager
	let scManager = new ScoreCounterManager(font);
	let sCounter = scManager.init(0, 5, 0, -45);
	rootGroup.add(sCounter);

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