
//==========
// トゥイーンアニメーションライブラリ
// TimelineMax
// 	https://greensock.com/docs/TimelineMax

//==========
// 背景に配置
function setSceneryRoot3(){
	let group = rootGroup;

    //[発表会用] 微調整
	// // "rootGroup(背景)"に配置する
	// let obj1 = objLoader.findModels("huwaif.obj", 1.0);
	// obj1.position.set(-30, -10, -30);// 座標をセット
	// group.add(obj1);// 背景に追加
}

//==========
// 譜面に配置
function setSceneryNote3(){
	let group = noteGroup;

	// "noteGroup(譜面)"に配置する

	let obj1 = objLoader.findModels("Diamondsword.obj", 1.0);
	obj1.position.set(30, 0, -30);// 座標をセット
	group.add(obj1);// 背景に追加

	let tl1 = createTimeline(-1, false, null);
	tl1.to(obj1.rotation, 1.0, {delay: 0.0, x: "+=0", y: "-=3.14", z: "+=0"});
	tl1.to(obj1.rotation, 1.0, {delay: 0.0, x: "+=0", y: "-=3.14", z: "+=0"});


    //[発表会用] 微調整
	let obj2 = objLoader.findModels("hanabi.obj", 1.0);
	obj2.position.set(30, 50, -2300);// 座標をセット
	group.add(obj2);// 背景に追加
}
