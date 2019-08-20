
//==========
// トゥイーンアニメーションライブラリ
// TimelineMax
// 	https://greensock.com/docs/TimelineMax

//==========
// 背景に配置
function setSceneryRoot2(){
	let group = rootGroup;

	// "rootGroup(背景)"に配置する
}

//==========
// 譜面に配置
function setSceneryNote2(){
	let group = noteGroup;

	// "noteGroup(譜面)"に配置する

	// "rootGroup(背景)"に配置する
	let obj1 = objLoader.findModels("odennnoyatai.obj", 1.0);
	obj1.position.set(0, 0, -5820);// 座標をセット
	group.add(obj1);// 背景に追加
}