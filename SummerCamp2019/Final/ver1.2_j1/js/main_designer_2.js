
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

    //[発表会用] 微調整
    let loop_start = 0;   //ループ開始
    let loop_end   = 45;  //ループ終了
    let offset_y   = 0;  //微調整

	for (let i = loop_start; i <= loop_end; i++) {
		let obj1 = objLoader.findModels("ki.obj", 1.0);
	    obj1.position.set(-50, offset_y, -i * 50);// 座標をセット
	    group.add(obj1);// 背景に追加

	    let obj2 = objLoader.findModels("ki.obj", 1.0);
	    obj2.position.set(50, offset_y, -i * 50);// 座標をセット
	    group.add(obj2);// 背景に追加
	}
}