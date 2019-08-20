
//==========
// トゥイーンアニメーションライブラリ
// TimelineMax
// 	https://greensock.com/docs/TimelineMax

//==========
// 背景に配置
function setSceneryRoot1(){
	let group = rootGroup;

	// "rootGroup(背景)"に配置する
	let liquor_obj1 = objLoader.findModels("liquor.obj", 1.0);
	liquor_obj1.position.set(-20, 0, -10);// 座標をセット
	liquor_obj1.rotation.y = 3.14 / 2;// 角度をセット
	group.add(liquor_obj1);// 背景に追加

	// "rootGroup(背景)"に配置する
	let liquor_obj2 = objLoader.findModels("liquor.obj", 1.0);
	liquor_obj2.position.set(-20, 0, 0);// 座標をセット
	liquor_obj2.rotation.y = 3.14 / 2;// 角度をセット
	group.add(liquor_obj2);// 背景に追加
	
	// 動き
	let liquor_tl1 = createTimeline(-1, false, null);

	// tag1
	liquor_tl1.add("tag1");
	liquor_tl1.to(liquor_obj1.position, 1.0, {delay: 0.0, x: "+=0", y: "+=0", z: "+=5"}, "tag1");// 相対位置
	liquor_tl1.to(liquor_obj1.rotation, 1.0, {delay: 0.0, x: "+=0", y: "-=1.57", z: "+=0"}, "tag1");// 相対位置

	// tag2
	liquor_tl1.add("tag2");
	liquor_tl1.to(liquor_obj1.position, 1.0, {delay: 0.0, x: "+=0", y: "+=0", z: "-=5"}, "tag2");// 相対位置
	liquor_tl1.to(liquor_obj1.rotation, 1.0, {delay: 0.0, x: "+=0", y: "+=1.57", z: "+=0"}, "tag2");

	// tag3
	liquor_tl1.add("tag3");
	liquor_tl1.to(liquor_obj1.position, 1.0, {delay: 0.0, x: "+=0", y: "+=0", z: "-=5"}, "tag3");// 相対位置
	liquor_tl1.to(liquor_obj1.rotation, 1.0, {delay: 0.0, x: "+=0", y: "+=1.57", z: "+=0"}, "tag3");// 相対位置

	// tag4
	liquor_tl1.add("tag4");
	liquor_tl1.to(liquor_obj1.position, 1.0, {delay: 0.0, x: "+=0", y: "+=0", z: "+=5"}, "tag4");// 相対位置
	liquor_tl1.to(liquor_obj1.rotation, 1.0, {delay: 0.0, x: "+=0", y: "-=1.57", z: "+=0"}, "tag4");


	// 動き
	let liquor_tl2 = createTimeline(-1, false, null);

	// tag1
	liquor_tl2.add("tag1");
	liquor_tl2.to(liquor_obj2.position, 1.0, {delay: 0.0, x: "+=0", y: "+=0", z: "+=5"}, "tag1");// 相対位置
	liquor_tl2.to(liquor_obj2.rotation, 1.0, {delay: 0.0, x: "+=0", y: "-=1.57", z: "+=0"}, "tag1");// 相対位置

	// tag2
	liquor_tl2.add("tag2");
	liquor_tl2.to(liquor_obj2.position, 1.0, {delay: 0.0, x: "+=0", y: "+=0", z: "-=5"}, "tag2");// 相対位置
	liquor_tl2.to(liquor_obj2.rotation, 1.0, {delay: 0.0, x: "+=0", y: "+=1.57", z: "+=0"}, "tag2");

	// tag3
	liquor_tl2.add("tag3");
	liquor_tl2.to(liquor_obj2.position, 1.0, {delay: 0.0, x: "+=0", y: "+=0", z: "-=5"}, "tag3");// 相対位置
	liquor_tl2.to(liquor_obj2.rotation, 1.0, {delay: 0.0, x: "+=0", y: "+=1.57", z: "+=0"}, "tag3");// 相対位置

	// tag4
	liquor_tl2.add("tag4");
	liquor_tl2.to(liquor_obj2.position, 1.0, {delay: 0.0, x: "+=0", y: "+=0", z: "+=5"}, "tag4");// 相対位置
	liquor_tl2.to(liquor_obj2.rotation, 1.0, {delay: 0.0, x: "+=0", y: "-=1.57", z: "+=0"}, "tag4");


	// "rootGroup(背景)"に配置する
	let liquor_obj3 = objLoader.findModels("liquor.obj", 1.0);
	liquor_obj3.position.set(20, 0, -10);// 座標をセット
	liquor_obj3.rotation.y = -3.14 / 2;// 角度をセット
	group.add(liquor_obj3);// 背景に追加

	// "rootGroup(背景)"に配置する
	let liquor_obj4 = objLoader.findModels("liquor.obj", 1.0);
	liquor_obj4.position.set(20, 0, 0);// 座標をセット
	liquor_obj4.rotation.y = -3.14 / 2;// 角度をセット
	group.add(liquor_obj4);// 背景に追加
	
		
	// 動き
	let liquor_tl3 = createTimeline(-1, false, null);

	// tag1
	liquor_tl3.add("tag1");
	liquor_tl3.to(liquor_obj3.position, 1.0, {delay: 0.0, x: "+=0", y: "+=0", z: "+=5"}, "tag1");// 相対位置
	liquor_tl3.to(liquor_obj3.rotation, 1.0, {delay: 0.0, x: "+=0", y: "+=1.57", z: "+=0"}, "tag1");// 相対位置

	// tag2
	liquor_tl3.add("tag2");
	liquor_tl3.to(liquor_obj3.position, 1.0, {delay: 0.0, x: "+=0", y: "+=0", z: "-=5"}, "tag2");// 相対位置
	liquor_tl3.to(liquor_obj3.rotation, 1.0, {delay: 0.0, x: "+=0", y: "-=1.57", z: "+=0"}, "tag2");

	// tag3
	liquor_tl3.add("tag3");
	liquor_tl3.to(liquor_obj3.position, 1.0, {delay: 0.0, x: "+=0", y: "+=0", z: "-=5"}, "tag3");// 相対位置
	liquor_tl3.to(liquor_obj3.rotation, 1.0, {delay: 0.0, x: "+=0", y: "-=1.57", z: "+=0"}, "tag3");// 相対位置

	// tag4
	liquor_tl3.add("tag4");
	liquor_tl3.to(liquor_obj3.position, 1.0, {delay: 0.0, x: "+=0", y: "+=0", z: "+=5"}, "tag4");// 相対位置
	liquor_tl3.to(liquor_obj3.rotation, 1.0, {delay: 0.0, x: "+=0", y: "+=1.57", z: "+=0"}, "tag4");


	// 動き
	let liquor_tl4 = createTimeline(-1, false, null);

	// tag1
	liquor_tl4.add("tag1");
	liquor_tl4.to(liquor_obj4.position, 1.0, {delay: 0.0, x: "+=0", y: "+=0", z: "+=5"}, "tag1");// 相対位置
	liquor_tl4.to(liquor_obj4.rotation, 1.0, {delay: 0.0, x: "+=0", y: "+=1.57", z: "+=0"}, "tag1");// 相対位置

	// tag2
	liquor_tl4.add("tag2");
	liquor_tl4.to(liquor_obj4.position, 1.0, {delay: 0.0, x: "+=0", y: "+=0", z: "-=5"}, "tag2");// 相対位置
	liquor_tl4.to(liquor_obj4.rotation, 1.0, {delay: 0.0, x: "+=0", y: "-=1.57", z: "+=0"}, "tag2");

	// tag3
	liquor_tl4.add("tag3");
	liquor_tl4.to(liquor_obj4.position, 1.0, {delay: 0.0, x: "+=0", y: "+=0", z: "-=5"}, "tag3");// 相対位置
	liquor_tl4.to(liquor_obj4.rotation, 1.0, {delay: 0.0, x: "+=0", y: "-=1.57", z: "+=0"}, "tag3");// 相対位置

	// tag4
	liquor_tl4.add("tag4");
	liquor_tl4.to(liquor_obj4.position, 1.0, {delay: 0.0, x: "+=0", y: "+=0", z: "+=5"}, "tag4");// 相対位置
	liquor_tl4.to(liquor_obj4.rotation, 1.0, {delay: 0.0, x: "+=0", y: "+=1.57", z: "+=0"}, "tag4");


	// "rootGroup(背景)"に配置する
	let liquor_obj5 = objLoader.findModels("liquor.obj", 1.0);
	liquor_obj5.position.set(-20, 0, -20);// 座標をセット
	liquor_obj5.rotation.y = 3.14 / 2;// 角度をセット
	group.add(liquor_obj5);// 背景に追加


	// 動き
	let liquor_tl5 = createTimeline(-1, false, null);

	// tag1
	liquor_tl5.add("tag1");
	liquor_tl5.to(liquor_obj5.position, 1.0, {delay: 0.0, x: "+=0", y: "+=0", z: "+=5"}, "tag1");// 相対位置
	liquor_tl5.to(liquor_obj5.rotation, 1.0, {delay: 0.0, x: "+=0", y: "-=1.57", z: "+=0"}, "tag1");// 相対位置

	// tag2
	liquor_tl5.add("tag2");
	liquor_tl5.to(liquor_obj5.position, 1.0, {delay: 0.0, x: "+=0", y: "+=0", z: "-=5"}, "tag2");// 相対位置
	liquor_tl5.to(liquor_obj5.rotation, 1.0, {delay: 0.0, x: "+=0", y: "+=1.57", z: "+=0"}, "tag2");

	// tag3
	liquor_tl5.add("tag3");
	liquor_tl5.to(liquor_obj5.position, 1.0, {delay: 0.0, x: "+=0", y: "+=0", z: "-=5"}, "tag3");// 相対位置
	liquor_tl5.to(liquor_obj5.rotation, 1.0, {delay: 0.0, x: "+=0", y: "+=1.57", z: "+=0"}, "tag3");// 相対位置

	// tag4
	liquor_tl5.add("tag4");
	liquor_tl5.to(liquor_obj5.position, 1.0, {delay: 0.0, x: "+=0", y: "+=0", z: "+=5"}, "tag4");// 相対位置
	liquor_tl5.to(liquor_obj5.rotation, 1.0, {delay: 0.0, x: "+=0", y: "-=1.57", z: "+=0"}, "tag4");


	// "rootGroup(背景)"に配置する
	let liquor_obj6 = objLoader.findModels("liquor.obj", 1.0);
	liquor_obj6.position.set(20, 0, -20);// 座標をセット
	liquor_obj6.rotation.y = -3.14 / 2;// 角度をセット
	group.add(liquor_obj6);// 背景に追加
	
		
	// 動き
	let liquor_tl6 = createTimeline(-1, false, null);

	// tag1
	liquor_tl6.add("tag1");
	liquor_tl6.to(liquor_obj6.position, 1.0, {delay: 0.0, x: "+=0", y: "+=0", z: "+=5"}, "tag1");// 相対位置
	liquor_tl6.to(liquor_obj6.rotation, 1.0, {delay: 0.0, x: "+=0", y: "+=1.57", z: "+=0"}, "tag1");// 相対位置

	// tag2
	liquor_tl6.add("tag2");
	liquor_tl6.to(liquor_obj6.position, 1.0, {delay: 0.0, x: "+=0", y: "+=0", z: "-=5"}, "tag2");// 相対位置
	liquor_tl6.to(liquor_obj6.rotation, 1.0, {delay: 0.0, x: "+=0", y: "-=1.57", z: "+=0"}, "tag2");

	// tag3
	liquor_tl6.add("tag3");
	liquor_tl6.to(liquor_obj6.position, 1.0, {delay: 0.0, x: "+=0", y: "+=0", z: "-=5"}, "tag3");// 相対位置
	liquor_tl6.to(liquor_obj6.rotation, 1.0, {delay: 0.0, x: "+=0", y: "-=1.57", z: "+=0"}, "tag3");// 相対位置

	// tag4
	liquor_tl6.add("tag4");
	liquor_tl6.to(liquor_obj6.position, 1.0, {delay: 0.0, x: "+=0", y: "+=0", z: "+=5"}, "tag4");// 相対位置
	liquor_tl6.to(liquor_obj6.rotation, 1.0, {delay: 0.0, x: "+=0", y: "+=1.57", z: "+=0"}, "tag4");
}

//==========
// 譜面に配置
function setSceneryNote1(){
	let group = noteGroup;

	// "noteGroup(譜面)"に配置する
}