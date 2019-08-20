console.log("main.js!!");

let font     = null;// フォント
let cam      = null;// カメラコンテナ
let combo    = 0;   // コンボ
let score    = 0;   // スコア
let gero     = 0;
let points   = [];  // 各ノートのスコア

let comboMng = null;// コンボマネージャー
let scoreMng = null;// スコアマネージャー
let pointMng = null;// ポイントマネージャー

let comboChecker = [2, 4, 6, 8];        // コンボ判定タイミング
let scoreChecker = [100, 200, 300, 400];// スコア判定タイミング

//==========
// TimelineMaxライブラリを使ってオブジェクトを動かそう
//     https://greensock.com/docs/TimelineMax
//     https://www.webprofessional.jp/greensock-beginners-part-2-gsaps-timeline/

// カメラ、ステータス
function setStats(){
	// フォント, カメラ
	font = fontLoader.findFonts("MisakiGothic");
	cam = tm.getCameraContainer();

	combo  = 0; // リセット(コンボ)
	score  = 0; // リセット(スコア)
	points = [];// リセット(ポイント)
	for(let i=0; i<noteData.length; i++) points.push(0);

	// コンボマネージャー(サイズ, 間隔, 最大桁数)
	comboMng = new CounterManager(rootGroup, font, 2, 2, 2);
	comboMng.init(-5, 3, 8, -45);// x, y, z, x軸角度
	comboMng.setNum(combo);// コンボ表示

	// スコアマネージャー(サイズ, 間隔, 最大桁数)
	scoreMng = new CounterManager(rootGroup, font, 2, 2, 4);
	scoreMng.init(+5, 3, 8, -45);// x, y, z, x軸角度
	scoreMng.setNum(score);// スコア表示

	// ポイントマネージャー
	pointMng = new PointManager();
	pointMng.init();
	pointMng.setNum(points);

    setGeroParam(""+gero);

	//==========
	// TODO1: カメラワーク

	// アニメーションオブジェクト(繰り返し"ループは-1", ヨーヨー, 終了時関数)
	let tl = createTimeline(-1, false, null);
	// 左右にユラユラ
	// tl.to(cam.position, 2.0, {delay: 0.0, x: "+=5"});// 相対位置
	// tl.to(cam.position, 2.0, {delay: 0.0, x: "-=5"});
	// tl.to(cam.position, 2.0, {delay: 0.0, x: "-=5"});// 相対位置
	// tl.to(cam.position, 2.0, {delay: 0.0, x: "+=5"});

	//木目調
	let mokume = objLoader.findModels("mokume.obj", 2.0);
	mokume.position.set( -1, 0, -500);
	mokume.scale.z = 1000;
	mokume.scale.x = 15;
	noteGroup.add(mokume);

	let mokume2 = objLoader.findModels("mokume.obj", 2.0);
	mokume2.position.set( -1, 0, -8000);
	mokume2.scale.z = 1000;
	mokume2.scale.x = 15;
	noteGroup.add(mokume2);
}

// 音楽再生時
function onSeek(){
	console.log("onSeek");
}

// ミス!!
function onMissed(sensor, marker){
	// コンボ(リセット)
	combo = 0;
	comboMng.setNum(combo);// スコア表示
}

// ヒット!!
function onHit(sensor, s, marker, m){

	//==========
	// TODO2: ヒット

	// センサーとマーカーの反応
	let distance = noteGroup.position.z + marker.position.z;
	console.log("ヒット距離:" + distance);

	let x = sensor.position.x;
	let y = sensor.position.y;
	let z = sensor.position.z;

	// 当たり判定をする -> Great!!, Good!!, Bad...
	if(distance < 0.1){
		showPopup(x, y, z, "umai.obj" , Math.PI/-2);// Great!! 

		gero = gero -2 >= -2 ? gero -2 :-2;
    setGeroParam(""+gero);	   
	}else if(distance < 0.2){
		showPopup(x, y, z, "maamaa.obj",0); // Good!!
	}else{
		showPopup(x, y, z, "mazui.obj",0);  // Bad...
		gero += 10;
		if(gero >= 10) {
			let tl2 = createTimeline(0, false, null);
            tl2.to(cam.position, 2.0, {delay: 0.2, x: 0, y: "-=10", z: "-=10"});
	    	tl2.to(cam.rotation, 2.0, {delay: 0.2 ,y: "+=3.14"});
	    	tl2.to(cam.position, 2.0, {delay: 0, x: "+=0", y: "+=3" ,z: "+=10"});
	    	tl2.add(()=>{
	    		geroAction();
	    	});
		}
    	setGeroParam(""+gero);
	}

	// げろあくしょん
	function geroAction(){

		sensors[0].hide();
		sensors[1].hide();
		sensors[2].hide();

		// 屋台
		let obj0 = objLoader.findModels("odennnoyatai.obj", 0.5);
		obj0.position.set(0, 20, 0);// 座標をセット
		rootGroup.add(obj0);// 背景に追加

		let tl0 = createTimeline(0, false, null);
        tl0.to(obj0.position, 1.0, {delay: 0, y: "-=20"});

        // げろさん1
        let gero1 = objLoader.findModels("gero.obj", 1.5);
		gero1.position.set(-16, -5, 5);// 座標をセット
		rootGroup.add(gero1);// 背景に追加

        let gero2 = objLoader.findModels("gero.obj", 1.5);
		gero2.position.set(-6, -5, 5);// 座標をセット
		rootGroup.add(gero2);// 背景に追加

        let gero3 = objLoader.findModels("gero.obj", 1.5);
		gero3.position.set(6, -5, 5);// 座標をセット
		rootGroup.add(gero3);// 背景に追加

		// ゲームオーバー
		let go = objLoader.findModels("gameover.obj", 1.0);
		go.position.set(10, 25, 5);
		rootGroup.add(go);// 背景に追加

		let tl1 = createTimeline(0, false, null);
        tl1.to(go.rotation, 0.1, {delay: 0, y: 3.14/2});
        tl1.to(go.position, 1.0, {delay: 0, y: "-=20"});
	}

	// 新機能( data.jsの、"markerType"を参照の事 )
	console.log("ヒットしたインデックス:" + marker.index);
	console.log("ヒットしたマーカーオブジェクト:" + marker.obj);
	
	soundLoader.playSound(marker.sound, 0.2);// Sound

	//==========
	// TODO3: コンボ / スコア

	// コンボ
	combo += 1;
	comboMng.setNum(combo);// スコア表示

	// スコア
	score += 10 + combo;
	scoreMng.setNum(score);// スコア表示

	// ポイント
	points[s] += 1;
	pointMng.setNum(points);

	// 記録更新(コンボ)
	if(comboChecker[0] <= combo){
		console.log("コンボ更新:" + comboChecker[0]);
		comboChecker.splice(0, 1);
		// TODO?: コンボ更新でオブジェクトを配置!?
	}

	// 記録更新(スコア)
	if(0 < scoreChecker.length && scoreChecker[0] <= score){
		console.log("スコア更新:" + scoreChecker[0]);
		scoreChecker.splice(0, 1);
		// TODO?: スコア更新でオブジェクトを配置!?
	}
}

function getRandom(start, end) {
    return start + Math.floor( Math.random() * (end - start + 1));
}

// 音楽終了時
function onEnd(){
	console.log("onEnd");

	//==========
	// TODO4: 音楽終了時演出

	// ゲームクリアロゴ
	let logo = objLoader.findModels("logo_finish.obj", 2.0);
	logo.position.set(0, 0, 0);
	logo.name = "logo_finish";
	rootGroup.add(logo);

	var cubes = [];
	for(let i=0;i<50;i++){
		var num = getRandom(0, 4);
		var files = [
			"cube1.obj",
			"cube2.obj",
			"cube3.obj",
			"cube4.obj"
		];
		var cube;
		if(num == 0){
			var geometry = new THREE.CubeGeometry(2, 2, 2);
			var material = new THREE.MeshNormalMaterial();
			cube = new THREE.Mesh(geometry, material);
			rootGroup.add(cube);
		}else if(num == 1){
			cube = objLoader.findModels(files[0], 0.01);
			rootGroup.add(cube);
		}else if(num == 2){
			cube = objLoader.findModels(files[1], 0.01);
			rootGroup.add(cube);
		}else if(num == 3){
			cube = objLoader.findModels(files[2], 0.01);
			rootGroup.add(cube);
		}else{
			cube = objLoader.findModels(files[3], 0.01);
			rootGroup.add(cube);
		}
		cubes[i] = cube;
		cube._y = getRandom(10, 15); // こっちもやる!?
		cube._x = getRandom(-20, 20);// 流石やるね!!

		let tl2 = createTimeline(0, false, null);
		tl2.add("hoge");
		tl2.to(cube.position, 1, {delay: 0.2, x: cube._x, y: cube._y, z: 0}, "hoge");
		tl2.to(cube.rotation, 1, {delay : 0.2, y : Math.PI * 2}, "hoge");

	}

	onkeyup = function(){
		if(event.keyCode == 32){
			rootGroup.remove(logo);
			titleStart();
			onkeyup = null;
			for(let i=0;i<cubes.length;i++){
				rootGroup.remove(cubes[i]);
			}
		}
	}

	// アニメーションオブジェクト(繰り返し, ヨーヨー, 終了時関数)
	let tl = createTimeline(0, false, ()=>{
		// ロゴを削除
		rootGroup.remove(logo);
	});
	// "logo"オブジェクトを2.0秒の時間をかけて、0.2秒後に0, 10, 0の座標に移動する
	tl.to(logo.position, 2.0, {delay: 0.2, x: 0, y: 10, z: 0});
	tl.to(logo.position, 10.0, {});

	// サウンド再生
	soundLoader.playSound("tap.mp3", 1.0);// Sound

	// 判定後パーフェクト花火演出!?
	showFireworks(0, 5, 0, 10, 30);

	// アニメーションオブジェクト(繰り返し, ヨーヨー, 終了時関数)
	//let tl2 = createTimeline(0, false, null);
	//ゲームオーバーカメラ
	// "logo"オブジェクトを2.0秒の時間をかけて、0.2秒後に0, 10, 0の座標に移動する
}

// Great!!, Good!!, Bad...
function showPopup(x, y, z, obj, obj2){

	let logo = objLoader.findModels(obj, 2.0);
	logo.position.set(x, y, z);
	rootGroup.add(logo);
	logo.rotation.y = obj2 

	// アニメーションオブジェクト(繰り返し, ヨーヨー, 終了時関数)
	let tl = createTimeline(0, false, ()=>{
		// ロゴを削除
		rootGroup.remove(logo);
	});
	// "logo"オブジェクトを3.0秒の時間をかけて、1.0秒後に+0, +3, +0の座標に移動する
	tl.to(logo.position, 0.8, {delay: 0, x: "+=0", y: "+=3", z: "+=0"});

	// アニメーション終了時
	soundLoader.playSound("tap.mp3", 1.0);// Sound
}

// 花火の演出
function showFireworks(x, y, z, area=10, total=30){
	let fw = new Fireworks(rootGroup, x, y, z, area, total);
	fireworks.push(fw);
}

// コントローラー(Gamepad)
let gpHelper = new GamepadHelper();
gpHelper.setButtonsListener((key, i, flg)=>{
	// ボタン(A,B,X,Y,L,R)
	console.log("コントローラー[" + key + "]:" + i + "_" + flg);
	if(!flg) return;
	if(key == 0 && i == 0) sensors[0].jump();// コントローラー[0]のA(0)ボタン
	if(key == 1 && i == 0) sensors[1].jump();// コントローラー[1]のA(0)ボタン
	if(key == 2 && i == 0) sensors[2].jump();// コントローラー[2]のA(0)ボタン
	if(key == 3 && i == 0) sensors[3].jump();// コントローラー[3]のA(0)ボタン
});

// コントローラー(PC)
window.addEventListener("keydown", (e)=>{
	let keyCode = e.keyCode;
	console.log("keyDown:" + keyCode);
	if(keyCode == 65) sensors[0].jump();// A
	if(keyCode == 83) sensors[1].jump();// S
	if(keyCode == 68) sensors[2].jump();// D
	/*
	if(keyCode == 65) sensors[0].jump();// 1
	if(keyCode == 83) sensors[1].jump();// 2
	if(keyCode == 68) sensors[2].jump();// 3
	if(keyCode == 52) sensors[3].jump();// 4
	if(keyCode == 53) sensors[4].jump();// 5
	if(keyCode == 54) sensors[5].jump();// 6
	*/
});

// アニメーションオブジェクト生成
function createTimeline(repeat=0, yoyo=false, onComplete=null){
	let tl = new TimelineMax({repeat:repeat, yoyo:yoyo, onComplete:onComplete});
	return tl;
}