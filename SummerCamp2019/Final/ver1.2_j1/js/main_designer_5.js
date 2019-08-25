
//==========
// トゥイーンアニメーションライブラリ
// TimelineMax
// 	https://greensock.com/docs/TimelineMax

//==========
// 背景に配置
function setSceneryRoot5(){
	let group = rootGroup;

	// "rootGroup(背景)"に配置する

    //[発表会用] 微調整
    // 動く背景に配置
}

//==========
// 譜面に配置
function setSceneryNote5(){
	let group = noteGroup;

	// "noteGroup(譜面)"に配置する
	let obj1 = objLoader.findModels("sannzu.obj", 1.0);
	obj1.position.set(-50, 0, -30);// 座標をセット
	group.add(obj1);// 背景に追加

	let tl1 = createTimeline(-1, false, null);
	tl1.to(obj1.rotation, 1.0, {delay: 0.0, x: "+=0", y: "+=3.14", z: "+=0"});
	tl1.to(obj1.rotation, 1.0, {delay: 0.0, x: "+=0", y: "+=3.14", z: "+=0"});
}