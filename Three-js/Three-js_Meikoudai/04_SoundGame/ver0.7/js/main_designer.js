console.log("main.js!!");

// 背景の準備
function setScenery(){
	console.log("setScenery");

	// "rootGroup(背景)"に配置する
	let obj1 = objLoader.findModels("8x8x8.obj", 1.0);
	obj1.position.set(0, 0, -30);// 座標をセット
	rootGroup.add(obj1);// 背景に追加

	// "noteGroup(譜面)"に配置する
	let obj2 = objLoader.findModels("8x8x8.obj", 1.0);
	obj2.position.set(0, 5, -30);// 座標をセット
	noteGroup.add(obj2);// 譜面に追加
}

