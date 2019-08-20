
//==========
// トゥイーンアニメーションライブラリ
// TimelineMax
// 	https://greensock.com/docs/TimelineMax

var house_gole = null;

//==========
// 背景に配置
function setSceneryRoot1(){
	let group = rootGroup;

 //    var length = 50;
	// for (var i = 0 ;i < 10; i++) {
	// 	let obj1 = objLoader.findModels("ground.obj", 1.0);
	//     obj1.position.set(0, -10, -i*length);// 座標をセット
	//     group.add(obj1);// 背景に追加
	// }


	// "rootGroup(背景)"に配置する
}

//==========
// 譜面に配置
function setSceneryNote1(){
	let group = noteGroup;

    //[発表会用] 微調整
	// "noteGroup(譜面)"に配置する
	const length = 50; //サイズ
	const count  = 50; //配置枚数
	const offset_y = -4;

	for (var i = 0 ;i < count; i++) {
		for(var j = 0; j <3; j++){
            
		    let obj1 = objLoader.findModels("ground.obj", 1.0);
	        obj1.position.set((j-1)*length, offset_y, -i*length);// 座標をセット
	        group.add(obj1);// 背景に追加
	    }
	}


    //[発表会用] 微調整
    //ゴールの配置
	let obj1 = objLoader.findModels("house_gole.obj", 1.0);
	obj1.position.set(0, 0, -2255);// 座標をセット
	obj1.scale.set(10, 10, 10);
	group.add(obj1);// 背景に追加

    //グローバル変数にセット
    house_gole = obj1;

/* ... このアニメーションは配置した時だけなので main_programmer.js の OnEnd で処理
    //ゴールした頃に回転
	let tl1 = createTimeline(0, false, ()=>{
		for (let i = 0; i < sensors.length; i++) {
			let sensor = sensors[i];
			let tl = createTimeline(0, false, null);
			tl.to(sensor.getGroup().rotation, 2.0, {delay: 0.5, x: "+=0", y: "-="+(3.14 * 5), z: "+=0"})
		}
	});
	tl1.to(obj1.rotation, 1.0, {delay: 30.0, x: "+=0", y: "-="+(3.14/2), z: "+=0"});
/**/

	let obj2 = objLoader.findModels("buill.obj", 1.0);
	obj2.position.set(-30, 0, -2300);// 座標をセット
	obj2.scale.set(7, 7, 7);
	obj2.rotation.set(0, -3.14, 0);
	group.add(obj2);// 背景に追加

	let obj3 = objLoader.findModels("buill.obj", 1.0);
	obj3.position.set(+30, 0, -2300);// 座標をセット
	obj3.scale.set(7, 7, 7);
	obj3.rotation.set(0, -3.14, 0);
	group.add(obj3);// 背景に追加
}
