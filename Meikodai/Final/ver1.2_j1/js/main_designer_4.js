
//==========
// トゥイーンアニメーションライブラリ
// TimelineMax
// 	https://greensock.com/docs/TimelineMax

//==========
// 背景に配置
function setSceneryRoot4(){
	let group = rootGroup;

	//[発表会用] 微調整
	// 動く背景に配置
}

//==========
// 譜面に配置
function setSceneryNote4(){
	let group = noteGroup;

	// 譜面に追加
	let obj1 = objLoader.findModels("juice.obj", 1.0);
	obj1.position.set(20, 0, -30);// 座標をセット
	group.add(obj1);

    //[発表会用] 微調整
    // 以下、背景から動く背景に配置

	let obj2 = objLoader.findModels("kusa.obj", 1.0);
	obj2.position.set(46, 0, -65);// 座標をセット
	group.add(obj2); 

	let obj3 = objLoader.findModels("kusa.obj", 1.0);
	obj3.position.set(-30, 0, -60);// 座標をセット
	group.add(obj3);

	let obj4 = objLoader.findModels("kusa.obj", 1.0);
	obj4.position.set(-40, 0, -35);// 座標をセット
	group.add(obj4); 

	let obj5 = objLoader.findModels("kusa.obj", 1.0);
	obj5.position.set(-20, 0, -80);// 座標をセット
	group.add(obj5);

	let obj6 = objLoader.findModels("kusa.obj", 1.0);
	obj6.position.set(-50, 0, -70);// 座標をセット
	group.add(obj6);

	let obj7 = objLoader.findModels("kusa.obj", 1.0);
	obj7.position.set(35, 0, -80);// 座標をセット
	group.add(obj7);

	let obj8 = objLoader.findModels("kusa.obj", 1.0);
	obj8.position.set(45, 0, -45);// 座標をセット
	group.add(obj8);

	let obj9 = objLoader.findModels("kusa.obj", 1.0);
	obj9.position.set(50, 0, -30);// 座標をセット
	group.add(obj9);


	//[発表会用] 微調整(ゴール付近にも追加)
    for (let i = 0; i < 30; i++) {
    	let x = getRandom(-12, 12) * 5;
    	let z = -2350 - getRandom(-5, 5) * 5;

		let obj10 = objLoader.findModels("kusa.obj", 1.0);
		obj10.position.set(x, 0, z);// 座標をセット
		group.add(obj10);
	}
}
